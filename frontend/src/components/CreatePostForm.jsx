"use client";

import { useState } from "react";

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    post: "",
  });

  const onPostCreationClick = (e) => {
    e.preventDefault();
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
