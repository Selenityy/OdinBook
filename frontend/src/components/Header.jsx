import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header
      className="header flex justify-between items-center"
      id="header-bar"
    >
      <h1
        className="header text-3xl font-semibold text-white/[0.9]"
        id="logo"
      >
        OdinBook
      </h1>
      <div className="">
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
