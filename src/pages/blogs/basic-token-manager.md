---
title: "Building a basic token manager"
tag: 'golang,concurrency'
layout: ../../layouts/blogLayout.astro
date: 04/27/2024
summary: wrote about concurrency in golang
---

For the past few days I have been regularly working on integrating API's
and most of us developers do that on regular basis. 

The most common 
thing in all these API's is (not bad documentation 😅) getting 
an access token to access protected API's which expires in a certain period of time. 

### Problem Statement I came across:
- Generate an access token after some interval and store it
- Should be easily accessible as it will be required again and again

### Most suggested way to go about this based on discussion with my team was :
- Push it to redis and add some TTL(time to live), if the token's there use it or generate it

Being a gopher for a long time now. Whenever I think of an async task, I think about *go routines* 

So I came up with an idea of a simple token manager. 

```go
// TokenGeneratorFunc is a function type that takes no 
// arguments and returns an interface{} value 
// and an error value. This function type 
// is used to generate tokens.
type TokenGeneratorFunc func() (interface{}, error)

// TokenManager is a struct that manages 
// the generation and caching of tokens.
type TokenManager struct {
    // token is an atomic.Value that stores 
    // the current token value.
    // It uses atomic operations to 
    // ensure thread-safety when accessing
    // or modifying the token value concurrently.
    token atomic.Value

    // duration specifies 
    // the time duration for which a token 
    // is valid and should be 
    // generated duration time.Duration
    duration time.Duration


    // generatorFunc is a function of 
    // type TokenGeneratorFunc 
    // that generates a new token 
    // when called.
    generatorFunc TokenGeneratorFunc

    // name is a string that 
    // identifies the 
    // TokenManager instance.
    name string

    // hasGeneratedFirstToken is a bool that 
    // indicates whether the first token
    // has been generated or not. 
    // It is used to handle 
    // the first token generation
    // differently, if required.
    hasGeneratedFirstToken bool

    // blockFirstTime is a channel that 
    // can be used to block the first 
    // token generation until a signal 
    // is received on the channel. 
    // This can be useful in scenarios 
    // where the first token generation 
    // needs to be delayed or
    // synchronized with other operations.
    blockFirstTime chan bool

}
```

### The TokenManager has a few key responsibilities:

- **Token Generation**: It takes a <span style="background-color: #cceeff">TokenGeneratorFunc</span> as an input, which is a function that generates a new token. This function could be making an API call, performing some cryptographic operation, or any other logic required to generate a token.
- **Token Refresh**: The <span style="background-color: #cceeff">TokenManager</span> periodically calls the <span style="background-color: #cceeff">TokenGeneratorFunc</span> to refresh the token. The refresh interval is determined by the <span style="background-color: #cceeff">duration</span> field, which specifies the time between token refreshes.
- **Token Storage**: The <span style="background-color: #cceeff">TokenManager</span> stores the current token in an atomic variable, ensuring thread-safety when multiple goroutines try to access or update the token concurrently.
- **Token Distribution**: Other parts of the system can retrieve the current token by calling the <span style="background-color: #cceeff">GetToken</span> method on the <span style="background-color: #cceeff">TokenManager</span>.

<br>

## Let's get into the code now 

### Constructor - instantiates the token manager
```go
func NewTokenManager(
    name string, 
    duration *time.Duration, 
    generatorFunc TokenGeneratorFunc) *TokenManager {
    tm := &TokenManager{
        duration: *duration,
        generatorFunc: generatorFunc,
        name: name,
        blockFirstTime: make(chan bool),
        hasGeneratedFirstToken: false,
    }
    tm.token.Store("")
    return tm
}
```

This is a constructor function that creates a new TokenManager instance. It takes three arguments:

1. **name**: The name of the resource or service for which the token is being managed.
2. **duration**: A pointer to a time.Duration that specifies the interval between token refreshes.
3. **generatorFunc**: The TokenGeneratorFunc that will be used to generate new tokens.

The function initializes the <span style="background-color: #cceeff">TokenManager</span> struct with the provided values, creates a new channel <span style="background-color: #cceeff">blockFirstTime</span>, and stores an empty string as the initial token value.


