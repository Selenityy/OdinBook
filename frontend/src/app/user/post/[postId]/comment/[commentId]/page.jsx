"use client";

import CreateCommentFormForComment from "@/components/CreateCommentFormForComment";
import UniqueComment from "@/components/UniqueComment";
import UniqueCommentComments from "@/components/UniqueCommentComments";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  resetUniqueComment,
  fetchUniqueComment,
} from "@/redux/features/user-slice";
import "../../../../../../styles/globals.css";
import UniquePost from "@/components/UniquePost";

const UniqueCommentPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const commentId = segments[5];
  const comment = useSelector((state) => state.user.uniqueComment);
  const commentsArray = comment.comments;
  const post = useSelector((state) => state.user.uniquePost);
  const postId = post._id;
  const userState = useSelector((state) => state.user.value);
  const userId = userState._id;
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);

  useEffect(() => {
    const updateUniqueCommentPage = async () => {
      try {
        await dispatch(
          fetchUniqueComment({ userId, postId, commentId })
        ).unwrap();
      } catch (error) {
        console.error("Failed to reload unique comment page:", error);
      }
    };
    updateUniqueCommentPage();
  }, [dispatch, refreshDataTrigger, postId, userId, commentId]);

  return (
    <div className="w-full">
      <section>
        <UniquePost />
      </section>
      <section>
        <UniqueComment />
      </section>
      <section className="sticky top-0 z-10">
        <CreateCommentFormForComment
          refreshDataTrigger={refreshDataTrigger}
          setRefreshDataTrigger={setRefreshDataTrigger}
          postId={postId}
          userId={userId}
          commentId={commentId}
          comment={comment}
        />
      </section>
      <section>
        <UniqueCommentComments
          userId={userId}
          commentsArray={commentsArray}
          setRefreshDataTrigger={setRefreshDataTrigger}
          postId={postId}
          comment={comment}
          commentId={commentId}
        />
      </section>
    </div>
  );
};

export default UniqueCommentPage;
