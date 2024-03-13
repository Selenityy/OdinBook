import FriendReqList from "@/components/FriendReqList";

const UserProfileLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-8 auto-row-auto h-screen w-full">
      <main className="col-start-1 row-start-1 flex justify-center">
        {children}
      </main>
      <section className="col-start-2 row-span-2">
        <FriendReqList />
      </section>
    </div>
  );
};

export default UserProfileLayout;
