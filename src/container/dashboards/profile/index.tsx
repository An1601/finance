import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoadingFalse, setLoadingTrue } from "../../../redux/commonReducer";
import { handle_logout } from "../../../redux/userReducers";
import api from "../../../API/axios";
import BottomBarCustom from "../../../components/common/bottomBar";
import HeaderItem from "./Header";
import ArrowIcon from "../../../assets/icon/ArrowIcon.svg";
import Switch from "./Switch";
import AccountIcon from "../../../assets/icon/AccountIcon.svg";
import DocumentIcon from "../../../assets/icon/DocumentIcon.svg";
import ManagementIcon from "../../../assets/icon/ManagementIcon.svg";
import ChangePasswordIcon from "../../../assets/icon/ChangePasswordIcon.svg";
import NotificationIcon from "../../../assets/icon/NotificationIcon.svg";
import SecurityIcon from "../../../assets/icon/SecurityIcon.svg";
import ShareIcon from "../../../assets/icon/ShareIcon.svg";
import LogoutIcon from "../../../assets/icon/LogoutIcon.svg";

function Account() {
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch();
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

  const MENU_ITEMS = [
    { icon: AccountIcon, text: "Edit profile" },
    { icon: DocumentIcon, text: "Documents" },
    { icon: ManagementIcon, text: "Management a survey and a form" },
    { icon: ChangePasswordIcon, text: "Change password" },
    { icon: NotificationIcon, text: "Notifications" },
    { icon: SecurityIcon, text: "Terms & Conditions" },
    { icon: ShareIcon, text: "Share" },
    { icon: LogoutIcon, text: "Logout", onclick: handleLogout },
  ];

  return (
    <div className="w-screen sm:max-w-[480px]">
      <HeaderItem />

      <div className="bg-[#01D2B4] mb-20">
        {MENU_ITEMS.map((item, index) => (
          <div
            key={index}
            onClick={item.onclick}
            className={`px-[24px] py-3 flex flex-row items-center border-b-[1px] bg-white border-[#e9eaef] cursor-pointer ${
              item.icon === AccountIcon ? "rounded-t-[24px]" : ""
            }`}
          >
            <img src={item.icon} />
            <div className="text-slate-900 text-base leading-normal tracking-tight">
              {item.text}
            </div>
            {item.text === "Notifications" ? (
              <Switch
                isOn={isOn}
                handleToggle={handleToggle}
                className="ml-auto"
              />
            ) : (
              <img src={ArrowIcon} className="ml-auto" />
            )}
          </div>
        ))}
      </div>

      <BottomBarCustom />
    </div>
  );
}

export default Account;
