"use client";

import { UserContext } from "@/context/Context";
import React, { useContext } from "react";
import Link from "next/link";

const Login = () => {
  const { userData, setUserData, handleLogin } = useContext(UserContext);

  const apiFetchLogIn = async (username, password) => {
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        localStorage.setItem("token", token);
        console.log("Login successful:", data);
        handleLogin(userData);
      } else {
        console.log(res);
        console.error("Login failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await apiFetchLogIn();
    setUserData({});
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <p>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username || ""}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password || ""}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
        </p>
        <button id="login-btn" type="submit">
          Login
        </button>
      </form>
      <div>
        <Link href="/signup">Do not have an account yet? Sign up here.</Link>
      </div>
    </div>
  );
};

export default Login;
