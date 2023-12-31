require("dotenv").config();
const userRouter = require("../routes/userRoutes");
const postRouter = require("../routes/postRoutes");
const request = require("supertest");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const db = require("../helpers/mongoConfigTesting");
const User = require("../models/userModel");
const Post = require("../models/postModel");

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
app.use("/posts", postRouter);

let token = "";
let token2 = "";
let actualUser = "";
let actualUserId = "";
let testUser2 = "";
let testUser2Id = "";

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
  await request(app).post("/user/signup").send({
    username: "testuser2",
    password: "password123",
    email: "test2@example.com",
    firstName: "Test2",
    lastName: "User2",
  });
  const response = await request(app).post("/user/login").send({
    username: "testuser1",
    password: "password123",
  });
  token = response.body.token;
  actualUser = await User.findOne({ username: "testuser1" });
  actualUserId = actualUser._id;

  testUser2 = await User.findOne({ username: "testuser2" });
  actualUser.friends.push(testUser2._id);
  testUser2.friends.push(actualUser._id);
  await actualUser.save();
  await testUser2.save();

  const testUser2res = await request(app).post("/user/login").send({
    username: "testuser2",
    password: "password123",
  });
  token2 = testUser2res.body.token;
  testUser2 = await User.findOne({ username: "testuser2" });
  testUser2Id = testUser2._id;

  await request(app)
    .post(`/user/${actualUserId}/posts/`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      body: "testuser1's post",
    });

  await request(app)
    .post(`/user/${actualUserId}/posts/`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      body: "testuser1's second post",
    });

  await request(app)
    .post(`/user/${testUser2Id}/posts/`)
    .set("Authorization", `Bearer ${token2}`)
    .send({
      body: "testuser2's first post",
    });
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.stopMongoServer();
});

test("should get the user's post feed of own and friend's posts", async () => {
  const res = await request(app)
    .get(`/user/${actualUserId}/posts`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toBe(true);
  const postBodies = res.body.map((post) => post.body);
  expect(postBodies).toContain("testuser1's post");
  expect(postBodies).toContain("testuser1's second post");
  expect(postBodies).toContain("testuser2's first post");
});
