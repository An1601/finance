import MobileHomeBtn from "../../../components/common/button/MobileHomeBtn";
import CalendarIcon from "../../../components/svg/Calendar";
import TimerIcon from "../../../components/svg/Timer";

const ConsultingMeetingItem = () => {
  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-3">
      <div className="flex gap-10 h-11 justify-between items-start">
        <div className="flex flex-col">
          <div className="font-HelveticaNeue font-normal text-xs leading-4 tracking-tight text-light_finance-textsub">
            Conventional fixed rate loans
          </div>
          <div className="font-HelveticaNeue font-bold text-lg leading-7 text-light_finance-textbody">
            Franchise loans
          </div>
        </div>
        <MobileHomeBtn name="Connect" />
      </div>
      <div className="h-6 flex justify-between gap-3">
        <div className="flex gap-1">
          <CalendarIcon />
          <div>24,Oct 2024</div>
        </div>
        <div className="flex gap-1">
          <TimerIcon />
          <div>09:00 to 09:30 am</div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingMeetingItem;
