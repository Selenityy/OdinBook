"use client";
import { useRouter } from "next/navigation";
import {
  resetUniquePost,
  resetUniqueComment,
} from "@/redux/features/user-slice";
import { useDispatch } from "react-redux";

const UniquePostLayout = ({ children }) => {
  // const router = useRouter();
  // const dispatch = useDispatch();

  // const onBackClick = async () => {
  //   if (window.history.length > 1) {
  //     router.back();
  //     await dispatch(resetUniquePost());
  //     await dispatch(resetUniqueComment());
  //   } else {
  //     router.push("/defaultPage");
  //   }
  // };

  return (
    <div className="h-screen w-full">
      {/* <section className="flex items-center gap-2 mb-3 sticky top-0 z-20 bg-slate-800 pt-3 pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
          onClick={() => onBackClick()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1 className="text-white text-xl font-semibold">Post</h1>
      </section> */}
      <main className="flex justify-center z-0">{children}</main>
    </div>
  );
};

export default UniquePostLayout;
