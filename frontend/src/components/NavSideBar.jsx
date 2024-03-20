"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  logout,
  resetUniqueComment,
  resetUniquePost,
} from "@/redux/features/user-slice";

const NavSideBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const userId = userState.value._id;

  const handleHomeClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/user");
      dispatch(resetUniqueComment());
      dispatch(resetUniquePost());
    } else {
      router.push("/");
    }
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/user/${userId}`);
    } else {
      router.push("/");
    }
  };

  const handleAllUsersClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/user/all-users`);
    } else {
      router.push("/");
    }
  };

  const handleLogOutClick = async () => {
    await router.push("/");
    localStorage.removeItem("token");
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  };

  return (
    <div className="
    xxs:flex xxs:justify-around
    md:flex md:flex-col md:gap-y-3"
    >
      <div
        className="flex items-center gap-2 w-fit hover:border hover:border-hidden hover:rounded-lg hover:text-white hover:bg-slate-400/[0.2] hover:py-1 hover:pl-2 hover:pr-3 cursor-pointer"
        onClick={handleHomeClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white/[0.9]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <p className="hidden md:inline text-lg text-white/[0.9] font-semibold">Home</p>
      </div>
      <div
        className="flex items-center gap-2 w-fit hover:border hover:border-hidden hover:rounded-lg hover:text-white hover:bg-slate-400/[0.2] hover:py-1 hover:pl-2 hover:pr-3 cursor-pointer"
        onClick={handleProfileClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white/[0.9]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <p className="hidden md:inline text-lg font-semibold text-white/[0.9]">Profile</p>
      </div>
      <div
        className="flex items-center gap-2 w-fit hover:border hover:border-hidden hover:rounded-lg hover:text-white hover:bg-slate-400/[0.2] hover:py-1 hover:pl-2 hover:pr-3 cursor-pointer"
        onClick={handleAllUsersClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white/[0.9]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
        <p className="hidden md:inline text-lg font-semibold text-white/[0.9]">Users</p>
      </div>
      <div
        className="flex items-center gap-2 w-fit hover:border hover:border-hidden hover:rounded-lg hover:text-white hover:bg-slate-400/[0.2] hover:py-1 hover:pl-2 hover:pr-3 cursor-pointer"
        onClick={handleLogOutClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white/[0.9]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
        <p className="hidden md:inline text-lg font-semibold text-white/[0.9]">Log Out</p>
      </div>
    </div>
  );
};

export default NavSideBar;
