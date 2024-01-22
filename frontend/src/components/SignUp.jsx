"use client";

import { UserContext } from "@/context/Context";
import { useContext } from "react";
import Link from "next/link";

const SignUp = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { firstName, lastName, email, username, password } = userData;

  const apiFetchSignUp = async (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    try {
      console.log("inside api sign up fetch");
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("res:", res);
        console.log("Signup successful:", data);
        // redirect
      } else {
        console.log(res);
        console.error("Signup failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    await apiFetchSignUp(firstName, lastName, email, username, password);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSignUpSubmit}>
        <p>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </p>
        <button id="sign-up-btn" type="submit">
          Sign Up
        </button>
      </form>
      <div>
        <Link href="/login">Already have an account? Log in here.</Link>
      </div>
    </div>
  );
};

export default SignUp;
