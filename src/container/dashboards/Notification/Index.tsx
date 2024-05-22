import ItemNotification from "./ItemNotification";
import bg1 from "../../../assets/images/authentication/1.svg";
import { useNavigate } from "react-router-dom";

const NotificationIndex = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 mt-[75px] flex flex-col gap-7">
        <div className="h-8 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <i
                className="md:hidden  fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
                onClick={() => {
                  navigate("/");
                }}
              ></i>
              <div className="md:block hidden w-1 h-5 bg-danger rounded-sm" />
              <div className="text-center text-slate-900 text-2xl font-bold font-HelveticaNeue leading-loose">
                Notifications
              </div>
            </div>
          </div>
          <div className="px-2 py-1 bg-[#FFE4DE] font-HelveticaNeue font-medium text-xs leading-4 tracking-tight text-light_finance-secondary rounded-sm">
            5 Unread
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-y-4 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-x-24">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-28 px-3 py-4 bg-white border-[1px] border-stroke rounded-lg flex items-center justify-between"
            >
              <ItemNotification />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute w-full sm:hidden top-[-1.5rem]">
        {[...Array(Math.ceil(window.innerHeight / 987) + 1)].map((_, index) => (
          <img
            key={index}
            className="w-full bg-cover bg-center"
            src={bg1}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationIndex;
