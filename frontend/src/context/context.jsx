"use client";

import React, { useState, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
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
  console.log("userData:", userData);

  const handleLogin = (userData) => {
    setUserData({ ...userData, isLoggedIn: true });
  };

  const handleLogout = () => {
    setUserData({
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

  return (
    <UserContext.Provider
      value={{ userData, setUserData, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
