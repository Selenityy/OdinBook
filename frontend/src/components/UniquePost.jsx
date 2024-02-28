"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserFeedPosts,
  likePost,
  fetchUniquePost,
} from "@/redux/features/user-slice";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const UniquePost = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const postId = segments.pop();
  const userState = useSelector((state) => state.user.value);
  const userId = userState._id;
  const userPostArray = userState.userPosts || [];
  const friendsPostArray = userState.friendPosts || [];
  const allPosts = [...userPostArray, ...friendsPostArray];
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);

  useEffect(() => {
    const updatePostComments = async () => {
      try {
        await dispatch(fetchUniquePost({userId, postId})).unwrap();
      } catch (error) {
        console.error("Failed to update post comments:", error);
      }
    };
    updatePostComments();
  }, [dispatch, refreshDataTrigger, userId, postId]);

  return (
    <div>
      <section>(actual post, like & comment count)</section>
    </div>
  );
};

export default UniquePost;
