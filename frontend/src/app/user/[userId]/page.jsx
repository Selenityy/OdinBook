"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserFeedPosts,
  likePost,
  fetchUserData,
  deleteOwnPost,
  editOwnPost,
} from "@/redux/features/user-slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/globals.css";
import ModalEditProfile from "@/components/ModalEditProfile";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const userId = userState.value._id;
  const username = userState.value.username;
  const profilePic = userState.value.profilePic;
  const about = userState.value.about;
  const posts = userState.value.userPosts || [];
  const postArray = [...posts];
  const sortedPosts = postArray.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [activePostIdForDropdown, setActivePostIdForDropdown] = useState(null);
  const [editMode, setEditMode] = useState({ postId: null, content: "" });

  // update the user feed when the refresh trigger has been changed
  useEffect(() => {
    const updateUserFeed = async () => {
      try {
        await dispatch(fetchUserFeedPosts(userId)).unwrap();
      } catch (error) {
        console.error("Failed to fetch userFeed:", error);
      }
    };
    updateUserFeed();

    const intervalId = setInterval(updateUserFeed, 60000); // 60000 = 1 minute
    return () => clearInterval(intervalId);
  }, [dispatch, refreshDataTrigger, userId]);

  // update profile edits when the refresh trigger changes
  useEffect(() => {
    const updateUserProfile = async () => {
      try {
        await dispatch(fetchUserData()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    updateUserProfile();
  }, [dispatch, refreshDataTrigger]);

  const onLikeClick = async (userId, postId) => {
    await dispatch(likePost({ userId, postId }));
    setRefreshDataTrigger((prev) => !prev);
  };

  const onCommentClick = async (postId) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/user/post/${postId}`);
    } else {
      router.push("/");
    }
  };

  const onEditProfileClick = async () => {
    setShowProfileDropDown(!showProfileDropDown);
  }

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
    <div className="w-full relative">
      {showProfileDropDown && (
        <ModalEditProfile
          userId={userId}
          username={username}
          about={about}
          profilePic={profilePic}
          setShowProfileDropDown={setShowProfileDropDown}
          setRefreshDataTrigger={setRefreshDataTrigger}
        />
      )}
      <div className="
      sticky top-0 z-10 
      bg-slate-700 border border-slate-500 
      xxs:grid 
      xxs:grid-rows-[auto_1fr_1fr] 
      xxs:grid-cols-[max-content_minmax(min-content, 1fr)_auto] 
      xxs:gap-y-2 xxs:gap-x-2 xxs:p-2
      xxs:w-fit
      sm:grid 
      sm:grid-rows-[auto_1fr_1fr] 
      sm:grid-cols-[min-content_1fr_min-content] 
      sm:gap-y-3 sm:gap-x-6 sm:p-3
      sm:w-full
      md:grid 
      md:grid-rows-[auto_1fr_1fr] 
      md:grid-cols-[0.5fr_1fr_auto] 
      md:gap-y-2 md:gap-x-2 md:p-2
      md:w-fit
      lg:grid 
      lg:grid-rows-[auto_1fr_1fr] 
      lg:grid-cols-[min-content_auto_min-content] 
      lg:gap-y-2 lg:gap-x-4 lg:p-2
      lg:w-full">
        <div className="col-start-3 row-start-1 items-start ml-7 text-xl text-white flex flex-col flex-wrap shrink">
          <div
            className="btn3 xxs:w-fit sm:w-max"
            onClick={() => onEditProfileClick()}
          >
            Edit Profile
          </div>
        </div>
        <div className="
        xxs:w-12 xxs:h-12 xs:w-20 xs:h-20 
        sm:w-24 sm:h-24 
        md:w-14 md:h-14 
        lg:w-24 lg:h-24 
        relative mr-3 col-start-1 row-start-1 row-span-2">
          <Image
            className="header"
            priority
            id="profile-pic"
            src={`http://localhost:3000/${profilePic}`}
            alt="profile-pic"
            width={200}
            height={200}
          />
        </div>
        <div className="font-semibold text-white text-3xl flex items-start col-start-2 row-start-1 pt-3">
          {username}
        </div>
        <div className="col-start-2 row-start-2 row-span-2 text-xl flex flex-wrap mb-5 text-white">
          {about}
        </div>
      </div>
      {/* <div className="w-full border-b-2 border-slate-500"></div> */}
      <br></br>
      <div className="w-full flex flex-col gap-6 auto-row-auto overflow-auto">
        <div className="flex flex-col">
          {sortedPosts &&
            sortedPosts.length > 0 &&
            sortedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-slate-700 border border-slate-500 p-3 grid grid-cols-[min-content_min-content_min-content_1fr_min-content_min-content_min-content] grid-rows-[auto_1fr_min-content]"
              >
                <div className="w-10 h-10 relative col-start-1 row-start-1 row-span-2 mr-3">
                  <Image
                    src={`http://localhost:3000/${post.user.profilePic}`}
                    alt={`${post.user.username}'s profile picture`}
                    fill
                    className="rounded-full object-cover"
                    sizes="100%"
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
                <div className="bg-slate-800 border-2 border-slate-500 rounded-2xl px-3 py-2 flex flex-col gap-1 col-start-5 col-span-3 row-start-2 row-span-2 drop-shadow-glow h-[min-content]">
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
                <div
                  onClick={() => onLikeClick(userId, post._id)}
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
                <div
                  onClick={() => onCommentClick(post._id)}
                  className="col-start-5 row-start-3 cursor-pointer"
                >
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
