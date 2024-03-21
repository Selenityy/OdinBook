import FriendReqList from "@/components/FriendReqList";
import NonFriendUsers from "@/components/NonFriendUsers";
import "../../../styles/globals.css";

const AllUsers = () => {
  return (
    <div className="

    flex flex-col flex-wrap
    h-fit bg-slate-700 border-2 border-slate-500">
      <section className="col-start-1 row-start-1 p-3">
        <h1 className="text-white text-xl font-semibold">
          People You May Know:
        </h1>
      </section>
      <div className="w-full border-b-2 border-slate-500 col-start-1 row-start-2"></div>
      <section className="col-start-1 row-start-3">
        <NonFriendUsers />
      </section>
    </div>
  );
};

export default AllUsers;
