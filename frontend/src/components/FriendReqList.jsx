"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useState, useEffect } from "react";

const FriendReqList = () => {
  //   const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const friends = userState.value.friends;
  const friendRequests = userState.value.friendRequests;
  const [allUsers, setAllUsers] = useState([]);

  // Extract Ids
  const friendIds = friends.map((friend) => friend._id);
  const friendRequestsId = friendRequests.map((request) => request._id);
  const currentUserId = userState.value._id;

  // Filter allUsers removing the friends, friend requests and current user
  const filteredUsers = allUsers.filter(
    (user) =>
      !friendIds.includes(user._id) &&
      !friendRequestsId.includes(user._id) &&
      user._id !== currentUserId
  );

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/user/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allUsersObj = await res.json();
      setAllUsers(allUsersObj);
    }

    fetchData();
  }, []);

  const onAcceptClick = () => {
    console.log("accepted");
  };

  const onRejectClick = () => {
    console.log("rejected");
  };

  const onFriendRequestClick = () => {
    console.log("friend requested");
  };

  return (
    <div className="flex flex-col rounded-lg p-2 gap-3 bg-slate-700">
      <div>
        <h1 className="font-bold tracking-wide text-white">Friend Requests</h1>
        <div className="mx-5 my-3">
          {friendRequests && friendRequests.length > 0 ? (
            <ul>
              {friendRequests.map((friendReq) => (
                <li
                  key={friendReq._id}
                  className="flex justify-center items-center space-x-3 mb-3"
                >
                  <div className="w-10 h-10 relative">
                    <Image
                      src={`http://localhost:3000${friendReq.profilePic}`}
                      alt={`${friendReq.username}'s profile picture`}
                      fill
                      className="rounded-full object-cover"
                      sizes="100%"
                      priority
                    />
                  </div>
                  <div className="text-white">{friendReq.username}</div>
                  <div onClick={() => onAcceptClick()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-white fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div onClick={() => onRejectClick()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-white fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        <h1 className="font-bold tracking-wide text-white">Friends</h1>
        <div className="mx-5 my-3">
          {friends && friends.length > 0 ? (
            <ul>
              {friends.map((friend) => (
                <li
                  key={friend._id}
                  className="flex items-center space-x-3 mb-3"
                >
                  <div className="w-10 h-10 relative">
                    <Image
                      src={`http://localhost:3000${friend.profilePic}`}
                      alt={`${friend.username}'s profile picture`}
                      fill
                      className="rounded-full object-cover"
                      sizes="100%"
                      priority
                    />
                  </div>
                  <div className="text-white">{friend.username}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        <h1 className="font-bold tracking-wide text-white">
          People You May Know
        </h1>
        <div className="mx-5 my-3">
          {filteredUsers && filteredUsers.length > 0 ? (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user._id} className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={`http://localhost:3000${user.profilePic}`}
                      alt={`${user.username}'s profile picture`}
                      fill
                      className="rounded-full object-cover"
                      sizes="100%"
                      priority
                    />
                  </div>
                  <div className="text-white">{user.username}</div>
                  <div onClick={() => onFriendRequestClick()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      className="w-5 h-5 text-white fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendReqList;
