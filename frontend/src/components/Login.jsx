"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/features/user-slice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickLogIn = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    setFormData({
      username: "",
      password: "",
    });
    router.push("/user");
  };

  return (
    <div>
      <form onSubmit={onClickLogIn}>
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
