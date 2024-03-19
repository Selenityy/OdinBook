import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header
      className="header 
      xxs:flex xxs:justify-center xxs:items-center xxs:gap-10
      md:flex md:justify-between md:items-center"
      id="header-bar"
    >
      <h1
        className="header text-3xl font-semibold text-white/[0.9] ml-[138px]"
        id="logo"
      >
        OdinBook
      </h1>
      <div className="mr-[138px]">
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
