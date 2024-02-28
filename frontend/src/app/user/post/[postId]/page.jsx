import UniquePost from "@/components/UniquePost";
import "../../../../styles/globals.css";

const UniquePostPage = () => {
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
        <UniquePost />
      </section>
      <section>(form for posting comment, probably a component)</section>
      <section>(list out the comments, probably a comment component)</section>
    </div>
  );
};

export default UniquePostPage;
