const UserProfileLayout = ({ children }) => {
  return (
    <div className="h-screen w-full mt-4">
      <main className="flex justify-center">{children}</main>
    </div>
  );
};

export default UserProfileLayout;
