const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// DynamoDB Setup
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

// Response Builder
const buildResponse = (e, statusCode, data) => {
  return {
    statusCode,
    headers: buildResHeaders(e),
    body: JSON.stringify(data),
  };
};

// Validation Helpers
const checkUsersObject = (users) => {
  if (!users) return buildResponse(400, { error: "Users object not found" });
  return null;
};

const validateRequiredFields = (users, requiredFields = []) => {
  for (const field of requiredFields) {
    if (!users[field])
      return buildResponse(400, { error: `Missing required field: ${field}` });
  }
  return null;
};

const validateStringValues = (users) => {
  const isValid = Object.values(users).every((v) => typeof v === "string");
  if (!isValid)
    return buildResponse(400, { error: "All values must be strings" });
  return null;
};

// CORS headers
const allowedOrigins = [
  "http://localhost:5173",
  "https://serverless-api-gateway.vercel.app",
];
const buildResHeaders = (e) => {
  const origin = allowedOrigins.includes(e.headers.origin)
    ? e.headers.origin
    : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": false,
  };
};

module.exports = {
  docClient,
  tableName,
  buildResponse,
  checkUsersObject,
  validateRequiredFields,
  validateStringValues,
};
