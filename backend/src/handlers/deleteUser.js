const { docClient, tableName, buildResponse } = require("../../util");

const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.delete = async (event) => {
  const { userId } = event.pathParameters || {};

  // VALIDATION: Required field check "userId" 
  if (!userId) return buildResponse(400, { error: '"userId" is required' });

  const params = { TableName: tableName, Key: { userId } };

  // Atempt deleting user
  try {
    await docClient.send(new DeleteCommand(params));
    return buildResponse(200, { message: `Deleted user was ${userId}` });
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Could not delete user" });
  }
};
