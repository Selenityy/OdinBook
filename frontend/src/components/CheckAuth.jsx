"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/redux/features/user-slice";
import { useRouter, usePathname } from "next/navigation";

const CheckAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData());
      // router.push("/user");
    } else {
      if (pathname !== "/" && pathname !== "/signup") {
        router.push("/");
      }
    }
  }, [dispatch, router, pathname]);
};
export default CheckAuth;
