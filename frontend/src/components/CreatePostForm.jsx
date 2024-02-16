"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCreation, fetchUserFeedPosts } from "@/redux/features/user-slice";

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    post: "",
  });
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const userId = userState.value._id;

  const onPostCreationClick = (e) => {
    e.preventDefault();
    dispatch(postCreation({ postData, userId }));
    // dispatch(fetchUserFeedPosts(userId));
    setPostData({
      post: "",
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <form
        onSubmit={onPostCreationClick}
        className="bg-slate-700 border border-slate-500"
      >
        <label htmlFor="post-creation-content"></label>
        <div className="flex flex-col p-1 bg-slate-700 border border-slate-500">
          <div>
            <input
              type="text"
              id="post-creation-content"
              name="post-creation-content"
              className="text-lg px-2 pt-2 pb-10 w-full bg-slate-700 text-white"
              placeholder="What's on your mind..."
              value={postData.post || ""}
              onChange={(e) =>
                setPostData({ ...postData, post: e.target.value })
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

export default CreatePostForm;
