import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get the current user model from jwt token
export const fetchUserData = createAsyncThunk(
  "/user/fetchUserData",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(`http://localhost:3000/user/data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const user = await response.json();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Retrieving current user's posts and their friend's posts
export const fetchUserFeedPosts = createAsyncThunk(
  "/user/fetchUserFeedPosts",
  async (userId, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user post feed data");
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Send friend request
export const fetchSendFriendRequests = createAsyncThunk(
  "/user/fetchSendFriendRequests",
  async ({ userId, friendUsername }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/sendFriendRequest/${friendUsername}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not send friend request");
      }
      return {
        userId,
        recipientId: data.recipientId,
        currentUser: data.currentUser,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Accept friend request
export const fetchAcceptFriendRequest = createAsyncThunk(
  "user/fetchAcceptFriendRequest",
  async ({ userId, friendUsername }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/acceptFriendRequest/${friendUsername}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not send friend request");
      }
      return {
        userId,
        recipientId: data.recipientId,
        currentUser: data.currentUser,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Reject friend request
export const fetchRejectFriendRequest = createAsyncThunk(
  "user/fetchRejectFriendRequest",
  async ({ userId, friendUsername }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/rejectFriendRequest/${friendUsername}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not send friend request");
      }
      return {
        userId,
        recipientId: data.recipientId,
        currentUser: data.currentUser,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Canceling a friend request
export const fetchCancelRequest = createAsyncThunk(
  "user/fetchCancelRequest",
  async ({ userId, friendUsername }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/deleteFriendRequest/${friendUsername}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not send friend request");
      }
      return {
        userId,
        recipientId: data.recipientId,
        currentUser: data.currentUser,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Removing a friend
export const fetchUnfriend = createAsyncThunk(
  "user/fetchUnfriend",
  async ({ userId, friendUsername }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/unFriend/${friendUsername}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not send friend request");
      }
      return {
        userId,
        recipientId: data.recipientId,
        currentUser: data.currentUser,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating a post
export const postCreation = createAsyncThunk(
  "/user/postCreation",
  async ({ postData, userId }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: postData.post }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const post = await response.json();
      return post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch a specific post
export const fetchUniquePost = createAsyncThunk(
  "/user/post/uniquePost",
  async ({ userId, postId }, thunkAPI) => {
    console.log("inside user slice unique post");
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get unique post");
      }
      return {
        post: data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Like a post
export const likePost = createAsyncThunk(
  "/user/likePost",
  async ({ userId, postId }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not send friend request");
      }
      return {
        posts: data.updatedPost,
        postUserId: data.updatedPost.userId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating a comment
export const commentCreation = createAsyncThunk(
  "/user/post/commentCreation",
  async ({ postId, userId, commentData }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/comments/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: commentData.comment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const commentResponse = await response.json();
      return commentResponse.comment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Signing up
export const signUpUser = createAsyncThunk(
  "/user/signUp",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const user = await response.json();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Logging in
export const loginUser = createAsyncThunk(
  "/user/login",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const { user, token } = await response.json();
      localStorage.setItem("token", token);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial State values
const initialState = {
  value: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    about: "",
    profilePic: "",
    friends: [],
    friendRequests: [],
    sentRequests: [],
    posts: [],
    _id: "",
    testUser: false,
  },
  uniquePost: {
    body: "",
    timestamp: null,
    user: {
      _id: "",
      username: "",
      profilePic: "",
    },
    likes: [],
    likeCount: 0,
    images: [],
    comments: [],
    commentCount: 0,
  },
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    resetUniquePost: (state) => {
      state.uniquePost = {
        body: "",
        timestamp: null,
        user: {
          _id: "",
          username: "",
          profilePic: "",
        },
        likes: [],
        likeCount: 0,
        images: [],
        comments: [],
        commentCount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH USER
      .addCase(fetchUserData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
      })

      // FETCH USER FEED POSTS
      .addCase(fetchUserFeedPosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFeedPosts.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserFeedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user feed post data";
      })

      // SEND FRIEND REQUEST
      .addCase(fetchSendFriendRequests.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSendFriendRequests.fulfilled, (state, action) => {
        state.value.sentRequests = action.payload.currentUser.sentRequests;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSendFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send friend request";
      })

      // ACCEPT FRIEND REQUEST
      .addCase(fetchAcceptFriendRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcceptFriendRequest.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAcceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to accept friend request";
      })

      // REJECT FRIEND REQUEST
      .addCase(fetchRejectFriendRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRejectFriendRequest.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRejectFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reject friend request";
      })

      // CANCEL FRIEND REQUEST
      .addCase(fetchCancelRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCancelRequest.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCancelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to cancel friend request";
      })

      // UNFRIEND
      .addCase(fetchUnfriend.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnfriend.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUnfriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to  unfriend request";
      })

      // CREATE POST
      .addCase(postCreation.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreation.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(postCreation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch post creation";
      })

      // CREATE COMMENT
      .addCase(commentCreation.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentCreation.fulfilled, (state, action) => {
        state.uniquePost.comments.push(action.payload);
        if ("commentCount" in state.uniquePost) {
          state.uniquePost.commentCount += 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(commentCreation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch post creation";
      })

      // GET UNIQUE POST
      .addCase(fetchUniquePost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUniquePost.fulfilled, (state, action) => {
        state.uniquePost = { ...action.payload.post };
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUniquePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get unique post";
      })

      // LIKE/UNLIKE A POST
      .addCase(likePost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to like/unlike post";
      })

      // LOG IN
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login user";
      })

      // SIGN UP
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to sign up user";
      });
  },
});

export const { logout, resetUniquePost } = userSlice.actions;
export default userSlice.reducer;
