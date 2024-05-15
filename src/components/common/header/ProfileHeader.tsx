import { Link, useNavigate } from "react-router-dom";
import face9 from "../../../assets/images/faces/9.jpg";
import { setLoadingFalse, setLoadingTrue } from "../../../redux/commonReducer";
import api from "../../../API/axios";
import { toast } from "react-toastify";
import Loader from "../loader/loader";
import { handle_logout } from "../../../redux/userReducers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import ProfileLink from "./ProfileLink";
function ProfileHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );
  const navigate = useNavigate();
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

  if (isLoading) return <Loader />;

  return (
    <div className="header-element hs-dropdown ti-dropdown min-w-[163px]">
      <div className="flex items-center gap-4">
        <button
          id="dropdown-profile"
          type="button"
          className="hs-dropdown-toggle !shadow-none !border-0 !shadow-transparent "
        >
          <img
            className="inline-block rounded-full "
            src={face9}
            width="35"
            height="35"
            alt="Image Description"
          />
        </button>
        <div className="md:flex hidden dropdown-profile flex-col">
          <div className="font-normal leading-4 !text-light_finance-textsub block text-[0.6875rem] ">
            Good morning
          </div>
          <div className="font-bold  !text-light_finance-textbody text-base tracking-tighter">
            Duyen nguyen
          </div>
        </div>
      </div>
      <div
        className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
        aria-labelledby="dropdown-profile"
      >
        <ul className="text-defaulttextcolor font-medium dark:text-[#8C9097] dark:text-white/50">
          <ProfileLink to="#" icon="ti-user-circle" label="Profile" />
          <ProfileLink to="#" icon="ti-inbox" label="Inbox" badge="25" />
          <ProfileLink to="#" icon="ti-clipboard-check" label="Task Manager" />
          <ProfileLink
            to="#"
            icon="ti-adjustments-horizontal"
            label="Settings"
          />
          <ProfileLink to="#" icon="ti-wallet" label="Bal: $7,12,950" />
          <ProfileLink to="#" icon="ti-headset" label="Support" />
          <li
            onClick={handleLogout}
            className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex cursor-pointer"
          >
            <i className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
