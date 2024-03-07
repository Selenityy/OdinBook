"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentCreationOnComment } from "@/redux/features/user-slice";

const CreateCommentFormForComment = ({
  postId,
  userId,
  refreshDataTrigger,
  setRefreshDataTrigger,
  commentId,
  comment,
}) => {
  const dispatch = useDispatch();
  const [commentData, setCommentData] = useState({
    comment: "",
  });

  const onCommentCreationClick = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        commentCreationOnComment({
          commentId,
          postId,
          userId,
          commentData: commentData.comment,
        })
      ).unwrap();
      setRefreshDataTrigger((prev) => !prev);
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

export default CreateCommentFormForComment;
