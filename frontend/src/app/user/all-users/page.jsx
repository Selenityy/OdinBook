import FriendReqList from "@/components/FriendReqList";
import NonFriendUsers from "@/components/NonFriendUsers";
import "../../../styles/globals.css";

const AllUsers = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-8 auto-row-auto h-screen w-full bg-slate-700 border border-slate-500 p-3">
      <section className="col-start-1 row-start-1 flex justify-center">
        <h1 className="text-white text-xl font-semibold">
          People You May Know:
        </h1>
      </section>
      <section className="col-start-1 row-start-2 flex justify-center">
        <NonFriendUsers />
      </section>
    </div>
  );
};

export default AllUsers;
