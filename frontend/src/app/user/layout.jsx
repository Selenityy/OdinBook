import FriendReqList from "@/components/FriendReqList";
import Header from "@/components/Header";
import NavSideBar from "@/components/NavSideBar";
import "../../styles/globals.css";

const UserLayout = ({ children }) => {
  return (
    <div className="grid grid-areas-userLayout grid-cols-userLayout grid-rows-userLayout h-screen gap-x-6">
      <section className="py-3 grid-in-header border-b-2 border-slate-50/[0.2] sticky top-0 backdrop-blur-lg z-10 bg-gradient-to-b from-slate-800">
        <Header />
      </section>
      <section className="grid-in-nav ml-[138px] overflow-hidden mt-4">
        <NavSideBar />
      </section>
      <main className="grid-in-main overflow-auto">{children}</main>
      <section className="overflow-hidden grid-in-friends w-min mt-4">
        <FriendReqList />
      </section>
    </div>
  );
};

export default UserLayout;
