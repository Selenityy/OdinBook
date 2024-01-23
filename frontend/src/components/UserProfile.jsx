"use client";

// if logged in, show the username and profile pic
// if not logged in, show sign up button
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/Context";

const UserProfile = () => {
  const { userData } = useContext(UserContext);
  const { username, profilePic, isLoggedIn } = userData;
  console.log("userData:", userData);

  const handleClick = () => {
    // drops down menu
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button
            className="header"
            id="profile-pic"
            src={profilePic}
            onClick={handleClick}
          ></button>
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
