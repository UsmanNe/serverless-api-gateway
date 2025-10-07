const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// DynamoDB Setup
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

// Response Builder
const buildResponse = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data),
});

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

 
module.exports = {
  docClient,
  tableName,
  buildResponse,
  checkUsersObject,
  validateRequiredFields,
  validateStringValues,
};
