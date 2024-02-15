"use client";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserFeedPosts } from "@/redux/features/user-slice";
import { useEffect } from "react";
import Image from "next/image";

const UserFeed = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const userId = userState.value._id;
  const userPostArray = userState.value.userPosts || [];
  const friendsPostArray = userState.value.friendsPosts || [];
  const allPosts = [...userPostArray, ...friendsPostArray].sort(
    (a, b) => b.timestamp - a.timestamp
  );
  console.log(friendsPostArray);

  useEffect(() => {
    dispatch(fetchUserFeedPosts(userId));
  }, [dispatch, userId]);

  return (
    <div className="w-full mx-16 flex flex-col gap-6 auto-row-auto">
      <div>
        {allPosts &&
          allPosts.length > 0 &&
          allPosts.map((post) => (
            <div key={post._id}>
              <div className="w-10 h-10 relative">
                <Image
                  src={`http://localhost:3000${post.user.profilePic}`}
                  alt={`${post.user.username}'s profile picture`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  priority
                />
              </div>
              <div>{post.user.username}</div>
              <button>...</button>
              <div>{post.body}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserFeed;
