const AllUsersLayout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <main className="flex justify-center">
        {children}
      </main>
    </div>
  );
};

export default AllUsersLayout;
