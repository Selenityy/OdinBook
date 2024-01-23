import SignUp from "@/components/SignUp";
import Link from "next/link";

const HomeSignUp = () => {
  return (
    <div>
      <h2>Sign Up:</h2>
      <SignUp />
      <Link href="/login">Already have an account? Log in here.</Link>
    </div>
  );
};

export default HomeSignUp;
