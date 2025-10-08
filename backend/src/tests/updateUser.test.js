const { mockClient } = require("aws-sdk-client-mock");
const {
  DynamoDBDocumentClient,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const updateUser = require("../handlers/updateUser");

// Mock DynamoDB client
const ddbMock = mockClient(DynamoDBDocumentClient);

describe("updateUser handler", () => {
  beforeEach(() => ddbMock.reset());

  it("should update a user successfully", async () => {
    const updatedUser = {
      userId: "1",
      userName: "Alice",
      userRole: "Admin",
      userShift: "morning",
      userMembershipType: "paid",
    };
    ddbMock.on(UpdateCommand).resolves({ Attributes: updatedUser });

    const event = {
      pathParameters: { userId: "1" },
      body: JSON.stringify({
        users: {
          userName: "Alice",
          userRole: "Admin",
          userShift: "morning",
          userMembershipType: "paid",
        },
      }),
      headers: { origin: "http://localhost:5173" },
    };

    const response = await updateUser.update(event);
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toEqual(updatedUser);
  });

  it("should return 400 if userId is missing", async () => {
    const event = {
      pathParameters: {},
      headers: { origin: "http://localhost:5173" },
    };
    const response = await updateUser.update(event);
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if any value is not a string", async () => {
    const event = {
      body: JSON.stringify({
        users: {
          userName: 123,
        },
      }),
      headers: { origin: "http://localhost:5173" },
    };
    const response = await updateUser.update(event);
    expect(response.statusCode).toBe(400);
  });

  it("should handle DynamoDB errors gracefully", async () => {
    ddbMock.on(UpdateCommand).rejects(new Error("DB Error"));
    const event = {
      pathParameters: { userId: "1" },
      body: JSON.stringify({ users: { userName: "Alice" } }),
      headers: { origin: "http://localhost:5173" },
    };
    const response = await updateUser.update(event);
    expect(response.statusCode).toBe(500);
  });
});
