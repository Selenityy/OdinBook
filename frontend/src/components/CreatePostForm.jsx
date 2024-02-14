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
    <div className="w-full mx-16 flex flex-col gap-6">
      <form onSubmit={onPostCreationClick} className="bg-slate-100 rounded-lg">
        <label htmlFor="post-creation-content"></label>
        <div className="flex flex-col p-1 border-2 border-black rounded-lg">
          <div>
            <input
              type="text"
              id="post-creation-content"
              name="post-creation-content"
              className="text-base px-2 pt-2 pb-10 w-full bg-slate-50"
              placeholder="What's on your mind..."
              required
            />
          </div>
          <div className="flex justify-end p-2">
            <button id="post-btn" type="submit" className="btn w-fit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
