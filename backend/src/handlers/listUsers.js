const { docClient, tableName, buildResponse } = require("../../util");

const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

// Get all users
module.exports.readAll = async (event) => {
  // Creating payload
  const params = { TableName: tableName };
  // Attempt reading users
  try {
    const { Items } = await docClient.send(new ScanCommand(params));
    return buildResponse(event, 200, Items);
  } catch (err) {
    if (process.env.NODE_ENV === "test") {
      console.error("DynamoDB Error:", err.message);
    } else {
      console.error("DynamoDB Error:", err);
    }
    return buildResponse(event, 500, { error: "Could not retrieve users" });
  }
};
