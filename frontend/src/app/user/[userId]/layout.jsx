import FriendReqList from "@/components/FriendReqList";

const UserProfileLayout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <main className="flex justify-center">
        {children}
      </main>
    </div>
  );
};

export default UserProfileLayout;
