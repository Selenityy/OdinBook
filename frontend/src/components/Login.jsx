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
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const onClickLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(formData));
      console.log(res);
      const user = res.payload._id;

      if (user) {
        setFormData({
          username: "",
          password: "",
        });
        router.push("/user");
      } else {
        setErrorMessage("*Username or Password is incorrect.");
      }
    } catch (error) {
      setErrorMessage("*Username or Password is incorrect.");
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="w-96">
      <form className="w-full grid" onSubmit={onClickLogIn}>
        <div className="pb-3 flex gap-2">
          <label htmlFor="username" className="text-gray-700 text-lg">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="pb-6 flex gap-3">
          <label htmlFor="password" className="text-gray-700 text-lg">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.password || ""}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        {errorMessage.length > 1 && (
          <div className="text-red-500 text-sm italic">{errorMessage}</div>
        )}
        <button id="login-btn" type="submit" className="btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
