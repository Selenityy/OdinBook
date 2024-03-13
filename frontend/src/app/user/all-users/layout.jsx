import FriendReqList from "@/components/FriendReqList";

const AllUsersLayout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <main className="col-start-1 row-start-1 flex justify-center">
        {children}
      </main>
    </div>
  );
};

export default AllUsersLayout;
