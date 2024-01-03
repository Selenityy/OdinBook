"use client";

import React, { useState, createContext } from "react";

export const UserContext = createContext();

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

  const handleLogin = (userData) => {
    setUserData({ ...userData, isLoggedIn: true });
  };

  const handleLogout = (userData) => {
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
    <UserContext.Provider value={{ userData, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
