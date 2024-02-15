import FriendReqList from "@/components/FriendReqList";
import Header from "@/components/Header";
import NavSideBar from "@/components/NavSideBar";
import NavUser from "@/components/NavUser";
import "../../styles/globals.css";

const UserLayout = ({ children }) => {
  return (
    <div className="grid grid-areas-userLayout grid-cols-userLayout grid-rows-userLayout h-screen gap-y-4">
      <section className="py-3 grid-in-header border-b-2 border-slate-50/[0.2]">
        <Header />
      </section>
      {/* <section className="grid-in-user ml-[138px]">
        <NavUser />
      </section> */}
      <section className="grid-in-user ml-[138px]">
        <NavSideBar />
      </section>
      <main className="grid-in-main mr-[138px]">{children}</main>
    </div>
  );
};

export default UserLayout;
