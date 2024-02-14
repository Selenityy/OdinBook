"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

const FriendReqList = () => {
  // const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const friends = userState.value.friends;
  const friendRequests = userState.value.friendRequests;

  const onAcceptClick = () => {
    console.log("accepted");
  };

  const onRejectClick = () => {
    console.log("rejected");
  };

  return (
    <div className="flex flex-col rounded-lg p-2 gap-3 bg-slate-50">
      <div>
        <h1 className="font-semibold text-gray-800">Friend Requests</h1>
        <div className="mx-5 my-3">
          {friendRequests && friendRequests.length > 0 ? (
            <ul>
              {friendRequests.map((friendReq) => (
                <li
                  key={friendReq._id}
                  className="flex justify-center items-center space-x-3"
                >
                  <div className="w-10 h-10 relative">
                    <Image
                      src={`http://localhost:3000${friendReq.profilePic}`}
                      alt={`${friendReq.username}'s profile picture`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      priority
                    />
                  </div>
                  <div className="text-gray-800">{friendReq.username}</div>
                  <div onClick={onAcceptClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div onClick={onRejectClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
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
        <h1 className="font-semibold text-gray-800">Friends</h1>
        <div className="mx-5 my-3">
          {friends && friends.length > 0 ? (
            <ul>
              {friends.map((friend) => (
                <li key={friend._id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={`http://localhost:3000${friend.profilePic}`}
                      alt={`${friend.username}'s profile picture`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      priority
                    />
                  </div>
                  <div className="text-gray-800">{friend.username}</div>
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
