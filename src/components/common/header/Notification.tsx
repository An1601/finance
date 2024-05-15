import { Link } from "react-router-dom";
import NotiHeader from "../../svg/NotiHeader";
import SimpleBar from "simplebar-react";
import { useState } from "react";
import { initialNotifications } from "./NotificationConst";
import EmailHeader from "../../svg/EmailHeader";

function Notification() {
  const [notifications, setNotifications] = useState([...initialNotifications]);

  const handleNotificationClose = (e: any, index: any) => {
    e.stopPropagation(); // Prevents the event from reaching the button click event
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };
  return (
    <div className="flex gap-3 items-center">
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
                <li className="ti-dropdown-item dropdown-item" key={index}>
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
                          onClick={(e) => handleNotificationClose(e, index)}
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
  );
}

export default Notification;
