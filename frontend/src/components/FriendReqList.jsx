"use client";

import { useSelector, useDispatch } from "react-redux";

const FriendReqList = () => {
  // const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const friends = userState.value.friends; // is given as an array of ids
  //   console.log(friends);

  return (
    <div>
      <div>
        <h1 className="font-semibold">Friend Requests</h1>
      </div>
      <div>
        <h1 className="font-semibold">Friend List</h1>
        <div>
          {friends && friends.length > 0 ? (
            <ul>
              {friends.map((friend) => (
                <li key={friend._id}>{friend.username}</li>
              ))}
            </ul>
          ) : (
            <p>No friends to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendReqList;
