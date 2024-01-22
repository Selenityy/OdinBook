import Link from "next/link";

const Home = ({ feed }) => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* <div>{feed}</div> */}
      <Link href="login">Log in here.</Link>
    </div>
  );
};

export default Home;
