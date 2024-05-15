import { FC, Fragment, useEffect, useState } from "react";
import Modalsearch from "../modalsearch/modalsearch";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState, store } from "../../../redux/store";
import { connect, useDispatch, useSelector } from "react-redux";
import { ThemeChanger } from "../../../redux/action";
import face9 from "../../../assets/images/faces/9.jpg";
import SimpleBar from "simplebar-react";
import { setLoadingFalse, setLoadingTrue } from "../../../redux/commonReducer";
import api from "../../../API/axios";
import { toast } from "react-toastify";
import Loader from "../loader/loader";
import { handle_logout } from "../../../redux/userReducers";
import NotiHeader from "../../svg/NotiHeader";
import EmailHeader from "../../svg/EmailHeader";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({ local_varaiable, ThemeChanger }: any) => {
  const initialNotifications = [
    {
      id: 1,
      color: "primary",
      avatarColor: "!bg-primary",
      icon: "ti-gift",
      text1: "Your Order Has Been Shipped",
      text2: "Order No: 123456 Has Shipped To YourDelivery Address",
      class: "",
      class1: "",
    },
    {
      id: 2,
      color: "secondary",
      avatarColor: "bg-secondary",
      icon: "ti-discount-2",
      text1: "Discount Available",
      text2: "Discount Available On Selected Products",
      class: "",
      class1: "",
    },
    {
      id: 3,
      color: "pink",
      avatarColor: "bg-pink",
      icon: "ti-user-check",
      text1: "Account Has Been Verified",
      text2: "Your Account Has Been Verified Successfully",
      class: "",
      class1: "",
    },
    {
      id: 4,
      color: "warning",
      avatarColor: "bg-warning",
      icon: "ti-circle-check",
      text1: "Order Placed ",
      text2: "Order Placed Successflly",
      class: "text-warning",
      class1: " ID:1116773",
    },
    {
      id: 5,
      color: "success",
      avatarColor: "bg-success",
      icon: "ti-clock",
      text1: "Order Delayed",
      text2: "Order Delayed Unfortunately",
      class: "text-success",
      class1: " ID:7731116",
    },
  ];

  const [notifications, setNotifications] = useState([...initialNotifications]);

  const handleNotificationClose = (e: any, index: any) => {
    e.stopPropagation(); // Prevents the event from reaching the button click event
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  function menuClose() {
    const theme = store.getState().rootReducer.reducer;
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
    if (window.innerWidth >= 992) {
      ThemeChanger({
        ...theme,
        toggled: local_varaiable.toggled ? local_varaiable.toggled : "",
      });
    }
  }
  const toggleSidebar = () => {
    const theme = store.getState().rootReducer.reducer;
    const sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        const verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, toggled: "icon-overlay-close" });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            } else {
              const sidemenu = document.querySelector(
                ".side-menu__item.active",
              );
              if (sidemenu) {
                ThemeChanger({ ...theme, toggled: "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active",
                  );
                } else {
                  ThemeChanger({ ...theme, toggled: "" });
                }
              }
            }

            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "detached-close" });
            }
            break;

          // default
          case "default":
            ThemeChanger({ ...theme, toggled: "" });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "menu-hover-closed" });
            }
            break;
          case "icon-click":
            if (theme.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-click-closed" });
            }
            break;
          case "icon-hover":
            if (theme.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-hover-closed" });
            }
            break;
        }
      }
    } else {
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" });

        setTimeout(() => {
          if (theme.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay");

            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay");

                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay");

              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, toggled: "close" });
      }
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      dispatch(setLoadingTrue());
      const response = await await api.post("/logout");
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
    <Fragment>
      <header className="app-header">
        <nav className="main-header !h-[3.75rem]" aria-label="Global">
          <div className="main-header-container ml-10 mr-20">
            <div className="header-content-left">
              <div
                className="hidden sm:flex lg:hidden md:px-[0.325rem] items-center"
                onClick={() => toggleSidebar()}
              >
                <Link
                  aria-label="Hide Sidebar"
                  className="sidemenu-toggle animated-arrow  hor-toggle horizontal-navtoggle inline-flex items-center"
                  to="#"
                >
                  <span></span>
                </Link>
              </div>
              <div className="lg:flex hidden items-center ">
                <div className="font-HelveticaNeue text-xl leading-7 text-light_finance-textbody font-bold">
                  Dashboard
                </div>
              </div>
            </div>
            <div className="header-content-right !items-center">
              <div
                className="w-[380px] h-10 flex justify-center items-center border-[1px] border-light_finance-texttitle rounded-xl"
                data-hs-overlay="#search-modal"
              >
                <div className="w-[340px] h-10 flex items-center">
                  <div className="ml-[10px] text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-tight">
                    Search
                  </div>
                </div>
                <div className="w-[39px] h-[39px] p-[9.82px] rounded-r-xl bg-light_finance-sub_second justify-start items-center gap-[135px] flex ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_13_309)">
                      <path
                        d="M12.8273 11.3978C13.8176 10.0464 14.2611 8.37098 14.0692 6.70665C13.8772 5.04233 13.064 3.51185 11.792 2.42141C10.5201 1.33097 8.88339 0.760984 7.20928 0.82549C5.53516 0.889997 3.94713 1.58424 2.7629 2.76932C1.57867 3.9544 0.885566 5.54292 0.822257 7.21708C0.758948 8.89124 1.3301 10.5276 2.42145 11.7987C3.5128 13.0698 5.04387 13.882 6.70833 14.0728C8.37279 14.2635 10.0479 13.8188 11.3985 12.8275H11.3975C11.4275 12.8684 11.4609 12.9076 11.4977 12.9451L15.4352 16.8826C15.627 17.0745 15.8872 17.1824 16.1585 17.1825C16.4298 17.1826 16.69 17.0749 16.8819 16.8831C17.0738 16.6914 17.1817 16.4312 17.1818 16.1599C17.1819 15.8886 17.0742 15.6284 16.8824 15.4365L12.9449 11.499C12.9084 11.462 12.869 11.4288 12.8273 11.3978ZM13.0911 7.46639C13.0911 8.20507 12.9457 8.93653 12.663 9.61898C12.3803 10.3014 11.966 10.9215 11.4436 11.4439C10.9213 11.9662 10.3012 12.3805 9.61874 12.6632C8.93629 12.9459 8.20484 13.0914 7.46615 13.0914C6.72746 13.0914 5.99601 12.9459 5.31356 12.6632C4.6311 12.3805 4.011 11.9662 3.48867 11.4439C2.96635 10.9215 2.55201 10.3014 2.26933 9.61898C1.98665 8.93653 1.84115 8.20507 1.84115 7.46639C1.84115 5.97455 2.43378 4.54381 3.48867 3.48891C4.54357 2.43402 5.97431 1.84139 7.46615 1.84139C8.95799 1.84139 10.3887 2.43402 11.4436 3.48891C12.4985 4.54381 13.0911 5.97455 13.0911 7.46639Z"
                        fill="#45556E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13_309">
                        <rect
                          width="16.3636"
                          height="16.3636"
                          fill="white"
                          transform="translate(0.818237 0.818237)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex gap-8 items-center ml-11">
                <div className="flex gap-4 items-center">
                  <div className="header-element notifications-dropdown header-notification hs-dropdown ti-dropdown !hidden md:!block [--placement:bottom-right] rtl:[--placement:bottom-left]">
                    <button
                      id="dropdown-notification"
                      type="button"
                      className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs"
                    >
                      <NotiHeader />
                    </button>
                    <div
                      className="main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu bg-white !w-[22rem] border-0 border-defaultborder hidden !m-0"
                      aria-labelledby="dropdown-notification"
                    >
                      <div className="ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center">
                        <p className="mb-0 text-[1.0625rem] text-defaulttextcolor font-semibold dark:text-[#8c9097] dark:text-white/50">
                          Notifications
                        </p>
                        <span
                          className="text-[0.75em] py-[0.25rem/2] px-[0.45rem] font-[600] rounded-sm bg-secondary/10 text-secondary"
                          id="notifiation-data"
                        >{`${notifications.length} Unread`}</span>
                      </div>
                      <div className="dropdown-divider"></div>
                      <ul className="list-none !m-0 !p-0 end-0">
                        <SimpleBar id="header-notification-scroll">
                          {notifications.map((notification, index) => (
                            <li
                              className="ti-dropdown-item dropdown-item"
                              key={index}
                            >
                              <div className="flex items-start">
                                <div className="pe-2">
                                  <span
                                    className={`inline-flex text-${notification.color} justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem] ${notification.avatarColor}/10 !rounded-[50%]`}
                                  >
                                    <i
                                      className={`ti ${notification.icon} text-[1.125rem]`}
                                    ></i>
                                  </span>
                                </div>
                                <div className="grow flex items-center justify-between">
                                  <div>
                                    <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem] font-semibold">
                                      <Link to="#">{notification.text1}</Link>
                                      <span className={notification.class}>
                                        {notification.class1}
                                      </span>
                                    </p>
                                    <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">
                                      Order No: 123456
                                      {notification.text2}
                                    </span>
                                  </div>
                                  <div>
                                    <Link
                                      aria-label="anchor"
                                      to="#"
                                      onClick={(e) =>
                                        handleNotificationClose(e, index)
                                      }
                                      className="min-w-fit text-[#8c9097] dark:text-white/50 me-1 dropdown-item-close1"
                                    >
                                      <i className="ti ti-x text-[1rem]"></i>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </SimpleBar>
                      </ul>

                      <div
                        className={`p-4 empty-header-item1 border-t mt-2 ${
                          notifications.length === 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="grid">
                          <a
                            href="#"
                            className="ti-btn ti-btn-primary-full !m-0 w-full p-2"
                          >
                            View All
                          </a>
                        </div>
                      </div>
                      <div
                        className={`p-[3rem] empty-item1 ${
                          notifications.length === 0 ? "" : "hidden"
                        }`}
                      >
                        <div className="text-center">
                          <span className="!h-[4rem]  !w-[4rem] avatar !leading-[4rem] !rounded-full !bg-secondary/10 !text-secondary">
                            <i className="ri-notification-off-line text-[2rem]  "></i>
                          </span>
                          <h6 className="font-semibold mt-3 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[1rem]">
                            No New Notifications
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-element header-notification hs-dropdown ti-dropdown !hidden md:!block [--placement:bottom-right] rtl:[--placement:bottom-left]">
                    <button
                      type="button"
                      className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs"
                    >
                      <EmailHeader />
                    </button>
                  </div>
                </div>
                {/* profile */}
                <div className="header-element hs-dropdown ti-dropdown">
                  <div className="flex items-center gap-4">
                    <button
                      id="dropdown-profile"
                      type="button"
                      className="hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent "
                    >
                      <img
                        className="inline-block rounded-full "
                        src={face9}
                        width="32"
                        height="32"
                        alt="Image Description"
                      />
                    </button>
                    <div className="md:flex hidden dropdown-profile flex-col">
                      <div className="font-normal leading-4 !text-light_finance-textsub block text-[0.6875rem] ">
                        Good morning
                      </div>
                      <div className="font-bold  !text-light_finance-textbody text-base tracking-tighter">
                        Json Taylor
                      </div>
                    </div>
                  </div>
                  <div
                    className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                    aria-labelledby="dropdown-profile"
                  >
                    <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
                      <li>
                        <Link
                          className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex"
                          to="#"
                        >
                          <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]"></i>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex"
                          to="#"
                        >
                          <i className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]"></i>
                          Inbox{" "}
                          <span className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">
                            25
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
                          to="#"
                        >
                          <i className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]"></i>
                          Task Manager
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
                          to="#"
                        >
                          <i className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]"></i>
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex"
                          to="#"
                        >
                          <i className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]"></i>
                          Bal: $7,12,950
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex"
                          to="#"
                        >
                          <i className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]"></i>
                          Support
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          handleLogout();
                        }}
                        className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex cursor-pointer"
                      >
                        <i className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>
                        Log Out
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Modalsearch />
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
