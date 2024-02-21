"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      dispatch(signUpUser(formData));
      setUserCreated(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
      setConfirmPassword("");
      // router.push("/");
    }
  };

  return (
    <div className="w-96">
      <form className="w-full grid" onSubmit={onClickSignUp}>
        <div className="pb-3 flex gap-2">
          <label htmlFor="firstName" className="text-gray-700 text-lg">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.firstName || ""}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
        </div>
        <div className="pb-3 flex gap-2">
          <label htmlFor="lastName" className="text-gray-700 text-lg">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.lastName || ""}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>
        <div className="pb-3 flex gap-2">
          <label htmlFor="email" className="text-gray-700 text-lg">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="text-gray-800 text-lg indent-1 flex grow"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="pb-3 flex gap-2">
          <label htmlFor="username" className="text-gray-700 text-lg">
            Username:
          </label>
          <input
            type="username"
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
        <div className="pb-3 flex gap-2">
          <label htmlFor="password" className="text-gray-700 text-lg">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
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
        <div className="pb-3 flex gap-2">
          <label htmlFor="confirmPassword" className="text-gray-700 text-lg">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
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
        <button id="sign-up-btn" type="submit" className="btn">
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
