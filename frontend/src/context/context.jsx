"use client";

// NOT IN USE, SEE REDUX
import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
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
    id: "",
    testUser: false,
    isLoggedIn: false,
  });

  // useEffect(() => {
  //   console.log("context user:", user);
  // }, [user]);

  useEffect(() => {
    const fetchUserData = async (token) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/data`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser({
            ...userData,
            isLoggedIn: true,
          });
          console.log("in useEffect setUser");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
