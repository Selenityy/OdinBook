const userRoutes = require("../routes/userRoutes");
const request = require("supertest");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/user", userRoutes);

let mongoServer;

// Set up MongoDB in-memory server
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect and stop server after tests
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// User test
describe("User Routes /signup", () => {
  it("should sign up a new user", () => {
    request(app)
      .post("/signup")
      .send({
        username: "testuser",
        password: "password123",
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
      })
      .expect(201, "message", "User created successfully");
  });
});
