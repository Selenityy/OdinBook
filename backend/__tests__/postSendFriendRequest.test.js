require("dotenv").config();
const userRouter = require("../routes/userRoutes");
const request = require("supertest");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const db = require("../helpers/mongoConfigTesting");
const User = require("../models/userModel");

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
let userId = "";

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
    password: "password1234",
    email: "test2@example.com",
    firstName: "Test2",
    lastName: "User2",
  });

  const response = await request(app).post("/user/login").send({
    username: "testuser1",
    password: "password123",
  });
  token = response.body.token;
  const user = await User.findOne({ username: "testuser1" });
  userId = user._id;
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.stopMongoServer();
});

test("should get a user's info", async () => {
  const res = await request(app)
    .get(`/user/${userId}/info`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
});

test("should send friend request", async () => {
  const friend2 = await User.findOne({ username: "testuser2" });
  const friendUsername = friend2.username;

  const res = await request(app).post(
    `/user/${userId}/sendFriendRequest/${friendUsername}`
  );
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Friend request sent successfully");
});

test("should fail sending a friend request to self", async () => {
  const self = await User.findOne({ username: "testuser1" });
  const selfUsername = self.username;
  const friendUsername = selfUsername;
  const res = await request(app).post(
    `/user/${userId}/sendFriendRequest/${friendUsername}`
  );
  expect(res.statusCode).toEqual(404);
  expect(res.body.message).toEqual("Cannot sent friend request to yourself");
});

test("should not allow to send friend request twice or to users who are already friends", async () => {
  const friend2 = await User.findOne({ username: "testuser2" });
  const friendUsername = friend2.username;
  friend2.friendRequests.push(userId);

  const res = await request(app).post(
    `/user/${userId}/sendFriendRequest/${friendUsername}`
  );
  expect(res.statusCode).toEqual(400);
  expect(res.body.message).toEqual(
    "Already friends or friend request already pending"
  );
});

test("should not allow to send friend request to unknown user", async () => {
  const friendUsername = null;
  const res = await request(app).post(
    `/user/${userId}/sendFriendRequest/${friendUsername}`
  );
  expect(res.statusCode).toEqual(404);
  expect(res.body.message).toEqual("User not found");
});
