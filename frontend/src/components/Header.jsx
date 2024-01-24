import UserProfile from "./UserProfile";

// logo
// username
// profile picture
// profile pic drops down to select profile, logout

const Header = () => {
  return (
    <div className="header" id="header-bar">
      <div className="header" id="logo">
        OdinBook
      </div>
      <UserProfile />
    </div>
  );
};

export default Header;
