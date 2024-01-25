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
  console.log(data);
  return data;
};

const UserIdPage = async ({ params }) => {
  console.log(params);
  const user = await getUser(params.userId);
  console.log("user:", user);
  return (
    <div>
      <div>UserId Page:</div>
      <div>{user.username}</div>
      <div>{user.profilePic}</div>
      <div>{user.about}</div>
    </div>
  );
};

export default UserIdPage;
