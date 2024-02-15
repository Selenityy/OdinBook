import CreatePostForm from "@/components/CreatePostForm";
import FriendReqList from "@/components/FriendReqList";
import UserFeed from "@/components/UserFeed";

const UserHomePage = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-8 auto-row-auto h-screen w-full">
      <section className="col-start-1 row-start-1 flex justify-center">
        <CreatePostForm />
      </section>
      <section className="col-start-1 row-start-2 flex justify-center">
        <UserFeed />
      </section>
      <section className="col-start-2 row-span-2">
        <FriendReqList />
      </section>
    </div>
  );
};

export default UserHomePage;
