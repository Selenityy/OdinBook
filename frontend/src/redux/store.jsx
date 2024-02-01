import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

export const store = makeStore();
