# Project Name
Arithmetic Calculator REST API

## Description

Web platform to provide a simple calculator functionality (addition, subtraction,
multiplication, division, square root, and a random string generation) where each functionality
will have a separate cost per request.
Users will have a starting credit/balance. Each request will be deducted from the user’sbalance. If the user’s balance isn’t enough to cover the request cost, the request shall bedenied.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:

```bash
git clone https://github.com/nicolascarelli/simple-arithmetic-calculator
cd repository
```


2. Create a .env file in the root directory of the project and fill it with your configuration:

```bash
cp .env.example .env
```


3. Edit the .env file and replace the placeholders with your actual data. Here's an example of what it might look like:

```bash
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_PASSWORD=dbpassword
MYSQL_DATABASE=mydatabase
MYSQL_USER=dbuser
MYSQL_HOST=localhost
SECRET_KEY=mysecretkey
USER_PASSWORD=userpassword
USER_USERNAME=username
````


4. Build and run the Docker containers:

```bash

docker-compose up --build -d

````

Your application should now be running at http://localhost:3000.
For testing purposes, each time this compose up is executed, the db is cleaned and seed.
The user and the password are set in the .env file.


5. In /api endpoint you ll find the list of endpoints

6. Clarification: There are missing tests, and GET records still needs work
