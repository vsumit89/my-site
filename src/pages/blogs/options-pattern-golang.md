---
title: 'Options Pattern in Golang'
tag: 'golang'
layout: ../../layouts/blogLayout.astro
date: 06/30/2024
summary: This blog discusses the implementation and need of options pattern in Go
---

Whenever we are writing a real world software with a number of features, the core idea we all stick to is writing a modular code i.e. writing modules / libraries which can be seamlessly integrated and used, without too much of hassle. One of the design pattern which enables us to do this in Go is  <span style="background-color: #cceeff">Options</span> pattern.

## Why is it needed?
Let's say we are writing a http server with some configuration - id, max connection and tls.
The first things that comes to mind is creating a constructor function and passing the config to it.

```go
type Server struct {
    id string
    maxConn int
    tls bool
}

func newServer(id string, maxConn int, tls bool) *Server {
    return &Server{
        id: id,
        maxConn: maxConn, 
        tls: tls,
    }
}
```

In this case, as the number of arguments increase the more tedious it becomes to maintain the code.

What can be the other solution? Let's say we create a Options struct and pass it to the constructor which can be used to initialise the server.

```go
type ServerOpts struct {
    id string
    maxConn int
    tls bool
}


func newServer(opts *ServerOpts) *Server {
    return &Server{
        id: opts.id,
        maxConn: opts.maxConn, 
        tls: opts.tls,
    }
}
```

This seems to be working, but the issue is if I want to initialise the server with some default values, I can't. Because 
I always have to pass the default values as the options because the server variable is dependent on it. Options pattern helps in making implementation more flexible.

### How to implement it ? 

Options Pattern 🚀🚀🚀

```go
// Option defines a function type for server options
type Option func(*Server)

func getDefaultServerValues() *Server {
    return &Server{
        id:      "default",
        maxConn: 100,
        tls:     false,
    }

}

func NewServer(options ...Option) *Server {
    // Set default values
    s := getDefaultServerValues()

    // Apply the options
    for _, option := range options {
        option(s)
    }

    return s
}

// WithID sets the server ID
func WithID(id string) Option {
    return func(s *Server) {
        s.id = id
    }
}

// WithMaxConn sets the maximum number of connections
func WithMaxConn(maxConn int) Option {
    return func(s *Server) {
        s.maxConn = maxConn
    }
}

// WithTLS enables or disables TLS
func WithTLS(tls bool) Option {
    return func(s *Server) {
        s.tls = tls
    }
}
```
For implementing options pattern:
1. We've kept the Server struct, but removed the ServerOpts struct entirely.
2. We've defined an Option type, which is a function that takes a pointer to a Server and modifies it.
3. The NewServer function now takes a variadic parameter of Option functions. It creates a server with default values and then applies each option.
4. We've created separate functions for each option (WithID, WithMaxConn, WithTLS). Each of these returns an Option function that modifies the specific field of the Server.

Now if I want to use a server with default values I can just use it like this:

```go
package main

// import the server package

func main() {
    serverObj := NewServer()

    // use the server object
}
```

Or If I want to override the default values then I can use it like :

```go
package main

// import the server package

func main() {
    serverObj := NewServer(
        WithMaxConn(10),
        WithTLS(true),
    )
    // use the server object
}
```

This approach offers several advantages:

- Flexibility: You can specify only the options you want to customize. If you're happy with the default values for some fields, you don't need to specify them.
- Readability: The code is self-documenting. It's clear what each option does.
- Extensibility: If you need to add new options in the future, you can do so without changing the NewServer function or breaking existing code.
- Default Values: It's easy to provide sensible defaults that can be overridden when needed.
- Immutability: If you make the fields of Server private (lowercase), you can ensure they're only set during creation, promoting immutability.

Thanks for reading this blog. 