import Login from "@/components/Login";
import TestUserLogIn from "@/components/TestUserLogIn";
import Link from "next/link";
import "../styles/globals.css";

const Home = () => {
  return (
    <div className="grid 
    md:grid-areas-MDhomeLayout 
    md:grid-cols-MDhomeLayout 
    md:grid-rows-MDhomeLayout 
    md:gap-6
    lg:grid-areas-homeLayout 
    lg:grid-cols-homeLayout 
    lg:grid-rows-homeLayout 
    h-screen justify-center items-center bg-stone-100">
      <section className="grid-in-odin flex flex-col items-center">
        <h1 className="md:text-7xl lg:text-8xl font-semibold text-gray-800">OdinBook</h1>
        <h2 className="md:text-xl lg:text-2xl font-light text-gray-600">
          Connect with others
        </h2>
      </section>
      <div className="grid-in-line border border-gray-500 h-full"></div>
      <section className="grid-in-login flex flex-col items-center justify-center h-full">
        <Login />
        <br></br>
        <div className="flex items-center justify-center space-x-2 md:w-80 lg:w-96 2xl:w-6/12">
          <div className="w-full border border-gray-500"></div>
          <span className="text-gray-700 text-lg">or</span>
          <div className="w-full border border-gray-500"></div>
        </div>
        <br></br>
        <TestUserLogIn />
        <Link href="signup" className="2xl:w-6/12">
          <button type="button" className="btn md:w-80 lg:w-96 2xl:w-full">
            Create Account
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
