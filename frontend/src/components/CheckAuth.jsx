"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";

const CheckAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData());
      // router.push("/user");
    } else {
      router.push("/");
    }
  }, [dispatch, router]);
};
export default CheckAuth;
