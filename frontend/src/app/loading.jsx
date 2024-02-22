const Loading = () => {
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
        <div className="text-xl italic font-semibold text-gray-800">Loading...</div>
      </section>
    </div>
  );
};

export default Loading;
