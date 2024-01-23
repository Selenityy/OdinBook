import Login from "@/components/Login";
import Link from "next/link";

// get userData
// <Link href="/users/${userData.id}"
// you have a directory structure such that users/[userId]

const HomeLogIn = () => {
  return (
    <div>
      <h2>Log in:</h2>
      <Login />
      <Link href="/signup">Do not have an account yet? Sign up here.</Link>
    </div>
  );
};

export default HomeLogIn;
