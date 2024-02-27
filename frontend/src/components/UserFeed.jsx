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
  const allPosts = [...userPostArray, ...friendsPostArray];
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  useEffect(() => {
    const updateUserFeed = async () => {
      try {
        await dispatch(fetchUserFeedPosts(userId));
      } catch (error) {
        console.error("Failed to fetch userFeed:", error);
      }
    };

    updateUserFeed();

    const intervalId = setInterval(updateUserFeed, 60000); // 60000 = 1 minute
    return () => clearInterval(intervalId);
  }, [dispatch, userId]);

  const onLikeClick = () => {
      // if the comment has a like then unlike
      // if the comment has an unlike then like
      
  };

  return (
    <div className="w-full flex flex-col gap-6 auto-row-auto">
      <div className="flex flex-col">
        {sortedPosts &&
          sortedPosts.length > 0 &&
          sortedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-700 border border-slate-500 p-3 grid grid-cols-[min-content_min-content_min-content_1fr_min-content_min-content_min-content] grid-rows-[auto_1fr_min-content]"
            >
              <div className="w-10 h-10 relative col-start-1 row-start-1 row-span-2 mr-3">
                <Image
                  src={`http://localhost:3000${post.user.profilePic}`}
                  alt={`${post.user.username}'s profile picture`}
                  fill
                  className="rounded-full object-cover"
                  sizes="100%"
                  priority
                />
              </div>
              <div className="col-start-2 col-span-5 row-start-1 flex items-center font-semibold text-white">
                {post.user.username}
              </div>
              <button className="row-start-1 col-start-7 flex items-start ml-7 text-white">
                ...
              </button>
              <div className="col-start-2 col-span-5 row-start-2 mb-5 text-white">
                {post.body}
              </div>
              <div
                onClick={() => onLikeClick()}
                className="col-start-2 row-start-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white fill-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <div className="col-start-3 row-start-3 flex items-center ml-1 text-sm text-white">
                {post.likeCount}
              </div>
              <div className="col-start-5 row-start-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white fill-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              </div>
              <div className="col-start-6 row-start-3 flex items-center ml-1 text-sm text-white">
                {post.commentCount}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserFeed;
