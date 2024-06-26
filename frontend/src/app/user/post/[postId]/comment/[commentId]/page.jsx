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

  const onBackClick = async () => {
    if (window.history.length > 1) {
      router.back();
      //   await dispatch(resetUniquePost());
      await dispatch(resetUniqueComment());
    } else {
      router.push("/defaultPage");
    }
  };

  return (
    <div className="w-full">
      <section className="flex items-center gap-2 mb-3 sticky top-0 z-20 bg-slate-800 pt-3 pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
          onClick={() => onBackClick()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1 className="text-white text-xl font-semibold">Post</h1>
      </section>
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
