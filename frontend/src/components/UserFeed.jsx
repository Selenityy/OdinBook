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
  const friendsPostArray = userState.value.friendPosts || [];
  const allPosts = [...userPostArray, ...friendsPostArray].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  useEffect(() => {
    dispatch(fetchUserFeedPosts(userId));
  }, [dispatch, userId]);

  return (
    <div className="w-full mx-16 flex flex-col gap-6 auto-row-auto">
      <div className="flex flex-col gap-8">
        {allPosts &&
          allPosts.length > 0 &&
          allPosts.map((post) => (
            <div key={post._id} className="bg-slate-50 rounded-lg p-2">
              <div className="flex">
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
              </div>
              <div>{post.body}</div>
              <div className="flex justify-between">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between mx-1.5">
                <div>{post.likeCount}</div>
                <div>{post.commentCount}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserFeed;