### GetToken - retrieves token 
```go
func (t *TokenManager) GetToken() interface{} {
   // If the first token hasn't been generated yet
   if !t.hasGeneratedFirstToken {
       // Block until a value is received from 
       // the blockFirstTime channel
       <-t.blockFirstTime
   }

   // Return the current token value stored
   // in the atomic.Value
   return t.token.Load()
}
```

The GetToken method is used to retrieve the current token from the <span style="background-color: #cceeff">TokenManager</span>,.

If the first token hasn't been generated yet, it blocks until the <span style="background-color: #cceeff">blockFirstTime</span>, channel receives a value (which happens after the first token is generated). 

Then, it returns the current token by loading it from the token field using the <span style="background-color: #cceeff">atomic.Value.Load</span>, method.


### RunTokenGenerator - runs an async task to generate tokens
```go
func (tm *TokenManager) RunTokenGenerator() {
   // Create a new ticker that fires at 
   // intervals specified by tm.duration
   ticker := time.NewTicker(tm.duration)
   // Ensure the ticker is stopped 
   // when this function returns
   defer ticker.Stop()

   // Generate and update the initial token
   tm.UpdateToken()

   // This loop will run indefinitely
   for range ticker.C {
       // On each tick, generate and update the token
       tm.UpdateToken()
   }
}
```

The <span style="background-color: #cceeff">RunTokenGenerator</span> method is responsible for periodically refreshing the token. 

It creates a new <span style="background-color: #cceeff">time.Ticker</span> based on the duration field, which sends a value on the ticker.C channel at the specified interval.

The method immediately generates the first token by calling <span style="background-color: #cceeff">tm.UpdateToken()</span>. Then, it enters a loop that blocks until a value is received on the <span style="background-color: #cceeff">ticker.C</span> channel, at which point it calls <span style="background-color: #cceeff">tm.UpdateToken()</span> again to refresh the token.

```go
func (tm *TokenManager) UpdateToken() {
   // Print a message indicating that a new 
   // token is being generated
   fmt.Println("Generating new session token 
   for connecting to " + tm.name)

   // Call the token generator function 
   // to generate a new token
   response, err := tm.generatorFunc()
   if err != nil {
       // If there was an error generating 
       // the token, print the error and return
       fmt.Println("Error updating token:", err)
       return
   }

   // Store the newly generated token 
   //in the atomic.Value
   tm.token.Store(response)

   // If this is the first time a token is being generated
   if !tm.hasGeneratedFirstToken {
       // Set the hasGeneratedFirstToken flag to true
       tm.hasGeneratedFirstToken = true
       
       // Send a value to the blockFirstTime channel
       // to unblock any goroutines waiting for 
       // the first token generation
       tm.blockFirstTime <- true
   }

   // Print a message indicating that the 
   // new token was successfully generated
   fmt.Println("Successfully generated new
    token for " + tm.name)
}
```
The <span style="background-color: #cceeff">UpdateToken</span> method is responsible for generating a new token and storing it in the <span style="background-color: #cceeff">TokenManager</span>. It first prints a log message indicating that it's generating a new token for the specified <span style="background-color: #cceeff">name</span>.

Then, it calls the <span style="background-color: #cceeff">generatorFunc</span> to generate a new token. If an error occurs during token generation, it prints the error and returns without updating the token. If the token is generated successfully, it stores the new token in the <span style="background-color: #cceeff">token</span> field using the <span style="background-color: #cceeff">atomic.Value.Store</span> method. 

If this is the first token being generated, it sets the <span style="background-color: #cceeff">hasGeneratedFirstToken</span> flag to <span style="background-color: #cceeff">true</span> and sends a value on the <span style="background-color: #cceeff">blockFirstTime</span> channel, allowing the <span style="background-color: #cceeff">GetToken</span> method to unblock and return the newly generated token.

Checkout the full code at <a href="https://github.com/vsumit89/tokenvault" target="_blank" style="color:blue; text-decoration: underline;">Github</a> 

