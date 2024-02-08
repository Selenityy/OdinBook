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
    <div className="w-96">
      {/* <h1 className="text-3xl text-left text-gray-800 font-semibold py-3">Log In</h1> */}
      <form className="w-full grid" onSubmit={onClickLogIn}>
        <p className="pb-3 flex gap-2">
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
        </p>
        <p className="pb-6 flex gap-3">
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
        </p>
        <button id="login-btn" type="submit" className="btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
