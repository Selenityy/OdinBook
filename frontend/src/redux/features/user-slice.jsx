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
        throw new Error(data.message || "Could not accept friend request");
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
        throw new Error(data.message || "Could not reject friend request");
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
        throw new Error(data.message || "Could not cancel friend request");
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
        throw new Error(data.message || "Could not unfriend");
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

// Update username
export const updateUsername = createAsyncThunk(
  "/user/updateUsername",
  async ({ userId, username, newUsername }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/${username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: newUsername }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update username");
      }
      const updatedUsername = await response.json();
      return updatedUsername.username;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update about
export const updateAbout = createAsyncThunk(
  "/user/updateAbout",
  async ({ userId, username, newAbout }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/${username}/about`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ about: newAbout }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update about");
      }
      const updatedAbout = await response.json();
      return updatedAbout.about;
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

// Delete your own post
export const deleteOwnPost = createAsyncThunk(
  "/user/deleteOwnPost",
  async ({ userId, postId }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not delete a post");
      }
      return { message: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Edit own post
export const editOwnPost = createAsyncThunk(
  "/user/editOwnPost",
  async ({ userId, postId, updatedPost }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: updatedPost }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not edit a post");
      }
      return { message: data.message, updatedPost: data.updatedPost };
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
        throw new Error(data.message || "Could not like a post");
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

// Creating a comment on a post
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
          body: JSON.stringify({ body: commentData }),
        }
      );
      const commentResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      return commentResponse.comment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating a comment on a comment
export const commentCreationOnComment = createAsyncThunk(
  "/user/post/commentCreationOnComment",
  async ({ commentId, postId, userId, commentData }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/comments/${commentId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId,
            postId,
            userId,
            body: commentData,
          }),
        }
      );
      const commentResponse = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create a comment thread");
      }
      return commentResponse.comment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch a specific comment
export const fetchUniqueComment = createAsyncThunk(
  "/user/comment/uniqueComment",
  async ({ userId, postId, commentId }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/comments/${commentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response) {
        throw new Error(data.message || "Could not get unique comment");
      }
      return {
        comment: data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Like a comment
export const likeComment = createAsyncThunk(
  "/user/likeComment",
  async ({ userId, postId, commentId }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/comments/${commentId}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentId, userId }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not like a comment");
      }
      return {
        comment: data.updatedComment,
        commentUserId: data.updatedComment.userId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Edit own comment
export const editOwnComment = createAsyncThunk(
  "/user/editOwnComment",
  async ({ userId, postId, commentId, updatedComment }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: updatedComment }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not update a comment");
      }
      return { message: data.message, updatedComment: data.updatedComment };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete your own comment
export const deleteOwnComment = createAsyncThunk(
  "/user/deleteOwnComment",
  async ({ userId, postId, commentId }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not delete a comment");
      }
      return { message: data.message };
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
        throw new Error("Failed to fetch user data on sign up");
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
        throw new Error("Failed to fetch user data on log in");
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
  uniqueComment: {
    body: "",
    timestamp: null,
    user: {
      _id: "",
      username: "",
      profilePic: "",
    },
    post: {
      _id: "",
    },
    comment: {
      _id: "",
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
    resetUniqueComment: (state) => {
      state.uniqueComment = {
        body: "",
        timestamp: null,
        user: {
          _id: "",
          username: "",
          profilePic: "",
        },
        post: {
          _id: "",
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

      // UPDATE USERNAME
      .addCase(updateUsername.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update username";
      })

      // UPDATE ABOUT
      .addCase(updateAbout.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update about";
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

      // DELETE OWN POST
      .addCase(deleteOwnPost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOwnPost.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteOwnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete own post";
      })

      // EDIT OWN POST
      .addCase(editOwnPost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOwnPost.fulfilled, (state, action) => {
        state.value = { ...state.value, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(editOwnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit own post";
      })

      // CREATE COMMENT ON A POST
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
        state.error = action.payload || "Failed to comment on a post";
      })

      // CREATE COMMENT ON A COMMENT
      .addCase(commentCreationOnComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentCreationOnComment.fulfilled, (state, action) => {
        state.uniqueComment.comments.push(action.payload);
        if ("commentCount" in state.uniqueComment) {
          state.uniqueComment.commentCount += 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(commentCreationOnComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to comment on a comment";
      })

      // GET UNIQUE COMMENT
      .addCase(fetchUniqueComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUniqueComment.fulfilled, (state, action) => {
        state.uniqueComment = { ...action.payload.comment };
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUniqueComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get unique comment";
      })

      // LIKE/UNLIKE A COMMENT
      .addCase(likeComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.uniquePost = { ...state.uniquePost, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to like/unlike comment";
      })

      // DELETE OWN COMMENT
      .addCase(deleteOwnComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOwnComment.fulfilled, (state, action) => {
        // state.uniquePost = { ...state.value, ...action.payload };
        const commentId = action.meta.arg.commentId;
        state.uniquePost.comments = state.uniquePost.comments.filter(
          (comment) => comment._id !== commentId
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteOwnComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete own comment";
      })

      // EDIT OWN COMMENT
      .addCase(editOwnComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOwnComment.fulfilled, (state, action) => {
        // state.uniquePost = { ...state.value, ...action.payload };
        const { updatedComment } = action.payload;
        const commentIndex = state.uniquePost.comments.findIndex(
          (comment) => comment._id === updatedComment._id
        );
        if (commentIndex !== -1) {
          state.uniquePost.comments[commentIndex] = updatedComment;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(editOwnComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit own comment";
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

export const { logout, resetUniquePost, resetUniqueComment } =
  userSlice.actions;
export default userSlice.reducer;
