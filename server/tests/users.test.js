const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

beforeAll(async () => {
  await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Endpoints", () => {
  let userToken;

  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("username", "testuser");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("username", "testuser");
    userToken = res.headers["set-cookie"][0];
  });

  it("should fetch the logged-in user data", async () => {
    const res = await request(app).get("/users").set("Cookie", userToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("username", "testuser");
  });

  it("should logout the user", async () => {
    const res = await request(app)
      .post("/users/logout")
      .set("Cookie", userToken);
    expect(res.statusCode).toEqual(200);
  });

  it("should return unauthorized when fetching user data after logout", async () => {
    const res = await request(app).get("/users").set("Cookie", userToken);
    expect(res.statusCode).toEqual(401);
  });
});
