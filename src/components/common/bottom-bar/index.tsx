import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DocumentBottomBar from "../../svg/DocumentBottom";
import HomeIcon from "../../svg/Home";
import MessageIcon from "../../svg/Message";
import ProfileIcon from "../../svg/Profile";
import HomeActive from "@components/svg/HomeActive";
import DocumentBottomBarActive from "@components/svg/DocumentBottomActive";
import MessageActive from "@components/svg/MessageActive";
import ProfileActive from "@components/svg/ProfileActive";

const BottomBarCustom = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleNavigate = (path: string, tab: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveTab("home");
    } else if (location.pathname.includes("/records")) {
      setActiveTab("document");
    } else if (location.pathname.includes("/message")) {
      setActiveTab("message");
    } else if (location.pathname.includes("/profile")) {
      setActiveTab("profile");
    }
  }, [location.pathname]);

  return (
    <div className="fixed z-50 w-screen sm:hidden max-w-[380px] h-[76px] -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 shadow ">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center rounded-s-full "
          onClick={() => handleNavigate("/dashboard", "home")}
        >
          {activeTab === "home" ? (
            <HomeActive className="w-9 h-9" />
          ) : (
            <HomeIcon className="w-9 h-9" />
          )}
        </button>
        <button
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 "
          onClick={() => handleNavigate(`/records`, "document")}
        >
          {activeTab === "document" ? (
            <DocumentBottomBarActive className="w-9 h-9" />
          ) : (
            <DocumentBottomBar className="w-9 h-9" />
          )}
        </button>
        <button
          data-tooltip-target="tooltip-settings"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 "
          onClick={() => handleNavigate("/message", "message")}
        >
          {activeTab === "message" ? (
            <MessageActive className="w-9 h-9" />
          ) : (
            <MessageIcon className="w-9 h-9" />
          )}
        </button>
        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full "
          onClick={() => handleNavigate("/profile", "profile")}
        >
          {activeTab === "profile" ? (
            <ProfileActive className="w-9 h-9" />
          ) : (
            <ProfileIcon className="w-9 h-9" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomBarCustom;
