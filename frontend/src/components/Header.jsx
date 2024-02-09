import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header
      className="header flex justify-between"
      id="header-bar"
    >
      <h1 className="header text-base" id="logo">
        OdinBook
      </h1>
      <UserProfile />
    </header>
  );
};

export default Header;
