const { mockClient } = require("aws-sdk-client-mock");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const listUsers = require("../handlers/listUsers");

// Mock DynamoDB client
const ddbMock = mockClient(DynamoDBDocumentClient);

describe("listUsers handler", () => {
  beforeEach(() => ddbMock.reset());

  it("should return all users successfully", async () => {
    const mockUsers = [
      {
        userId: "1",
        userName: "Alice",
        userRole: "Admin",
        userShift: "morning",
        userMemberShipType: "paid",
      },
      {
        userId: "2",
        userName: "Bob",
        userRole: "User",
        userShift: "evening",
        userMemberShipType: "trail",
      },
    ];
    ddbMock.on(ScanCommand).resolves({ Items: mockUsers });

    const event = { headers: { origin: "http://localhost:5173" } };
    const response = await listUsers.readAll(event);

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toEqual(mockUsers);
  });

  it("should handle DynamoDB errors gracefully", async () => {
    ddbMock.on(ScanCommand).rejects(new Error("DB Error"));
    const event = { headers: { origin: "http://localhost:5173" } };

    const response = await listUsers.readAll(event);
    expect(response.statusCode).toBe(500);
  });
});
