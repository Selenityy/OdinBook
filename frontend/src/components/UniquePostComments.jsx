"use client";

import Image from "next/image";
import { likeComment } from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const UniquePostComments = ({
  userId,
  commentsArray,
  setRefreshDataTrigger,
  postId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // add liking a comment property
  const onCommentLikeClick = async (userId, commentId) => {
    await dispatch(likeComment({ userId, postId, commentId }));
    setRefreshDataTrigger((prev) => !prev);
  };

  // add clicking comment to go to the postId page again with that comment being the new postId
  const onCommentCommentClick = async (postId, commentId) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/user/post/${postId}/comment/${commentId}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 auto-row-auto">
      <div>
        {commentsArray &&
          commentsArray.length > 0 &&
          commentsArray.map((comment) => (
            <div
              key={comment._id}
              className="bg-slate-700 border border-slate-500 p-3 grid grid-cols-[min-content_min-content_min-content_1fr_min-content_min-content_min-content] grid-rows-[auto_1fr_min-content]"
            >
              <div className="w-10 h-10 relative col-start-1 row-start-1 row-span-2 mr-3">
                <Image
                  src={`http://localhost:3000${comment.user.profilePic}`}
                  alt={`${comment.user.username}'s profile picture`}
                  className="rounded-full object-cover"
                  width={50}
                  height={50}
                  priority
                />
              </div>
              <div className="col-start-2 col-span-5 row-start-1 flex items-center font-semibold text-white">
                {comment.user.username}
              </div>
              <button className="row-start-1 col-start-7 flex items-start ml-7 text-white">
                ...
              </button>
              <div className="col-start-2 col-span-5 row-start-2 mb-5 text-white">
                {comment.body}
              </div>
              {/* <div className="w-full border border-gray-500"></div> */}
              <div
                onClick={() => onCommentLikeClick(postId, comment._id)}
                className="col-start-2 row-start-3"
              >
                {comment.likes.includes(userId) ? (
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
                {comment.likeCount}
              </div>
              <div
                onClick={() => onCommentCommentClick(comment._id)}
                className="col-start-5 row-start-3"
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
                {comment.commentCount}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UniquePostComments;
