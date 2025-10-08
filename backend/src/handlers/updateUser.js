const {
  docClient,
  tableName,
  buildResponse,

  validateStringValues,
} = require("../../util");

const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.update = async (event) => {
  const { userId } = event.pathParameters || {};
  const body = JSON.parse(event.body || "{}");
  const { users } = body;

  // VALIDATION: Required field check "userId"
  if (!userId)
    return buildResponse(event, 400, { error: '"userId" is required' });

  // VALIDATION: All values must be strings
  const error = validateStringValues(users);
  if (error) return error;

  // Build dynamic UpdateExpression for any number of fields provided
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  const setExpressions = [];

  for (const key in users) {
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = users[key];
    setExpressions.push(`#${key} = :${key}`);
  }

  // Creating payload
  const params = {
    TableName: tableName,
    Key: { userId },
    UpdateExpression: "set " + setExpressions.join(", "),
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  // Attempting update user
  try {
    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return buildResponse(event, 200, Attributes);
  } catch (err) {
    if (process.env.NODE_ENV === "test") {
      console.error("DynamoDB Error:", err.message);
    } else {
      console.error("DynamoDB Error:", err);
    }
    return buildResponse(event, 500, { error: "Could not update user" });
  }
};
