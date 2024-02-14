"use client";

import { useSelector } from "react-redux";

const UserFeed = () => {
  const userState = useSelector((state) => state.user);
  // check user's post, and display them
  // check user's friends
  // check those friend's posts and display them
  // refresh anytime a new post is created by user or friends

  return (
    <div className="w-full mx-16 flex flex-col gap-6 auto-row-auto">
      <div>Friend and User Posts Feed</div>
    </div>
  );
};

export default UserFeed;
