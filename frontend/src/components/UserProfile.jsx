"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, logout } from "@/redux/features/user-slice";

const UserProfile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const userId = userState.value._id;
  const username = userState.value.username;
  const profilePic = userState.value.profilePic;
  const isLoggedIn = userState.isLoggedIn;

  // useEffect(() => {
  //   console.log(userState);
  // }, [userState]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     dispatch(fetchUserData());
  //   } else {
  //     return;
  //   }
  // }, [dispatch]);

  const handleDropDownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleHomeClick = () => {
    router.push("/user");
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    router.push(`/user/${userId}`);
    setShowDropdown(!showDropdown);
  };

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/");
    setShowDropdown(!showDropdown);
  };

  return (
    <Suspense fallback={<Loading />}>
      <section>
        <div>
          <Image
            className="header"
            id="profile-pic"
            src={`http://localhost:3000${profilePic}`}
            alt="profile-pic"
            width={50}
            height={50}
            onClick={handleDropDownClick}
          />
          {showDropdown && (
            <div>
              <div onClick={handleHomeClick}>Home</div>
              <div onClick={handleProfileClick}>Profile</div>
              <div onClick={handleLogOut}>Logout</div>
            </div>
          )}
        </div>
        <div>{username}</div>
      </section>
    </Suspense>
  );
};

export default UserProfile;
