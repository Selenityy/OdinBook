"use client";

import { useSelector, useDispatch } from "react-redux";

const NavUser = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <p>Profile Pic</p>
      </div>
      <div>
        <p>Username</p>
      </div>
      <div>
        <p>About</p>
      </div>
    </div>
  );
};

export default NavUser;
