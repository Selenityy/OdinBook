"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUniquePost, commentCreation } from "@/redux/features/user-slice";
import { usePathname } from "next/navigation";

const CreateCommentForm = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const postId = segments.pop();
  const post = useSelector((state) => state.user.uniquePost);
  const userState = useSelector((state) => state.user.value);
  const userId = userState._id;
  const [commentData, setCommentData] = useState({
    comment: "",
  });

  const onCommentCreationClick = async (e) => {
    console.log("inside comment creation click");
    e.preventDefault();
    try {
      console.log("inside try");
      await dispatch(
        commentCreation({
          postId,
          userId,
          commentData: { comment: commentData.comment },
        })
      ).unwrap();
      dispatch(fetchUniquePost({ userId, postId }));
      setCommentData({ comment: "" });
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <form
        onSubmit={onCommentCreationClick}
        className="bg-slate-700 border border-slate-500"
      >
        <label htmlFor="comment-creation-content"></label>
        <div className="flex flex-col p-1 bg-slate-700 border border-slate-500">
          <div>
            <input
              type="text"
              id="comment-creation-content"
              name="comment-creation-content"
              className="text-lg px-2 pt-2 pb-10 w-full bg-slate-700 text-white"
              placeholder="Post your reply"
              value={commentData.comment || ""}
              onChange={(e) =>
                setCommentData({ ...commentData, comment: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end p-2">
            <button id="post-btn" type="submit" className="btn2 w-fit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCommentForm;
