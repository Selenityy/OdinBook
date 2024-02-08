import FriendReqList from "@/components/FriendReqList";
import Header from "@/components/Header";
import NavSideBar from "@/components/NavSideBar";
import "../../styles/globals.css";

const UserLayout = async ({ children }) => {
  return (
    <div className="my-6 mx-16 grid grid-areas-userLayout grid-cols-userLayout grid-rows-userLayout h-screen gap-3">
      <section className="grid-in-header">
        <Header />
      </section>
      <section className="grid-in-user">
        <NavSideBar />
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
