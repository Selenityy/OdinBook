"use client";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserFeedPosts, likePost } from "@/redux/features/user-slice";
import { useEffect, useState } from "react";
import Image from "next/image";

const UniquePost = () => {
  return (
    <div>Unique Post Component</div>
  )
}

export default UniquePost