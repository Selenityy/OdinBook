"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

const NavUser = () => {
  //   const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const username = userState.value.username;
  const profilePic = userState.value.profilePic;
  const about = userState.value.about;
  const posts = userState.value.posts;
  const postLength = posts.length;
  const friends = userState.value.friends;
  const friendLength = friends.length;

  return (
    <div className="rounded-lg grid grid-cols-3 grid-rows-3 grid-flow-row w-fit p-2.5 gap-2 items-center bg-slate-700">
      <div className="col-start-1 row-span-2 row-start-1">
        <Image
          className="header"
          id="profile-pic"
          src={`${process.env.IMAGE_URL}/${profilePic}`}
          alt="profile-pic"
          priority
          width={70}
          height={70}
        />
      </div>
      <div className="col-start-2 col-span-2 row-start-1 m-px flex items-end justify-center items-end">
        <div className="font-semibold text-lg text-white">{username}</div>
      </div>
      <div className="col-start-2 row-start-2 flex gap-1 text-xs w-fit text-white">
        <div>{postLength}</div>
        <div>Posts</div>
      </div>
      <div className="col-start-3 row-start-2 flex gap-1 text-xs w-fit text-white">
        <div>{friendLength}</div>
        <div>Friends</div>
      </div>
      <div className="col-start-1 col-span-3 row-start-3 items-center text-base py-2 text-white">
        <div>{about}</div>
      </div>
    </div>
  );
};

export default NavUser;
