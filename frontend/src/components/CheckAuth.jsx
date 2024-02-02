"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/redux/features/user-slice";

const CheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch]);
};
export default CheckAuth;
