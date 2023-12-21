require("dotenv").config();
const userRouter = require("../routes/userRoutes");
const request = require("supertest");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const db = require("../helpers/mongoConfigTesting");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
require("../helpers/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/user", userRouter);

let token = "";

// Set up MongoDB in-memory server
beforeAll(() => {
  db.initializeMongoServer();
});

beforeEach(async () => {
  await db.clearMongoServer();
  await request(app).post("/user/signup").send({
    username: "testuser1",
    password: "password123",
    email: "test1@example.com",
    firstName: "Test",
    lastName: "User",
  });
  const response = await request(app).post("/user/login").send({
    username: "testuser1",
    password: "password123",
  });
  token = response.body.token;
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.stopMongoServer();
});

test("should create a post", async () => {
  const res = await request(app)
    .post("/user/:userId/posts/")
    .set("Authorization", `Bearer ${token}`)
    .send({
      body: "testuser1's first post",
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Post created successfully");
  expect(res.body.post.body).toEqual("testuser1's first post");
});
