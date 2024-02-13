import FriendReqList from "@/components/FriendReqList";
import Header from "@/components/Header";
import NavSideBar from "@/components/NavSideBar";
import NavUser from "@/components/NavUser";
import "../../styles/globals.css";

const UserLayout = ({ children }) => {
  return (
    <div className="grid grid-areas-userLayout grid-cols-userLayout grid-rows-userLayout h-screen gap-y-4 gap-x-6">
      <section className="py-3 px-6 grid-in-header border-b-2 border-slate-50/[0.2]">
        <Header />
      </section>
      <section className="grid-in-user px-6">
        <NavUser />
      </section>
      <section className="grid-in-nav px-6">
        <NavSideBar />
      </section>
      <main className="grid-in-main px-6">{children}</main>
    </div>
  );
};

export default UserLayout;
