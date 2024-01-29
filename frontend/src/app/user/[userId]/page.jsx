import Image from "next/image";

export const generateStaticParams = async () => {
  const res = await fetch(`http://localhost:3000/user/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);

  return data;
};

const getUser = async (userId) => {
  const res = await fetch(`http://localhost:3000/user/${userId}/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);
  return data;
};

const UserProfilePage = async ({ params }) => {
  const user = await getUser(params.userId);
  // console.log("user:", user);
  return (
    <div>
      <div>(User Profile Page)</div>
      <Image
        className="header"
        priority
        id="profile-pic"
        src={`http://localhost:3000${user.profilePic}`}
        alt="profile-pic"
        width={50}
        height={50}
      />
      <div>{user.username}</div>
      <div>{user.about}</div>
      <div>
        {user.friends && user.friends.length >0 
        ? user.friends.map((friend) => <div key={friend._id}>{friend.username}</div>)
        : "No friends"}
        </div>
      <div>
        {user.posts && user.posts.length > 0
          ? user.posts.map((post) => <div key={post._id}>{post.content}</div>)
          : "No posts"}
      </div>
    </div>
  );
};

export default UserProfilePage;
