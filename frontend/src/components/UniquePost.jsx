"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  fetchUniquePost,
  deleteOwnPost,
  editOwnPost,
} from "@/redux/features/user-slice";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const UniquePost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const postId = segments.pop();

  const post = useSelector((state) => state.user.uniquePost);

  const userState = useSelector((state) => state.user.value);
  const userId = userState._id;

  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);
  const [activePostIdForDropdown, setActivePostIdForDropdown] = useState(null);
  const [editMode, setEditMode] = useState({ postId: null, content: "" });

  useEffect(() => {
    const updatePostComments = async () => {
      try {
        await dispatch(fetchUniquePost({ userId, postId })).unwrap();
      } catch (error) {
        console.error("Failed to update post comments:", error);
      }
    };
    updatePostComments();
  }, [dispatch, refreshDataTrigger, userId, postId]);

  const onLikeClick = async (userId, postId) => {
    await dispatch(likePost({ userId, postId }));
    setRefreshDataTrigger((prev) => !prev);
  };

  const onEllipsisClick = (postId) => {
    setActivePostIdForDropdown((current) =>
      current === postId ? null : postId
    );
  };

  const onDeleteClick = async (userId, postId) => {
    try {
      await dispatch(deleteOwnPost({ userId, postId })).unwrap();
      setRefreshDataTrigger((prev) => !prev);
      setActivePostIdForDropdown((current) =>
        current === postId ? null : postId
      );
      router.back();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updatingEditedPost = async (userId, postId, updatedPost) => {
    try {
      await dispatch(editOwnPost({ userId, postId, updatedPost })).unwrap();
      setRefreshDataTrigger((prev) => !prev);
      setActivePostIdForDropdown((current) =>
        current === postId ? null : postId
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const onEditClick = (post) => {
    setEditMode({ postId: post._id, content: post.body });
    setActivePostIdForDropdown(null);
  };

  const onEditChange = (e) => {
    setEditMode((prevState) => ({ ...prevState, content: e.target.value }));
  };

  const onEditSave = async (postId) => {
    if (editMode.postId === postId) {
      await updatingEditedPost(userId, postId, editMode.content);
      setEditMode({ postId: null, content: "" });
      setActivePostIdForDropdown(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 auto-row-auto">
      <div className="bg-slate-700 border border-slate-500 p-3 grid grid-cols-[min-content_min-content_min-content_1fr_min-content_min-content_40px] grid-rows-[auto_1fr_min-content]">
        <div className="w-10 h-10 relative col-start-1 row-start-1 row-span-2 mr-3">
          <Image
            src={`/${post.user.profilePic}`}
            alt={`${post.user.username}'s profile picture`}
            className="rounded-full object-cover"
            width={50}
            height={50}
            priority
          />
        </div>
        <div className="col-start-2 col-span-5 row-start-1 flex items-center font-semibold text-white">
          {post.user.username}
        </div>
        {/* if you own the post, you can see the ... */}
        {userId === post.user._id && editMode.postId === null && (
          <button
            className="row-start-1 col-start-7 flex items-start ml-7 text-white cursor-pointer"
            onClick={() => onEllipsisClick(post._id)}
          >
            ...
          </button>
        )}
        {/* if you click on the ... you'll see these options */}
        {activePostIdForDropdown === post._id && (
          <div className="bg-slate-800 border-2 border-slate-500 rounded-2xl px-3 py-2 flex flex-col gap-1 col-start-5 col-span-3 row-start-2 row-span-2 drop-shadow-glow">
            <div
              className="hover:font-bold text-sm text-white cursor-pointer w-min"
              onClick={() => onEditClick(post)}
            >
              Edit
            </div>
            <div
              className="hover:font-bold text-sm text-white cursor-pointer w-min"
              onClick={() => onDeleteClick(userId, post._id)}
            >
              Delete
            </div>
          </div>
        )}
        {/* if you click edit on your post, you'll see the save button */}
        {editMode.postId === post._id && (
          <div className="col-start-5 col-span-3 row-start-1 row-span-2 flex items-center justify-end">
            <button
              className="cursor-pointer sm-btn3"
              onClick={() => onEditSave(post._id)}
            >
              Save
            </button>
          </div>
        )}
        <div className="col-start-2 col-span-3 row-start-2 mb-5 text-white">
          {/* if you click edit on your post, you'll be able to click into the body field, otherwise it's just the post's body */}
          {editMode.postId === post._id ? (
            <input
              type="text"
              value={editMode.content}
              onChange={onEditChange}
              className="bg-slate-700 text-white w-full border-2 border-yellow-500 border-dashed p-px"
            />
          ) : (
            post.body
          )}
        </div>
        {/* <div className="w-full border border-gray-500"></div> */}
        <div
          onClick={() => onLikeClick(userId, postId)}
          className="col-start-2 row-start-3 cursor-pointer"
        >
          {post.likes.includes(userId) ? (
            // filled heart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-white"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            //empty heart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white fill-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </div>
        <div className="col-start-3 row-start-3 flex items-center ml-1 text-sm text-white">
          {post.likeCount}
        </div>
        <div className="col-start-5 row-start-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white fill-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </div>
        <div className="col-start-6 row-start-3 flex items-center ml-1 text-sm text-white">
          {post.commentCount}
        </div>
      </div>
    </div>
  );
};

export default UniquePost;
