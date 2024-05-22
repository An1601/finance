import MobileHomeBtn from "@components/common/button/MobileHomeBtn";
import calendar from "@assets/icon/CalendarIcon.svg";
import timer from "@assets/icon/TimerIcon.svg";

const ConsultingMeetingItem = () => {
  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-3">
      <div className="flex gap-10 h-11 justify-between items-start">
        <div className="max-w-full flex flex-col">
          <div className="font-HelveticaNeue font-normal text-xs leading-4 tracking-tight text-light_finance-textsub overflow-hidden text-ellipsis whitespace-nowrap">
            Conventional fixed rate loans
          </div>
          <div className="font-HelveticaNeue font-bold text-lg leading-7 text-light_finance-textbody overflow-hidden text-ellipsis whitespace-nowrap">
            Franchise loans
          </div>
        </div>
        <MobileHomeBtn name="Connect" />
      </div>
      <div className="h-6 flex justify-between">
        <div className="flex gap-1">
          <img className="h-5 w-5" src={calendar} />
          <div>24,Oct 2024</div>
        </div>
        <div className="flex gap-1">
          <img className="h-5 w-5" src={timer} />
          <div>09:00 to 09:30 am</div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingMeetingItem;
