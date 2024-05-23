import { useNavigate } from "react-router-dom";
import LoanFilter from "../PackageLoan/LoanFilter";
import ConsultingMeetingList from "./ConsultingMeetingList";
import bg1 from "@assets/images/authentication/1.svg";
import MeetingFilter from "./MeetingFilter";

function MeetingIndex() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 mt-[75px]">
        <div className="flex md:hidden items-center justify-between">
          <div className="flex gap-3 md:gap-2 items-center">
            <i
              className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
              onClick={() => {
                navigate("/");
              }}
            ></i>
            <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
              Consulting meeting list
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 my-7">
          <div className="w-full flex items-center justify-between">
            <div className="md:flex items-center gap-2 hidden">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                Consulting meeting list
              </div>
            </div>
            <MeetingFilter />
          </div>
          <ConsultingMeetingList />
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
}

export default MeetingIndex;
