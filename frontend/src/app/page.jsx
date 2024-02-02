import Login from "@/components/Login";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <section>
        <h1>OdinBook</h1>
        <h2>Connect with others</h2>
      </section>
      <section>
        <Login />
        <br></br>
        <div className="line-with-text">
          <span className="text">or</span>
        </div>
        <br></br>
        <Link href="signup">
          <button type="button">Create Account</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
