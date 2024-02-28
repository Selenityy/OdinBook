// import UniquePost from "@/components/UniquePost";

import UniquePost from "@/components/UniquePost";

const UniquePostPage = () => {
  return (
    <div>
      <section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1>Post</h1>
      </section>
      <UniquePost />
      <section>(form for posting comment, probably a component)</section>
      <section>(list out the comments, probably a comment component)</section>
    </div>
  );
};

export default UniquePostPage;
