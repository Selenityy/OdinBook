"use client";

import { UserContext } from "@/context/Context";
import { useContext } from "react";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  setUser({
    fullname: "",
    email: "",
    username: "",
    about: "",
    profilePic: "",
    friends: [],
    friendRequests: [],
    posts: [],
    isLoggedIn: false,
  });
  localStorage.removeItem("token");
};

export default Logout;
