"use client";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserFeedPosts } from "@/redux/features/user-slice";
import { useEffect } from "react";

const UserFeed = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const userId = userState.value._id;
  const userPostArray = userState.value.userPosts;
  const friendsPostArray = userState.value.friendsPosts;
  console.log("user", userPostArray);
  console.log("friends", friendsPostArray);

  useEffect(() => {
    dispatch(fetchUserFeedPosts(userId));
  }, [dispatch, userId]);

  return (
    <div className="w-full mx-16 flex flex-col gap-6 auto-row-auto">
      <div>Friend and User Posts Feed</div>
    </div>
  );
};

export default UserFeed;
