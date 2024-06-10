import api from "@api/axios";
import bookingTitleIcon from "@assets/icon/bookingTitleIcon.svg";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import Loader from "@components/common/loader";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import { AppDispatch } from "@redux/store";
import { useLoading } from "@redux/useSelector";
import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface MeetingTimeType {
  id: number;
  start_time: string;
  end_time: string;
  slots: number;
  status: Boolean;
}

const BookingModal = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState("");
  const [timeList, setTimeList] = useState<MeetingTimeType[]>([]);
  const { loanId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useLoading();

  const formatDateString = (date: Value) => {
    if (date instanceof Date) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    } else if (
      Array.isArray(date) &&
      date[0] instanceof Date &&
      date[1] instanceof Date
    ) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date[0]);
    }
  };
  const handleMeetingTime = async () => {
    try {
      const response = await api.post(`/check-time-meeting`, {
        datetime: date,
      });
      if (response.status === 200) {
        setTimeList(response.data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === 400) {
      } else toast.error(!axios.isAxiosError(error) && t("login.messageError"));
    }
  };
  const handleBookMeeting = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.post(`/loans/meeting-submit`, {
        id: loanId,
        date_meeting: formatDateString(date),
        start_time: startTime,
      });
      if (response.status === 200) {
        setTimeList(response.data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === 400) {
      } else toast.error(!axios.isAxiosError(error) && t("login.messageError"));
    } finally {
      dispatch(setLoadingFalse());
    }
  };
  useEffect(() => {
    handleMeetingTime();
  }, [date]);

  if (isLoading) return <Loader />;

  return (
    <div
      id="booking-modal"
      className="size-full ti-modal hs-overlay hidden fixed top-0 start-0 "
    >
      <div className="w-full h-full px-6 flex items-center justify-center opacity-100 duration-500 ease-out transition-all">
        <div className="ti-modal-content max-h-[98vh] overflow-y-scroll p-4 !rounded-lg w-full sm:max-w-[480px] md:max-w-[816px]">
          <div className="flex flex-col gap-6 items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src={bookingTitleIcon} />
                <div className="font-bold text-base leading-6 tracking-tight text-light_finance-textbody">
                  {t("process.bookMeeting.title")}
                </div>
              </div>
              <i
                className="fa-solid fa-x fa-lg cursor-pointer"
                data-hs-overlay="#booking-modal"
              ></i>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-14">
              <div className="col-span-2 md:col-span-1">
                <Calendar onChange={setDate} />
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-6 items-center">
                <div className="w-full flex flex-col gap-2">
                  <div className="font-HelveticaNeue text-sm font-bold leading-5">
                    {t("process.bookMeeting.selectTime")}
                  </div>
                  <div className="grid grid-cols-6 gap-y-5 gap-x-8 max-[450px]:gap-x-4 max-h-[25vh] overflow-y-auto shadow-md">
                    {timeList &&
                      timeList.map((availableTime) => (
                        <button
                          disabled={!availableTime.status}
                          onClick={() => {
                            if (availableTime.status)
                              setStartTime(availableTime.start_time);
                          }}
                          key={availableTime.id}
                          className={`${availableTime.start_time === startTime ? "bg-light_finance-sub_second" : "bg-white"} col-span-3 xxs:col-span-2 flex items-center py-2 px-3 border-[1px] border-light_finance-textbody rounded-lg`}
                        >
                          <i
                            className={`fa-solid fa-circle fa-2xs ${availableTime.status ? "text-light_finance-primary" : "text-light_finance-textsub"}`}
                          ></i>
                          <div className="ml-2 text-md font-normal whitespace-nowrap">
                            {availableTime.start_time}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="font-HelveticaNeue text-sm font-bold leading-5">
                    {t("process.loanDetail.duration")}
                  </div>
                  <div className="w-full border-[1px] border-light_finance-texttitle rounded-lg bg-light_finance-background p-3">
                    30 minutes
                  </div>
                </div>
                <textarea
                  placeholder="Your note"
                  className="h-32 w-full rounded-sm border-[1px] focus:!border-[1px] border-light_finance-texttitle focus:!border-light_finance-texttitle text-sm font-normal leading-5 text-light_finance-textbody"
                />
              </div>
            </div>
            <PrimarySubmitBtn
              name={t("process.book")}
              handleSubmit={handleBookMeeting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
