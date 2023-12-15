require("dotenv").config();
const userRouter = require("../routes/userRoutes");
const request = require("supertest");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const { hashPassword } = require("../helpers/bcrypt");
const User = require("../models/userModel");
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
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/user", userRouter);

// Set up MongoDB in-memory server
beforeAll(() => {
  db.initializeMongoServer();
});

// Disconnect and stop server after tests
afterAll(async () => {
  await db.clearMongoServer();
  await db.stopMongoServer();
});

// User test

test("should sign up a new user", async () => {
  const res = await request(app).post("/user/signup").send({
    username: "testuser1",
    password: "password123",
    email: "test1@example.com",
    firstName: "Test",
    lastName: "User",
  });
  expect(res.statusCode).toEqual(201);

  // it("should login a user", async (done) => {
  //   const hashedPassword = await hashPassword("password123");
  //   // create a new user instance
  //   const newUser = new User({
  //     username: "testuser",
  //     password: hashedPassword,
  //     email: "test@example.com",
  //     firstName: "Test",
  //     lastName: "User",
  //   });

  //   request(app)
  //     .post("/login")
  //     .send({
  //       user: newUser,
  //     })
  //     .expect(500, done);
  // });
});
