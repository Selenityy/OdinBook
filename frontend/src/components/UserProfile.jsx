"use client";

import { Suspense } from "react";
import Image from "next/image";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userState = useSelector((state) => state.user);
  const username = userState.value.username;
  const profilePic = userState.value.profilePic;

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex gap-2">
        <div>
          <Image
            className="header"
            id="profile-pic"
            src={`/${profilePic}`}
            alt="profile-pic"
            priority
            width={50}
            height={50}
          />
        </div>
        <div className="hidden md:inline md:flex md:items-center md:font-semibold md:text-white">
          {username}
        </div>
      </section>
    </Suspense>
  );
};

export default UserProfile;
