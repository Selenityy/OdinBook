"use client";

import CreateCommentForm from "@/components/CreateCommentForm";
import UniqueComment from "@/components/UniqueComment";
import UniqueCommentComments from "@/components/UniqueCommentComments";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import "../../../../../../styles/globals.css";

const UniqueCommentPage = () => {
  const router = useRouter();
//   const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const postId = segments.pop();

  const onBackClick = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/user/post/${postId}`);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="w-full">
      <section className="flex items-center gap-2 mb-3">
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
      </section>
      <section>
        <UniqueComment />
      </section>
      <section>
        <CreateCommentForm />
      </section>
      <section>
        <UniqueCommentComments />
      </section>
    </div>
  );
};

export default UniqueCommentPage;
