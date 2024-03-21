const UserProfileLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <main className="flex justify-center w-full">{children}</main>
    </div>
  );
};

export default UserProfileLayout;
