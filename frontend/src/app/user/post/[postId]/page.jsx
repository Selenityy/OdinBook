"use client";

import UniquePost from "@/components/UniquePost";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/globals.css";
import CreateCommentForm from "@/components/CreateCommentForm";
import UniquePostComments from "@/components/UniquePostComments";
import { useEffect, useState } from "react";
import { fetchUniquePost } from "@/redux/features/user-slice";

const UniquePostPage = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const postId = segments.pop();
  const post = useSelector((state) => state.user.uniquePost);
  const userState = useSelector((state) => state.user.value);
  const userId = userState._id;
  const commentsArray = post.comments;
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);

  useEffect(() => {
    const updateUniquePostPage = async () => {
      try {
        await dispatch(fetchUniquePost({ userId, postId })).unwrap();
      } catch (error) {
        console.error("Failed to reload unique post page:", error);
      }
    };
    updateUniquePostPage();
  }, [dispatch, refreshDataTrigger, userId, postId]);

  return (
    <div className="w-full">
      <section>
        <UniquePost />
      </section>
      <section className="sticky top-0 z-10">
        <CreateCommentForm
          refreshDataTrigger={refreshDataTrigger}
          setRefreshDataTrigger={setRefreshDataTrigger}
          postId={postId}
          userId={userId}
        />
      </section>
      <section>
        <UniquePostComments
          userId={userId}
          commentsArray={commentsArray}
          setRefreshDataTrigger={setRefreshDataTrigger}
          postId={postId}
        />
      </section>
    </div>
  );
};

export default UniquePostPage;
