const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

// Display all posts, user feed of their posts and friend posts
exports.userFeed = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // fetch user and friend's list
    const user = await User.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // create an array of friend Ids and own
    const friendIds = user.friends.map((friend) => friend._id);
    friendIds.push(user._id);

    const posts = await Post.find({
      user: { $in: friendIds },
    })
      .sort({ timestamp: -1 })
      .populate({
        path: "user",
        select: "username profilePic",
      })
      // .populate({
      //    path: "likeCount",
      //  })
      // should be able to access through post.likeCount
      .populate({
        path: "comments",
        // select: "body likeCount",
        // should be able to access through comment.likeCount
        populate: {
          path: "user",
          select: "username profilePic",
        },
      });

    res.json(posts);
  } catch (err) {
    next(err);
  }
});
