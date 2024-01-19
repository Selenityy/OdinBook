"use client";

import { UserContext } from "@/context/context";
import React, { useContext } from "react";
// import Link from "next/link";

const Login = () => {
  const { userData, setUserData, handleLogin } = useContext(UserContext);

  const apiFetchLogIn = async (username, password) => {
    try {
      const res = await fetch("http://localhost:3000/login", {
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
        // return <Link href="/"></Link>;
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

  return <div>Login</div>;
};

export default Login;
