const { docClient, tableName, buildResponse } = require("../../util");

const { GetCommand } = require("@aws-sdk/lib-dynamodb");

// Get user by id
module.exports.read = async (event) => {
  const { userId } = event.pathParameters || {};

  // VALIDATION: Required field check "userId"
  if (!userId)
    return buildResponse(event, 400, { error: '"userId" is required' });

  // Creating payload
  const params = { TableName: tableName, Key: { userId } };

  // Atempt reading user
  try {
    const { Item } = await docClient.send(new GetCommand(params));
    if (!Item) return buildResponse(event, 404, { error: "User not found" });
    return buildResponse(event, 200, Item);
  } catch (err) {
    if (process.env.NODE_ENV === "test") {
      console.error("DynamoDB Error:", err.message);
    } else {
      console.error("DynamoDB Error:", err);
    }
    return buildResponse(event, 500, { error: "Could not retrieve user" });
  }
};
