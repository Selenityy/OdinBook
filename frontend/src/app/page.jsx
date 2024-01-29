import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to OdinBook</h1>
      {/* <Link href="login">Log in</Link> */}
      <br></br>
      <Link href="signup">Sign up</Link>
    </div>
  );
};

export default Home;
