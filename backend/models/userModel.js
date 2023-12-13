const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please provide a valid email address",
    },
  },
  password: { type: String, required: true },
  firstName: { type: String, minLength: 2, maxLength: 50, required: true },
  lastName: { type: String, minLength: 2, maxLength: 50, required: true },
  testUser: { type: Boolean, default: false },
  about: { type: String, minLength: 3, maxLength: 100, required: false },
  profilePic: {
    type: String,
    default: "./public/images/profile-pics/panda-avatar.png",
    required: true,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.firstName && this.lastName) {
    fullname = `${this.firstName} ${this.lastName}`;
  }
  return fullname;
});

module.exports = mongoose.model("User", UserSchema);
