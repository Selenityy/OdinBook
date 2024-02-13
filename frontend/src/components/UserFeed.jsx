"use client";

import { useSelector } from "react-redux";
import CreatePostForm from "./CreatePostForm";

const UserFeed = () => {
  const userState = useSelector((state) => state.user);

  return (
    <div className="w-full mx-16 flex flex-col gap-6 auto-row-auto">
      <div>Friend and User Posts Feed</div>
    </div>
  );
};

export default UserFeed;
