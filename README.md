# Dummy API Using json-server & json-server-auth

Welcome, frontend developers! This guide will help you set up and use a simple dummy API for your projects. This API is perfect for when you're learning frontend development and need a backend to test your applications.

## What is this?

This is a dummy API created using `json-server` and `json-server-auth`. It provides a fake backend that you can use to prototype your frontend applications without needing to set up a real server.

- `json-server` creates a full fake REST API with zero coding.
- `json-server-auth` adds authentication to json-server.

## Why use this?

As a frontend developer, you often need a backend API to:
1. Fetch data to display in your app
2. Send data from your app to be "saved"
3. Test authentication flows

This dummy API gives you all of that without needing to write any backend code!

## Getting Started

### Prerequisites

You need to have Node.js and npm installed on your computer. If you don't have these, download and install them from the [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/revou-fsse/assign-api-module-4.git
   ```

2. Navigate to the project directory:
   ```bash
   cd assign-api-module-4
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the JSON server:

```bash
npm run server
```

You should see a message saying the server is running, usually on `http://localhost:3000`.

## Using the API in Your Frontend Projects

Now that your server is running, you can start using it in your frontend projects. Here's how to interact with some of the main endpoints:

### Authentication

#### User Registration

To create a new user:

```javascript
fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

#### User Login

To log in a user:

```javascript
fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  }),
})
.then(response => response.json())
.then(data => {
  console.log(data);
  // Save the access token
  localStorage.setItem('token', data.accessToken);
})
.catch(error => console.error('Error:', error));
```

### Users

#### Get All Users

To fetch all users:

```javascript
fetch('http://localhost:3000/users', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Categories

#### Get All Categories

To fetch all categories:

```javascript
fetch('http://localhost:3000/categories')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

#### Create a New Category

To create a new category:

```javascript
fetch('http://localhost:3000/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({
    name: 'New Category',
    description: 'This is a new category'
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```