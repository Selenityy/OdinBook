"use client";

import UniquePost from "@/components/UniquePost";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/globals.css";
import CreateCommentForm from "@/components/CreateCommentForm";
import UniquePostComments from "@/components/UniquePostComments";
import { useEffect, useState } from "react";
import {
  fetchUniquePost,
  resetUniquePost,
  resetUniqueComment,
} from "@/redux/features/user-slice";

const UniquePostPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const onBackClick = async () => {
    if (window.history.length > 1) {
      router.back();
      await dispatch(resetUniquePost());
      // await dispatch(resetUniqueComment());
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
