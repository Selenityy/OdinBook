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

let token = "";
let actualUser = "";
let actualUserId = "";
let post = "";
let postId = "";

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
  actualUser = await User.findOne({ username: "testuser1" });
  actualUserId = actualUser._id;

  let postRes = await request(app)
    .post(`/user/${actualUserId}/posts/`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      body: "testuser1's post",
    });
  post = await Post.findOne({ _id: postRes.body.post._id });
  postId = post._id;
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.stopMongoServer();
});

test("should like a post", async () => {
  const res = await request(app)
    .put(`/user/${actualUserId}/posts/${postId}/like`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Post liked successfully");
});

test("should unlike a post", async () => {
  await request(app)
    .put(`/user/${actualUserId}/posts/${postId}/like`)
    .set("Authorization", `Bearer ${token}`);
  const res = await request(app)
    .put(`/user/${actualUserId}/posts/${postId}/like`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Post unliked successfully");
});
