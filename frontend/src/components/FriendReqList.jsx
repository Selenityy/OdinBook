"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  fetchSendFriendRequests,
  fetchAcceptFriendRequest,
  fetchRejectFriendRequest,
  fetchCancelRequest,
  fetchUnfriend,
  fetchUserData,
} from "@/redux/features/user-slice";

const FriendReqList = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const friends = userState.value.friends;
  const friendRequests = userState.value.friendRequests;
  const sentRequests = userState.value.sentRequests;
  const currentUserId = userState.value._id;
  const [allUsers, setAllUsers] = useState([]);
  const [unfriendedUsers, setUnfriendedUsers] = useState([]);
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);

  useEffect(() => {
    async function fetchUpdatedUser() {
      try {
        await dispatch(fetchUserData()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUpdatedUser();

    const intervalId = setInterval(fetchUpdatedUser, 6000); // 6000 = 1 minute
    return () => clearInterval(intervalId);
  }, [dispatch, refreshDataTrigger]);

  // on render and on trigger rerender, fetch all users and update the state
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
  }, [refreshDataTrigger]);

  // on render and on users change, set the people you may know
  useEffect(() => {
    // get friend, friend request and user id
    const friendIds = friends.map((friend) => friend._id);
    const friendRequestsId = friendRequests.map((request) => request._id);

    // filter those ids out of all the users
    const remainingUsers = allUsers.filter(
      (user) =>
        !friendIds.includes(user._id) &&
        !friendRequestsId.includes(user._id) &&
        user._id !== currentUserId
    );

    // remaining users are people you may know, aka non-friends
    setUnfriendedUsers(remainingUsers);
  }, [allUsers, friends, friendRequests, currentUserId]);

  const onAcceptClick = async (userId, friendUsername) => {
    await dispatch(fetchAcceptFriendRequest({ userId, friendUsername }));
    setRefreshDataTrigger((prev) => !prev);
  };

  const onRejectClick = async (userId, friendUsername) => {
    await dispatch(fetchRejectFriendRequest({ userId, friendUsername }));
    setRefreshDataTrigger((prev) => !prev);
  };

  const onFriendRequestClick = async (userId, friendUsername) => {
    await dispatch(fetchSendFriendRequests({ userId, friendUsername }));
    setRefreshDataTrigger((prev) => !prev);
  };

  const onCancelRequestClick = async (userId, friendUsername) => {
    await dispatch(fetchCancelRequest({ userId, friendUsername }));
    setRefreshDataTrigger((prev) => !prev);
  };

  const onUnfriendRequestClick = async (userId, friendUsername) => {
    await dispatch(fetchUnfriend({ userId, friendUsername }));
    setRefreshDataTrigger((prev) => !prev);
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
                  <div
                    onClick={() =>
                      onAcceptClick(currentUserId, friendReq.username)
                    }
                  >
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
                  <div
                    onClick={() =>
                      onRejectClick(currentUserId, friendReq.username)
                    }
                  >
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
                  <div
                    onClick={() =>
                      onUnfriendRequestClick(currentUserId, friend.username)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
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
        <h1 className="font-bold tracking-wide text-white">
          People You May Know
        </h1>
        <div className="mx-5 my-3">
          {unfriendedUsers && unfriendedUsers.length > 0 ? (
            <ul>
              {unfriendedUsers.map((user) => (
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
                  {sentRequests.some((request) => request._id === user._id) ? (
                    <div className="flex gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-white fill-none"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                      <div
                        onClick={() =>
                          onCancelRequestClick(currentUserId, user.username)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-white fill-none"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        onFriendRequestClick(currentUserId, user.username)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
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
                  )}
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
