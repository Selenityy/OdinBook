"use client";

import { useSelector, useDispatch } from "react-redux";

const FriendReqList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Friend Requests</h1>
      <p>Friend List</p>
    </div>
  );
};

export default FriendReqList;
