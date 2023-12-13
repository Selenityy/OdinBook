const userRoutes = require("../routes/userRoutes");
const request = require("supertest");
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRoutes);

describe("GET userRoutes connect to userController", () => {
  it("responds with a 200", (done) => {
    request(app).get("/").set("Accept", "application/json").expect(200, done);
  });
});
