import Login from "@/components/Login";
import TestUserLogIn from "@/components/TestUserLogIn";
import Link from "next/link";
import "../styles/globals.css";

const Home = () => {
  return (
    <div className="grid 
    xxs:grid-areas-SMhomeLayout 
    xxs:grid-cols-SMhomeLayout 
    xxs:grid-rows-SMhomeLayout 
    xxs:p-6 
    sm:grid-areas-SMhomeLayout 
    sm:grid-cols-SMhomeLayout 
    sm:grid-rows-SMhomeLayout 
    sm:p-6 
    md:grid-areas-MDhomeLayout 
    md:grid-cols-MDhomeLayout 
    md:grid-rows-MDhomeLayout 
    md:gap-8
    lg:grid-areas-homeLayout 
    lg:grid-cols-homeLayout 
    lg:grid-rows-homeLayout 
    lg:gap-0
    h-screen justify-center items-center bg-stone-100">
      <section className="grid-in-odin flex flex-col items-center">
        <h1 className="xxs:text-5xl sm:text-8xl md:text-7xl lg:text-8xl font-semibold text-gray-800">OdinBook</h1>
        <h2 className="xxs:text-xl sm:text-3xl md:text-xl lg:text-2xl font-light text-gray-600">
          Connect with others
        </h2>
      </section>
      <div className="grid-in-line border border-gray-500 h-full w-full"></div>
      <section className="grid-in-login flex flex-col items-center sm:h-full sm:w-full sm:pt-[20%] sm:px-[10%] md:px-0 md:pt-0 md:justify-center md:w-full md:h-full">
        <Login />
        <br></br>
        <div className="flex items-center justify-center space-x-2 xxs:w-full sm:w-full md:w-80 lg:w-96 2xl:w-6/12">
          <div className="w-full border border-gray-500"></div>
          <span className="text-gray-700 text-lg">or</span>
          <div className="w-full border border-gray-500"></div>
        </div>
        <br></br>
        <TestUserLogIn />
        <Link href="signup" className="xxs:w-full sm:w-full lg:w-96 xl:w-96 2xl:w-6/12">
          <button type="button" className="btn xxs:w-full sm:w-full md:w-80 lg:w-full xl:w-full 2xl:w-full">
            Create Account
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
