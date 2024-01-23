const UserLayout = async ({ children }) => {
  return (
    <section>
      <div>User Layout</div>
      <main>{children}</main>
    </section>
  );
};

export default UserLayout;
