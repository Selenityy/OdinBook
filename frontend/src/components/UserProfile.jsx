"use client";

// if logged in, show the username and profile pic
// if not logged in, show sign up button

// username
// profile picture
// profile pic drops down to select profile, logout

import { useContext, useEffect } from "react";
import { UserContext } from "@/context/Context";
import Image from "next/image";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { username, profilePic, isLoggedIn } = user;

  const handleClick = () => {
    // drops down menu
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Image
            className="header"
            id="profile-pic"
            src={`http://localhost:3000${profilePic}`}
            alt="profile-pic"
            width={50}
            height={50}
            onClick={handleClick}
          />
          <div>{username}</div>
        </>
      ) : (
        <div>
          <button>Log in</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
