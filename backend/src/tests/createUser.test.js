const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const createUser = require("../handlers/createUser");
const { v4: uuidv4 } = require("uuid");

// Mock the DynamoDB client
const ddbMock = mockClient(DynamoDBDocumentClient);

// Optional: Mock uuid for deterministic tests
jest.mock("uuid", () => ({ v4: () => "test-uuid-123" }));

describe("createUser handler", () => {
  beforeEach(() => ddbMock.reset());

  it("should create a user successfully", async () => {
    ddbMock.on(PutCommand).resolves({});

    const event = {
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

    const response = await createUser.create(event);
    expect(response.statusCode).toBe(201);

    const body = JSON.parse(response.body);
    expect(body).toEqual({
      userId: "test-uuid-123",
      userName: "Alice",
      userRole: "Admin",
      userShift: "morning",
      userMembershipType: "paid",
    });
  });

  it("should return 400 if users object is missing", async () => {
    const event = {
      body: JSON.stringify({}),
      headers: { origin: "http://localhost:5173" },
    };
    const response = await createUser.create(event);
    expect(response.statusCode).toBe(400);
  });

  it("should handle DynamoDB errors gracefully", async () => {
    ddbMock.on(PutCommand).rejects(new Error("DB Error"));
    const event = {
      body: JSON.stringify({
        users: {
          userName: "Bob",
          userRole: "User",
          userShift: "evening",
          userMembershipType: "trial",
        },
      }),
      headers: { origin: "http://localhost:5173" },
    };

    const response = await createUser.create(event);
    expect(response.statusCode).toBe(500);
  });
});
