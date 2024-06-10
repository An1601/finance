import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import { handleReduxLogOut } from "@redux/userReducers";
import api from "@api/axios";
import { AppDispatch, RootState } from "@redux/store";
import HeaderItem from "../profile/Header";
import useWindowWidth from "@components/hook/useWindowWidth";
import BottomBarCustom from "@components/common/bottom-bar";
import MenuItemComponent from "./ItemProfile";
import Breadcrumb from "@components/common/breadcrumb";
import AccountIcon from "@assets/icon/AccountIcon.svg";
import DocumentIcon from "@assets/icon/DocumentIcon.svg";
import ChangePasswordIcon from "@assets/icon/ChangePasswordIcon.svg";
import NotificationIcon from "@assets/icon/NotificationIcon.svg";
import SecurityIcon from "@assets/icon/SecurityIcon.svg";
import ShareIcon from "@assets/icon/ShareIcon.svg";
import LogoutIcon from "@assets/icon/LogoutIcon.svg";
import { fetchProfileData } from "@redux/userThunks";
import { useTranslation } from "react-i18next";
import Loader from "@components/common/loader";
import { useLoading } from "@redux/useSelector";

function Account() {
  const { t } = useTranslation();
  const [isOn, setIsOn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const handleToggle = () => setIsOn(!isOn);
  const handleEditProfile = () => navigate("/edit-profile");
  const handleChangePassword = () => navigate("/change-password");
  const handleTermsConditions = () => navigate("/terms-conditions");
  const { business_profile } = useSelector(
    (state: RootState) => state.rootReducer.userReducer,
  );
  const isLoading = useLoading();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(setLoadingTrue());
      const response = await api.post("/logout");
      dispatch(setLoadingFalse());
      if (response?.status === 200) {
        navigate("/signin");
        dispatch(handleReduxLogOut());
      } else {
        const error = await response?.data;
        toast.warning(error.message || t("profile.messWarning"));
      }
    } catch (error) {
      toast.error(t("profile.messError"));
    }
  };

  const MENU_ITEMS_LEFT = [
    {
      id: 1,
      icon: AccountIcon,
      text: t("profile.editProfile"),
      onClick: handleEditProfile,
    },
    { id: 2, icon: DocumentIcon, text: t("profile.document") },
    {
      id: 3,
      icon: ChangePasswordIcon,
      text: t("profile.changePassword"),
      onClick: handleChangePassword,
    },
    { id: 4, icon: NotificationIcon, text: t("profile.notification") },
  ];

  const MENU_ITEMS_RIGHT = [
    {
      id: 5,
      icon: SecurityIcon,
      text: t("profile.terms"),
      onClick: handleTermsConditions,
    },
    { id: 6, icon: ShareIcon, text: t("profile.share") },
    {
      id: 7,
      icon: LogoutIcon,
      text: t("profile.logout"),
      onClick: handleLogout,
    },
  ];

  if (isLoading) return <Loader />;
  return (
    <div>
      {windowWidth >= 480 ? (
        <div>
          <Breadcrumb primaryText={t("profile.account")} />
          <HeaderItem
            showIconImage={true}
            className="rounded-t-[24px] py-6"
            userName={business_profile?.name}
            email={business_profile?.email}
          />
          <div className="p-6 grid grid-cols-2 gap-20  bg-white">
            <div>
              {MENU_ITEMS_LEFT.map((item) => (
                <MenuItemComponent
                  key={item.id}
                  className={`${item.id === 1 ? "rounded-t-[12px]" : ""} ${item.id === 4 ? "rounded-b-[12px]" : ""}`}
                  {...{ item, isOn, handleToggle }}
                />
              ))}
            </div>
            <div>
              {MENU_ITEMS_RIGHT.map((item) => (
                <MenuItemComponent
                  key={item.id}
                  className={`${item.id === 5 ? "rounded-t-[12px]" : ""} ${item.id === 7 ? "rounded-b-[12px]" : ""}`}
                  {...{ item, isOn, handleToggle }}
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
              userName={business_profile?.name}
              email={business_profile?.email}
            />
            <div className="bg-[#01D2B4] mb-20">
              {MENU_ITEMS_LEFT.concat(MENU_ITEMS_RIGHT).map((item) => (
                <MenuItemComponent
                  key={item.id}
                  className={`${item.id === 1 ? "rounded-t-[12px]" : ""}`}
                  {...{ item, isOn, handleToggle }}
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
