"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const userState = useSelector((state) => state.user);
  const username = userState.value.username;
  const profilePic = userState.value.profilePic;
  const about = userState.value.about;
  const friends = userState.value.friends;
  const posts = userState.value.posts;

  return (
    <div>
      <div>(User Profile Page)</div>
      <Image
        className="header"
        priority
        id="profile-pic"
        src={`http://localhost:3000${profilePic}`}
        alt="profile-pic"
        width={50}
        height={50}
      />
      <div>{username}</div>
      <div>{about}</div>
      <div>
        {friends && friends.length > 0
          ? friends.map((friend) => (
              <div key={friend._id}>{friend.username}</div>
            ))
          : "No friends"}
      </div>
      <div>
        {posts && posts.length > 0
          ? posts.map((post) => <div key={post._id}>{post.content}</div>)
          : "No posts"}
      </div>
    </div>
  );
};

export default UserProfilePage;
