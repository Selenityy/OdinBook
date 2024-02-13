"use client";

import { useSelector, useDispatch } from "react-redux";

const FriendReqList = () => {
  // const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const friends = userState.value.friends;
  const friendRequests = userState.value.friendRequests;

  return (
    <div className="flex flex-col border-2 border-black rounded-lg p-2 gap-3">
      <div>
        <h1 className="font-semibold">Friend Requests</h1>
        <div className="indent-5">
          {friendRequests && friendRequests.length > 0 ? (
            <ul>
              {friendRequests.map((friendReq) => (
                <li key={friendReq._id}>{friendReq.username}</li>
              ))}
            </ul>
          ) : (
            <div>No friend requests to display.</div>
          )}
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Friend List</h1>
        <div className="indent-5">
          {friends && friends.length > 0 ? (
            <ul>
              {friends.map((friend) => (
                <li key={friend._id}>{friend.username}</li>
              ))}
            </ul>
          ) : (
            <div>No friends to display.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendReqList;
