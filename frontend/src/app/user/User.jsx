import fetchUser from "../../components/GetUser";

const User = async () => {
  const { user } = await fetchUser();
  const { username } = user;

  return (
    <div>
      <div>Inside User component of userId</div>
      <div>{username}</div>
    </div>
  );
};

export default User;
