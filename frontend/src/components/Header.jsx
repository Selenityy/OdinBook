import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header className="header" id="header-bar">
      <h1 className="header" id="logo">
        OdinBook
      </h1>
      <UserProfile />
    </header>
  );
};

export default Header;
