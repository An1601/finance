import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import { handle_logout } from "@redux/userReducers";
import api from "@api/axios";
import AccountIcon from "@assets/icon/AccountIcon.svg";
import DocumentIcon from "@assets/icon/DocumentIcon.svg";
import ManagementIcon from "@assets/icon/ManagementIcon.svg";
import ChangePasswordIcon from "@assets/icon/ChangePasswordIcon.svg";
import NotificationIcon from "@assets/icon/NotificationIcon.svg";
import SecurityIcon from "@assets/icon/SecurityIcon.svg";
import ShareIcon from "@assets/icon/ShareIcon.svg";
import LogoutIcon from "@assets/icon/LogoutIcon.svg";
import HeaderItem from "../profile/Header";
import useWindowWidth from "@components/hook/useWindowWidth";
import BottomBarCustom from "@components/common/bottomBar";
import MenuItemComponent from "./ItemProfile";
import { RootState } from "@redux/store";
import Breadcrumb from "@components/common/breadcrumb";

function Account() {
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const { name, email } = useSelector(
    (state: RootState) => state.rootReducer.userReducer,
  );

  const handleToggle = () => setIsOn(!isOn);

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

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const MENU_ITEMS_LEFT = [
    { icon: AccountIcon, text: "Edit profile", onClick: handleEditProfile },
    { icon: DocumentIcon, text: "Documents" },
    { icon: ManagementIcon, text: "Management a survey and a form" },
    { icon: ChangePasswordIcon, text: "Change password" },
  ];

  const MENU_ITEMS_RIGHT = [
    { icon: NotificationIcon, text: "Notifications" },
    { icon: SecurityIcon, text: "Terms & Conditions" },
    { icon: ShareIcon, text: "Share" },
    { icon: LogoutIcon, text: "Logout", onClick: handleLogout },
  ];

  const MENU_ITEMS_LIST = [...MENU_ITEMS_LEFT, ...MENU_ITEMS_RIGHT];

  return (
    <div>
      {windowWidth >= 480 ? (
        <div>
          <Breadcrumb primaryText="Account" />
          <HeaderItem
            showIconImage={false}
            className="rounded-t-[24px] py-6"
            userName={name}
            email={email}
          />
          <div className="p-6 grid grid-cols-2 gap-20  bg-white">
            <div>
              {MENU_ITEMS_LEFT.map((item, index) => (
                <MenuItemComponent
                  key={index}
                  item={item}
                  index={index}
                  totalItems={MENU_ITEMS_LEFT.length}
                  isOn={isOn}
                  handleToggle={handleToggle}
                />
              ))}
            </div>
            <div>
              {MENU_ITEMS_RIGHT.map((item, index) => (
                <MenuItemComponent
                  key={index}
                  item={item}
                  index={index}
                  totalItems={MENU_ITEMS_RIGHT.length}
                  isOn={isOn}
                  handleToggle={handleToggle}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="!mt-0 sm:!mt-[60px] flex flex-row gap-8">
          <div className="w-screen sm:max-w-[480px] bg-white">
            <HeaderItem
              className="pt-[70px] pb-[28px]"
              showIconImage={true}
              userName={name}
              email={email}
            />
            <div className="bg-[#01D2B4] mb-20">
              {MENU_ITEMS_LIST.map((item, index) => (
                <MenuItemComponent
                  key={index}
                  item={item}
                  index={index}
                  totalItems={MENU_ITEMS_LIST.length}
                  isOn={isOn}
                  handleToggle={handleToggle}
                  className={item.text === "Logout" ? "rounded-b-none" : ""}
                />
              ))}
            </div>
            <BottomBarCustom />
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
