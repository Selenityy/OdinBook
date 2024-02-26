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
      console.log(user);
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

// Creating a post
export const postCreation = createAsyncThunk(
  "/user/postCreation",
  async ({ postData, userId }, thunkAPI) => {
    console.log(postData);
    console.log(userId);
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
      console.log("post", post);
      // dispatch(fetchUserFeedPosts(userId));
      return post;
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
