const { mockClient } = require("aws-sdk-client-mock");
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const deleteUser = require("../handlers/deleteUser");

// Mock DynamoDB client
const ddbMock = mockClient(DynamoDBDocumentClient);

describe("deleteUser handler", () => {
  beforeEach(() => ddbMock.reset());

  it("should delete a user successfully", async () => {
    ddbMock.on(DeleteCommand).resolves({});
    const event = {
      pathParameters: { userId: "1" },
      headers: { origin: "http://localhost:5173" },
    };

    const response = await deleteUser.delete(event);
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.message).toContain("Deleted user was 1");
  });

  it("should return 400 if userId is missing", async () => {
    const event = {
      pathParameters: {},
      headers: { origin: "http://localhost:5173" },
    };
    const response = await deleteUser.delete(event);
    expect(response.statusCode).toBe(400);
  });

  it("should handle DynamoDB errors gracefully", async () => {
    ddbMock.on(DeleteCommand).rejects(new Error("DB Error"));
    const event = {
      pathParameters: { userId: "1" },
      headers: { origin: "http://localhost:5173" },
    };

    const response = await deleteUser.delete(event);
    expect(response.statusCode).toBe(500);
  });
});
