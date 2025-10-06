const {
  docClient,
  tableName,
  buildResponse,
  checkUsersObject,
  validateRequiredFields,
  validateStringValues,
} = require("../../util");
const uuidv4 = require("uuid").v4;

const { PutCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.create = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { users } = body;

  if (!users) {
    return buildResponse(400, {
      error: "Missing 'users' object in request body",
    });
  }

  // Assign if not provided
  if (!users.userId) {
    users.userId = uuidv4();
  }

  // VALIDATIONS
  let error = checkUsersObject(users);
  if (error) return error;

  error = validateRequiredFields(users, ["userId", "userName", "userRole"]);
  if (error) return error;

  error = validateStringValues(users);
  if (error) return error;

  // Creating payload
  const params = { TableName: tableName, Item: users };

  // Atempt creating user
  try {
    await docClient.send(new PutCommand(params));
    return buildResponse(201, users);
  } catch (err) {
    console.error("DynamoDB Error:", err);
    return buildResponse(500, { error: "Could not create user" });
  }
};
