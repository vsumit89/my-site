---
title: Running/Testing AWS Lambda function locally in Golang
tag: 'aws,golang'
layout: ../../layouts/blogLayout.astro
date: 05/12/2024
summary: Running and testing AWS Lambda functions locally in Golang allows developers to catch bugs and issues early, ensuring smooth deployment. It involves setting up a local environment, writing the Lambda function.
---

AWS Lambda is a serverless computing service provided by Amazon Web Services (AWS). With AWS Lambda, you can run your code without provisioning or managing servers. 

## What exactly is Serverless Architecture?
Serverless architecture, also known as Function-as-a-Service (FaaS), is a cloud computing execution model where the cloud provider dynamically manages the allocation and provisioning of servers. In a serverless architecture, developers don't have to worry about provisioning, scaling, or managing servers.

## Why is it important to test AWS Lambda functions locally?

Testing AWS Lambda functions locally in 
Golang is crucial as it helps identify and resolve potential build or runtime mismatches between the local and cloud environments. 

For example, When building a Golang Lambda 
function binary on a macOS machine with an 
Apple Silicon (ARM64) architecture, the resulting
binary is compatible with the ARM64 instruction set.However, the AWS Lambda execution environment currently runs on Amazon Linux, which uses an x86-64 (AMD64) architecture. 

If you attempt to upload and run the 
ARM64 binary built on your macOS machine directly on 
AWS Lambda, it will fail due to the architecture 
mismatch.

To resolve this issue, you would need to cross-compile the Golang code to produce an x86-64 binary compatible with the AWS Lambda execution environment. This can typically be done by setting the appropriate environment variables (e.g., GOOS=linux, GOARCH=amd64) before building the binary on your macOS machine.

## Dependencies for running Lambda function locally
- Docker
- <a style="color:blue;" href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">AWS CLI</a>
- <a style="color:blue;" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html" target="_blank">SAM CLI</a>


## Defining configuration for running Lambda
AWS Lambda functions require a specific configuration to define how they should run and what resources they need. 
While you can provide this configuration through the AWS Management Console or AWS CLI, using a template file makes it easier to version control and manage your Lambda function's configuration alongside your code.

Example: 
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Hello World Function
Resources:
  lambdasftp:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: .
      Description: ''
      MemorySize: 1024
      Timeout: 3
      Handler: main
      Runtime: provided.al2023
      CodeUri: .  
      Architectures:
        - arm64

```

### Template Overview

- **AWSTemplateFormatVersion**: Specifies the version of the CloudFormation template language.
  
- **Transform**: Indicates the use of AWS SAM capabilities to simplify serverless resource definitions.

- **Description**: Provides a brief description of the template's purpose.

### Serverless Function Resource

- **Resources**: Defines the AWS resources to be deployed.

  - **MyLambdaFunction**: A serverless function named `MyLambdaFunction` in this case it is `lambdasftp`.

    - **Type**: Specifies the resource type (`AWS::Serverless::Function` for Lambda function).



### Properties
- **CodeUri**: Path to the function code (`.` indicates current directory).
- **Handler**: Entry point for the function (`main` function).
- **Runtime**: Custom runtime environment (`provided.al2023` based on Amazon Linux 2).
- **MemorySize**: Memory allocated to the function (1024 MB).
- **Timeout**: Maximum execution time for the function (3 seconds).
- **Architectures**: Supported architectures (ARM64).


## Writing a lambda function in Go
```go
package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context) {
	fmt.Println("Hello World!")
}

func main() {
	lambda.Start(handler)
}
```

Building the go function using:
```shell
GOOS=linux CGO_ENABLED=0 go build -o bootstrap main.go
```

- **GOOS=linux**: This is an environment variable that specifies the target operating system for the compiled binary. In this case, it's set to linux, which means the resulting binary will be executable on Linux systems.
- **CGO_ENABLED=0**: This environment variable disables the use of CGO (C Go) when building the Go program. CGO allows Go code to call C code, but it can make the binary larger and more complex. Setting CGO_ENABLED=0 produces a pure Go binary without any external C dependencies.
- **bootstrap**: The name of the generated binary

Invoking the function using SAM CLI:
```shell
sam local invoke
```

Output:
```shell
Invoking main (provided.al2023)
Local image is up-to-date
Using local image: public.ecr.aws/lambda/provided:al2023-rapid-arm64.

Mounting /Users/randomsumit/dev/aws-lambda-go-example 
as /var/task:ro,delegated, inside runtime container
START RequestId: 8e49ebaf-98b4-4ccd-be32-a4effc1b56db
Version: $LATEST

Hello World!

END RequestId: 56a83226-b92b-4a74-9a8e-6fa410b1afd1
REPORT RequestId: 56a83226-b92b-4a74-9a8e-6fa410b1afd1	
Init Duration: 0.14 ms	Duration: 13.67 ms	
Billed Duration: 14 ms	Memory Size: 1024 MB	
Max Memory Used: 1024 MB	

null
```

Thanks for reading the blog. Checkout code at <a href="https://github.com/vsumit89/aws-lambda-go-example" style="color:blue;">Github</a>