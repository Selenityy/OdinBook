import FriendReqList from "@/components/FriendReqList";
import Header from "@/components/Header";
import NavSideBar from "@/components/NavSideBar";
import NavUser from "@/components/NavUser";
import "../../styles/globals.css";

const UserLayout = async ({ children }) => {
  return (
    <div className="my-6 mx-16 grid grid-areas-userLayout grid-cols-userLayout grid-rows-userLayout h-screen gap-y-4 gap-x-6">
      <section className="grid-in-header">
        <Header />
      </section>
      <section className="grid-in-user">
        <NavUser />
      </section>
      <section className="grid-in-nav">
        <NavSideBar />
      </section>
      <main className="grid-in-main">{children}</main>
      <section className="grid-in-friends">
        <FriendReqList />
      </section>
    </div>
  );
};

export default UserLayout;
