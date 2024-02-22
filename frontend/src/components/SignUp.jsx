"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "@/redux/features/user-slice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  let res;

  const onClickSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      res = dispatch(signUpUser(formData));
    }

    if (!res.ok) {
      setErrorMessage("*Username or Email already exists.");
    } else {
      setUserCreated(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
      setConfirmPassword("");
    }
  };

  return (
    <div className="w-96">
      <form className="w-96 grid" onSubmit={onClickSignUp}>
        <div className="pb-3 w-96 flex gap-2">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="text-gray-700 text-lg"
            ></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="text-gray-800 text-lg indent-1 w-full"
              value={formData.firstName || ""}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="text-gray-700 text-lg"></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="text-gray-800 text-lg indent-1 w-full"
              value={formData.lastName || ""}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="pb-3 w-96 flex">
          <label htmlFor="email" className="text-gray-700 text-lg"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="pb-3 w-96 flex">
          <label htmlFor="username" className="text-gray-700 text-lg"></label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Username"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="pb-3 w-96 flex">
          <label htmlFor="password" className="text-gray-700 text-lg"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={`text-gray-800 text-lg indent-1 flex grow ${
              passwordMismatch ? "border border-red-500" : ""
            }`}
            value={formData.password || ""}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setPasswordMismatch(false);
            }}
            required
          />
        </div>
        <div className="pb-6 w-96 flex">
          <label
            htmlFor="confirmPassword"
            className="text-gray-700 text-lg"
          ></label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`text-gray-800 text-lg indent-1 flex grow ${
              passwordMismatch ? "border border-red-500" : ""
            }`}
            value={confirmPassword || ""}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMismatch(false);
            }}
            required
          />
        </div>
        {passwordMismatch && (
          <div className="text-red-500 text-sm italic">
            *Passwords do not match
          </div>
        )}
        {errorMessage.length > 1 && (
          <div className="text-red-500 text-sm italic">{errorMessage}</div>
        )}
        <button id="sign-up-btn" type="submit" className="btn w-96">
          Sign Up
        </button>
      </form>
      {userCreated && (
        <div className=" pt-2 text-green-500 text-md font-bold">
          Account creation successful!
        </div>
      )}
    </div>
  );
};

export default SignUp;
