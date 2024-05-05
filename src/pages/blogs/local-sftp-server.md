---
title: 'Setting up a local SFTP server using docker'
tag: 'networking,docker'
layout: ../../layouts/blogLayout.astro
date: 05/05/2024
summary: Setting up an SFTP server locally with Docker is a breeze. This guide walks you through creating a Docker Compose file, generating SSH host keys, and running the SFTP server container. Understand the importance of using both ed25519 and RSA host keys for compatibility and security.
---

Running an SFTP (Secure File Transfer Protocol) server can be tricky, especially if you're not familiar with server administration (like me). But Docker makes it incredibly simple to get an SFTP server up and running in just a few steps. 

### Problem that I faced:
For the past few months I have been working on fintech services interacting with bank API's, which led me to using SFTP for a task.
 
After I went through some articles on internet on how to setup sftp server locally, I felt really overwhelmed.


The next idea that came to my mind was is it possible to setup a sftp server through docker and I ended up on this github repository <a href="https://github.com/atmoz/sftp" target="_blank" style="color:blue; text-decoration: underline;">atmoz</a> 

Let's start from the start!

### What is SFTP?
SFTP stands for Secure File Transfer Protocol. It is a safe way to transfer files over a network. 

SFTP is based on the Secure Shell (SSH) protocol, which encrypts the data being transferred. This means when you transfer files using SFTP, they remain secure and cannot be seen by anyone trying to snoop on them.

### Why Use Docker?
Docker allows you to package an application and its dependencies into a container, which can run consistently across different environments. 

This means you don't have to worry about installing and configuring the SFTP server software yourself – Docker takes care of it all for you.

### Setting up the SFTP Server
1. Create a new directory for your project and navigate to it.
2. Create a docker-compose.yml file with the following content:
```yaml
version: '3.7'

services:
  sftp:
    image: atmoz/sftp
    volumes:
      - ./files:/home/files/upload
      - ./ssh/ssh_host_ed25519_key.pub
      :/home/files/.ssh/keys/ssh_host_ed25519_key.pub
      :ro
      - ./ssh/ssh_host_rsa_key.pub
      :/home/files/.ssh/keys/ssh_host_rsa_key.pub
      :ro
    ports:
      - "2222:22"
    command: files:kiaev6:1001
    networks:
      - sftp

networks:
  sftp:
```
Here's a breakdown of the configuration:
- <span style="background-color: #cceeff;">image: atmoz/sftp</span>: This specifies the Docker image (`atmoz/sftp`) that will be used to run the SFTP server.
- <span style="background-color: #cceeff">volumes: - <host-dir>/upload:/home/foo/upload</span>: This mounts the `<host-dir>/upload` directory on the host machine to `/home/foo/upload` directory inside the container. This means that files placed in `<host-dir>/upload` on the host will be accessible in `/home/foo/upload` within the container.
- <span style="background-color: #cceeff">volumes: - <host-dir>ports: - "2222:22"</span>: This maps port `2222` on the host to port `22` inside the container. It means you can connect to the SFTP server on port `2222` from your host machine.
- <span style="background-color: #cceeff">command: foo:pass:1001"</span>: This part specifies the user credentials and UID (`1001`) for the SFTP user within the container.
  <ul style="list-style:circle;">
    <li><code>foo</code>: This is the username (<code>foo</code>) for the SFTP user.</li>
    <li><code>pass</code>: This would typically be the password associated with the user (<code>foo</code>), although in practice, it's recommended to use more secure authentication methods like SSH keys.</li>
    <li><code>1001</code>: This is the UID (User ID) assigned to the user (<code>foo</code>) within the container. User IDs in Docker containers are often mapped to specific numeric values for file permissions and user management purposes.</li>
  </ul>

3. Create the `files` and `ssh` directories:
```shell
mkdir -p files ssh
```

4. Generate SSH host keys and copy them to the `ssh` directory:
```shell
ssh-keygen -t ed25519 -f ./ssh/ssh_host_ed25519_key
ssh-keygen -t rsa -b 4096 -f ./ssh/ssh_host_rsa_key
```
### Why Two Keys?
Two key got me wondering why we need two different SSH host keys (ed25519 and RSA). 
This is to ensure compatibility with different SSH clients and implementations. 

Some older clients may only support the RSA algorithm, while modern clients support the more secure ed25519 algorithm.

Having both keys allows the SFTP server to negotiate the most secure algorithm supported by both the client and server during the SSH handshake process. It also facilitates key rotation and algorithm agility for better security.

5. Run the SFTP server:
```shell
docker-compose up
```


### Connecting to the SFTP Server
You can connect to the SFTP server using an SFTP client like FileZilla or the command-line sftp utility. 
Using the command:
```shell
sftp -P 2222 files@localhost
```

enter the password when prompted.

Once connected change the directory to where your file is and use the `get` command to download the file:
```shell
get data.csv 
```
replace data.csv with the file that you want to download.


With Docker, setting up an SFTP server is as simple as writing a few lines of configuration and running a couple of commands. No more manual server configuration or complex setups – just a hassle-free way to spin up an SFTP server whenever you need it.

Thank you for reading this blog.