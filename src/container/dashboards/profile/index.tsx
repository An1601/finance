import { useState, useEffect } from "react";
import AccountIcon from "../../../components/svg/Account";
import DocumentIcon from "../../../components/svg/Document";
import ManagementIcon from "../../../components/svg/Management";
import ChangePasswordIcon from "../../../components/svg/ChangePassword";
import NotificationIcon from "../../../components/svg/Notification";
import LogoutIcon from "../../../components/svg/Logout";
import ShareIcon from "../../../components/svg/Share";
import SecurityIcon from "../../../components/svg/Security";
import Switch from "./Switch";
import AccountItem from "./AccountItem";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setLoadingFalse, setLoadingTrue } from "../../../redux/commonReducer";
import { useNavigate } from "react-router-dom";
import { handle_logout } from "../../../redux/userReducers";
import api from "../../../API/axios";
import BottomBarCustom from "../../../components/common/bottomBar";
import HeaderItem from "./Header";

function Account() {
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoadingTrue());
      const response = await api.post("/logout");
      dispatch(setLoadingFalse());
      if (response && response.status === 200) {
        navigate("/signin");
        dispatch(handle_logout());
      } else {
        const error = await response?.data;
        toast.warning(error.message || "Log Out unsuccessfully.");
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast.error("An error occurred!");
      }
    }
  };

  return (
    <div className="w-screen sm:max-w-[480px]">
      <HeaderItem />

      <div className="bg-[#01D2B4] mb-20">
        <AccountItem
          className="rounded-t-[24px]"
          Icon={AccountIcon}
          text="Edit profile"
        />
        <AccountItem Icon={DocumentIcon} text="Documents" />
        <AccountItem
          Icon={ManagementIcon}
          text="Management a survey and a form"
        />
        <AccountItem Icon={ChangePasswordIcon} text="Change password" />
        <AccountItem Icon={NotificationIcon} text="Notifications">
          <Switch isOn={isOn} handleToggle={handleToggle} className="ml-auto" />
        </AccountItem>
        <AccountItem Icon={SecurityIcon} text="Terms & Conditions" />
        <AccountItem Icon={ShareIcon} text="Share" />
        <AccountItem Icon={LogoutIcon} text="Logout" onClick={handleLogout} />
      </div>

      <BottomBarCustom />
    </div>
  );
}

export default Account;
