import SignUp from "@/components/SignUp";
import Link from "next/link";

const HomeSignUp = () => {
  return (
    <div className="grid grid-areas-homeLayout grid-cols-homeLayout grid-rows-homeLayout h-screen items-center bg-stone-100">
      <section className="grid-in-odin flex flex-col items-center">
        <h1 className="text-8xl font-semibold text-gray-800">OdinBook</h1>
        <h2 className="text-2xl font-light text-gray-600">
          Connect with others
        </h2>
      </section>
      <div className="grid-in-line border border-gray-500 h-full"></div>
      <section className="grid-in-login flex flex-col items-center justify-center h-full">
        <SignUp />
        <br></br>
        <div className="flex items-center justify-center space-x-2 w-96">
          <div className="w-full border border-gray-500"></div>
          <span className="text-gray-700 text-lg">or</span>
          <div className="w-full border border-gray-500"></div>
        </div>
        <br></br>
        <Link href="/" className="">
          <button type="button" className="btn w-96">
            Log In
          </button>
        </Link>
      </section>
    </div>
  );
};

export default HomeSignUp;
