import { useNavigate } from "react-router-dom";
import DocumentBottomBar from "../../svg/DocumentBottom";
import HomeIcon from "../../svg/Home";
import MessageIcon from "../../svg/Message";
import ProfileIcon from "../../svg/Profile";

const BottomBarCustom = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-50 w-screen sm:hidden max-w-[380px] h-[76px] -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 shadow ">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon className="w-9 h-9" />
        </button>

        <button
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <DocumentBottomBar className="w-9 h-9" />
        </button>

        <button
          data-tooltip-target="tooltip-settings"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <MessageIcon className="w-9 h-9" />
        </button>

        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ProfileIcon className="w-9 h-9" />
        </button>
      </div>
    </div>
  );
};

export default BottomBarCustom;
