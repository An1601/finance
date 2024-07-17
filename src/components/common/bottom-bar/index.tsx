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
import { useUser } from "@redux/useSelector";
import { UserRole } from "@type/enum";

const BottomBarCustom = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("home");
  const user = useUser();

  const [isVisible, setIsVisible] = useState(true);

  const handleNavigate = (path: string, tab: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/bank") {
      setActiveTab("home");
    } else if (
      location.pathname.includes("/records") ||
      location.pathname.includes("/bank/loan-list") ||
      location.pathname.includes("/bank/survey-list") ||
      location.pathname.includes("/bank/form-list")
    ) {
      setActiveTab("document");
    } else if (location.pathname.includes("/message")) {
      setActiveTab("message");
    } else if (location.pathname.includes("/profile")) {
      setActiveTab("profile");
    }
  }, [location.pathname]);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Trượt xuống
        setIsVisible(false);
      } else {
        // Trượt lên
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 w-screen sm:hidden max-w-[380px] h-[76px] bg-white border border-gray-200 rounded-full bottom-0 dark:bg-gray-700 dark:border-gray-600 shadow transition-transform duration-300 ease-in-out ${
        isVisible ? "transform translate-y-0" : "transform translate-y-full"
      }`}
    >
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center rounded-s-full "
          onClick={() =>
            handleNavigate(
              `${user.role === UserRole.BANK ? "/bank" : "/dashboard"}`,
              "home",
            )
          }
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
          onClick={() =>
            handleNavigate(
              `${user.role === UserRole.BANK ? "/bank" : ""}/records`,
              "document",
            )
          }
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
          onClick={() => handleNavigate(`/message`, "message")}
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
          onClick={() => handleNavigate(`/profile`, "profile")}
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
