"use client";

// if logged in, show the username and profile pic
// if not logged in, show sign up button
import React, { useContext } from "react";
import { UserContext } from "@/context/context";

const UserProfile = () => {
  const { userData } = useContext(UserContext);
  const { username, profilePic } = userData;

  const handleClick = () => {
    // drops down menu
  };

  return (
    <div>
      <button
        class="header"
        id="profile-pic"
        src={profilePic}
        onClick={handleClick}
      >
        Image
      </button>
      <div class="header" id="header-username">
        {username ? username : "N/A"}
      </div>
    </div>
  );
};

export default UserProfile;
