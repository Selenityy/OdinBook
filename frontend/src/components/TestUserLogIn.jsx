"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/features/user-slice";

const TestUserLogIn = () => {
  const [userInfo, setUserInfo] = useState({
    username: "testuser2",
    password: "password123",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const testUserOnclick = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(userInfo));
      const user = res.payload._id;

      if (user) {
        setUserInfo({
          username: "",
          password: "",
        });
        router.push("/user");
      } else {
        setErrorMessage("*Username or Password is incorrect.");
      }
    } catch (error) {
      console.log("Failed to log in as test user");
    }
  };

  return (
    <>
      {errorMessage.length > 1 && (
        <div className="text-red-500 text-sm italic">{errorMessage}</div>
      )}
      <button type="button" className="btn w-96 mb-2" onClick={testUserOnclick}>
        Log in as test user
      </button>
    </>
  );
};

export default TestUserLogIn;
