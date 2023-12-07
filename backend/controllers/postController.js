const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

// Display all posts