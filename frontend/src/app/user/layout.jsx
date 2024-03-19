import FriendReqList from "@/components/FriendReqList";
import Header from "@/components/Header";
import NavSideBar from "@/components/NavSideBar";
import "../../styles/globals.css";

const UserLayout = ({ children }) => {
  return (
    <div className="h-screen grid

    // XXS SCREEN SIZE 320+
    xxs:grid-areas-XXSuserLayout 
    xxs: grid-cols-XXSuserLayout 
    xxs:grid-rows-XXSuserLayout 
    xxs:gap-[16px] xxs:mx-[10px] 

    // XS SCREEN SIZE 375+
    xs:grid-areas-XSuserLayout 
    xs: grid-cols-XSuserLayout 
    xs:grid-rows-XSuserLayout 
    xs:gap-[16px] xs:mx-[15px] 

    // SM SCREEN SIZE 640+
    sm:grid-areas-SMuserLayout 
    sm: grid-cols-SMuserLayout 
    sm:grid-rows-SMuserLayout 
    sm:gap-[16px] sm:mx-[15px] 

    // MD SCREEN SIZE 768+
    md:grid-areas-MDuserLayout 
    md:grid-cols-MDuserLayout 
    md:grid-rows-MDuserLayout 
    md:gap-[24px] md:mx-[20px]

    // LG SCREEN SIZE 1024+
    lg:grid-areas-LuserLayout 
    lg:grid-cols-LuserLayout 
    lg:grid-rows-LuserLayout 
    lg:gap-[20px] lg:mx-[100px] 

    // XL SCREEN SIZE 1280+
    xl:grid-areas-XLuserLayout 
    xl:grid-cols-XLuserLayout 
    xl:grid-rows-XLuserLayout 
    xl:gap-[20px] xl:mx-[138px]  

    // XXL SCREEN SIZE 1536+
    2xl:grid-areas-XXLuserLayout 
    2xl:grid-cols-XXLuserLayout 
    2xl:grid-rows-XXLuserLayout 
    2xl:gap-[20px] 2xl:mx-[138px]"
    >
      <section className="py-3 grid-in-header border-b-2 border-slate-50/[0.2] sticky top-0 backdrop-blur-lg z-10 bg-gradient-to-b from-slate-800">
        <Header />
      </section>
      <section className="grid-in-nav overflow-hidden">
        <NavSideBar />
      </section>
      <main className="grid-in-main overflow-auto">{children}</main>
      <section className="overflow-hidden grid-in-friends">
        <FriendReqList />
      </section>
    </div>
  );
};

export default UserLayout;
