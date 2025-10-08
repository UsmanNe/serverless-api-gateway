# Usaman API Gateway Serverless Backend
![Usaman API Gateway Serverless Backend Flowchart](../backend/flowchart/flowchart.png)
## Overview

This project is a Serverless Lambda CRUD API using Node.js and DynamoDB. It allows for managing users with full Create, Read, Update, and Delete operations.

## Project Structure

```
backend/
├── src/
│   ├── handlers/
│   │   ├── createUser.js
│   │   ├── listUsers.js
│   │   ├── getUser.js
│   │   ├── updateUser.js
│   │   └── deleteUser.js
│   ├── util.js
│   └── tests/
│       ├── createUser.test.js
│       └── listUsers.test.js
│       ├── getUser.test.js
│       └── updateUser.test.js
│       ├── deleteUser.test.js
├── serverless.yml
└── package.json
```

## Serverless Configuration (serverless.yml)

* Defines the service name, provider, runtime, and DynamoDB table.
* Defines Lambda functions and HTTP events for CRUD operations.
* Uses `serverless-offline` plugin for local testing.

## DynamoDB Table

* Table Name: `${service}-users-${stage}`
* Primary Key: `userId` (String)
* Billing Mode: PAY_PER_REQUEST

## Lambda Handlers

* **createUser**: Create a new user.
* **listUsers**: List all users.
* **getUser**: Get a user by ID.
* **updateUser**: Update a user by ID.
* **deleteUser**: Delete a user by ID.

## Utilities (util.js)

* `docClient` - DynamoDB DocumentClient instance.
* `tableName` - Environment table name.
* `buildResponse` - Helper to build HTTP responses with CORS headers.
* Validation functions:

  * `checkUsersObject`
  * `validateRequiredFields`
  * `validateStringValues`

## Unit Testing

* Uses Jest and `aws-sdk-client-mock`.
* Example test cases for `createUser` and `updateUser`:

  * Successful operations
  * Missing required fields
  * Invalid field types
  * DynamoDB errors
* Run tests with:

```
npm run test
```

## NPM Scripts

* `deploy:dev` - Deploy to dev stage
* `deploy:prod` - Deploy to prod stage
* `remove:dev` - Remove dev stage
* `remove:prod` - Remove prod stage
* `test` - Run Jest tests

## Installation

```
npm install
```

## Usage

* Start offline server:

```
sls offline
```

* API Endpoints:

  * `POST /users` - Create user
  * `GET /users` - List users
  * `GET /users/{userId}` - Get user
  * `PATCH /users/{userId}` - Update user
  * `DELETE /users/{userId}` - Delete user
