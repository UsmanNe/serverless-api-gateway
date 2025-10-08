const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const getUser = require("../handlers/getUser");

// Mock DynamoDB client
const ddbMock = mockClient(DynamoDBDocumentClient);

describe("getUser handler", () => {
  beforeEach(() => ddbMock.reset());

  it("should return a user by ID", async () => {
    const mockUser = {
      userId: "1",
      userName: "Alice",
      userRole: "Admin",
      userShift: "morning",
      userMemberShipType: "paid",
    };
    ddbMock.on(GetCommand).resolves({ Item: mockUser });

    const event = {
      pathParameters: { userId: "1" },
      headers: { origin: "http://localhost:5173" },
    };
    const response = await getUser.read(event);

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toEqual(mockUser);
  });

  it("should return 404 if user not found", async () => {
    ddbMock.on(GetCommand).resolves({});
    const event = {
      pathParameters: { userId: "2" },
      headers: { origin: "http://localhost:5173" },
    };

    const response = await getUser.read(event);
    expect(response.statusCode).toBe(404);
  });

  it("should return 400 if userId is missing", async () => {
    const event = {
      pathParameters: {},
      headers: { origin: "http://localhost:5173" },
    };
    const response = await getUser.read(event);
    expect(response.statusCode).toBe(400);
  });

  it("should handle DynamoDB errors gracefully", async () => {
    ddbMock.on(GetCommand).rejects(new Error("DB Error"));
    const event = {
      pathParameters: { userId: "1" },
      headers: { origin: "http://localhost:5173" },
    };

    const response = await getUser.read(event);
    expect(response.statusCode).toBe(500);
  });
});
