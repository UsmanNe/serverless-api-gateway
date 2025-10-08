const { docClient, tableName, buildResponse } = require("../../util");

const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.delete = async (event) => {
  const { userId } = event.pathParameters || {};

  // VALIDATION: Required field check "userId"
  if (!userId)
    return buildResponse(event, 400, { error: '"userId" is required' });

  const params = { TableName: tableName, Key: { userId } };

  // Atempt deleting user
  try {
    await docClient.send(new DeleteCommand(params));
    return buildResponse(event, 200, { message: `Deleted user was ${userId}` });
  } catch (err) {
    if (process.env.NODE_ENV === "test") {
      console.error("DynamoDB Error:", err.message);
    } else {
      console.error("DynamoDB Error:", err);
    }
    return buildResponse(event, 500, { error: "Could not delete user" });
  }
};
