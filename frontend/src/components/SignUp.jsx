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

  const onClickSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setPasswordMismatch(true);
      return; // Stop the execution if passwords don't match
    }

    // Reset state in case of previous errors or mismatch
    setPasswordMismatch(false);
    setErrorMessage("");

    const actionResult = await dispatch(signUpUser(formData));
    console.log(actionResult);
    if (signUpUser.fulfilled.match(actionResult)) {
      setUserCreated(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
      setConfirmPassword("");
    } else if (signUpUser.rejected.match(actionResult)) {
      // const errorMessage = actionResult.payload
      //   ? actionResult.payload
      //   : "An error occurred";
      setErrorMessage("*Username or Email is already taken");
    }
  };

  return (
    <div className="xxs:w-full xxs:pt-5 md:pt-0 sm:w-full md:w-80 lg:w-96 2xl:w-6/12">
      <form className="xxs:w-full xxs:items-center  md:w-full md:px-2 xxs:flex xxs:flex-col lg:grid" onSubmit={onClickSignUp}>
        <div className="xxs:w-full pb-3 md:w-full flex xxs:flex-col md:flex-row gap-2">
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
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                setUserCreated(false);
              }}
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
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                setUserCreated(false);
              }}
              required
            />
          </div>
        </div>
        <div className="xxs:w-full pb-3 md:w-full flex">
          <label htmlFor="email" className="text-gray-700 text-lg"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.email || ""}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setUserCreated(false);
            }}
            required
          />
        </div>
        <div className="xxs:w-full pb-3 md:w-full flex">
          <label htmlFor="username" className="text-gray-700 text-lg"></label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Username"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.username || ""}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setUserCreated(false);
            }}
            required
          />
        </div>
        <div className="xxs:w-full pb-3 md:w-full flex">
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
              setUserCreated(false);
            }}
            required
          />
        </div>
        <div className="xxs:w-full xxs:pb-8 md:pb-3 md:w-full flex">
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
              setUserCreated(false);
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
        <button id="sign-up-btn" type="submit" className="btn xxs:w-full lg:w-full">
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
