"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/Context";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);

  const apiFetchLogIn = async (formData) => {
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        const activeUser = data.user;
        localStorage.setItem("token", token);
        console.log("Login successful:", data);
        // setUserData global
        setUser((prevState) => ({
          ...prevState,
          ...activeUser,
          isLoggedIn: true,
        }));
        console.log("activeUser:", activeUser);
        // redirect to User Home Page
      } else {
        console.log(res);
        console.error("Login failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    console.log(user)
  }, [user]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await apiFetchLogIn(formData);
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
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
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
            value={formData.password || ""}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </p>
        <button id="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
