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
    <div className="rounded border-2 border-gray-600 grid grid-cols-3 grid-rows-3 grid-flow-row w-fit p-2.5 gap-2 items-center">
      <div className="col-start-1 row-span-2 row-start-1">
        <Image
          className="header"
          id="profile-pic"
          src={`http://localhost:3000${profilePic}`}
          alt="profile-pic"
          width={70}
          height={70}
        />
      </div>
      <div className="col-start-2 col-span-2 row-start-1 m-px flex text-xl items-end justify-center">
        <p className="font-semibold">{username}</p>
      </div>
      <div className="col-start-2 row-start-2 flex gap-1 text-sm w-fit">
        <p>{postLength}</p>
        <p>Posts</p>
      </div>
      <div className="col-start-3 row-start-2 flex gap-1 text-sm w-fit">
        <p>{friendLength}</p>
        <p>Friends</p>
      </div>
      <div className="col-start-1 col-span-3 row-start-3 items-center text-lg py-2">
        <p>{about}</p>
      </div>
    </div>
  );
};

export default NavUser;
