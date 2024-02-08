"use client";

import { useSelector, useDispatch } from "react-redux";

const NavSideBar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <p>Home</p>
      </div>
      <div>
        <p>Profile</p>
      </div>
      <div>
        <p>Friends</p>
      </div>
      <div>
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default NavSideBar;
