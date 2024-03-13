import CreatePostForm from "@/components/CreatePostForm";
import FriendReqList from "@/components/FriendReqList";
import UserFeed from "@/components/UserFeed";
import "../../styles/globals.css"

const UserHomePage = () => {
  return (
    <div className="h-screen w-full">
      <section className="col-start-1 row-start-1 flex justify-center sticky top-0 z-10">
        <CreatePostForm />
      </section>
      <section className="col-start-1 row-start-2 flex justify-center">
        <UserFeed />
      </section>
    </div>
  );
};

export default UserHomePage;
