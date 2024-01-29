"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/Context";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const { username, profilePic, isLoggedIn } = user;
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  let userId = user._id;

//   useEffect(() => {
//     console.log("useEffect user:", user);
//   }, [user]);

  const handleLogInClick = () => {
    router.push("/login");
  };

  const handleDropDownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    router.push(`/user/${userId}`);
  };

  const handleLogOut = () => {
    setUser({
      fullname: "",
      email: "",
      username: "",
      about: "",
      profilePic: "",
      friends: [],
      friendRequests: [],
      posts: [],
      isLoggedIn: false,
    });
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
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
                <div onClick={handleProfileClick}>Profile</div>
                <div onClick={handleLogOut}>Logout</div>
              </div>
            )}
          </div>
          <div>{username}</div>
        </>
      ) : (
        <div>
          <button onClick={handleLogInClick}>Log in</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
