import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for current user
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
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing up
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
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging in
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
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
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
