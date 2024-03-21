"use client";

import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUsername, updateAbout } from "@/redux/features/user-slice";

const ModalEditProfile = ({
  userId,
  username,
  about,
  profilePic,
  setShowProfileDropDown,
  setRefreshDataTrigger,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    newUsername: username,
    newAbout: about,
  });

  const onClickSave = async () => {
    try {
      await dispatch(
        updateUsername({ userId, username, newUsername: formData.newUsername })
      ).unwrap();

      await dispatch(
        updateAbout({ userId, username, newAbout: formData.newAbout })
      ).unwrap();

      setShowProfileDropDown(false);
      setRefreshDataTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const closeModal = () => {
    setShowProfileDropDown(false);
  };

  return (
    <div className="
    xxs:w-full xxs:h-[45%]
    lg:w-96 lg:h-96
    absolute 
    top-0 left-0 
    xl:left-[15%] 
    2xl:left-1/4 
    bg-slate-700 border border-slate-500 rounded-2xl drop-shadow-glow z-30">
      <div className="flex justify-between items-start my-3 mx-4">
        <div className="flex gap-3">
          <div className="text-white cursor-pointer" onClick={() => closeModal()}>
            X
          </div>
          <div className="text-white">Edit Profile</div>
        </div>
        <button className="btn2" onClick={() => onClickSave()}>
          Save
        </button>
      </div>
      <div className="mx-4">
        <form className="flex flex-col gap-4 h-full">
          <div>
            <Image
              className="header"
              priority
              id="profile-pic"
              src={`http://localhost:3000/${profilePic}`}
              alt="profile-pic"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="username" className="text-white">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="p-0.5"
              value={formData.newUsername || ""}
              onChange={(e) =>
                setFormData({ ...formData, newUsername: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="about" className="text-white">
              About:
            </label>
            <textarea
              type="text"
              id="about"
              name="about"
              className="p-0.5"
              value={formData.newAbout || ""}
              onChange={(e) =>
                setFormData({ ...formData, newAbout: e.target.value })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProfile;
