import Header from "@/components/Header";

const UserLayout = async ({ children }) => {
  return (
    <>
      <Header />
      <div>(User Layout)</div>
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
