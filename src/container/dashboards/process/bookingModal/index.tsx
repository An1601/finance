import api from "@api/axios";
import bookingTitleIcon from "@assets/icon/bookingTitleIcon.svg";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import { ConsultingMeeting } from "@type/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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

let choosenDate: Value = new Date();
const BookingModal = ({
  meetingData,
  reFetchMeeeting,
}: {
  meetingData?: ConsultingMeeting | undefined;
  reFetchMeeeting?: (() => Promise<void>) | undefined;
}) => {
  const [date, setDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState("");
  const [timeList, setTimeList] = useState<MeetingTimeType[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [note, setNote] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const offerId = searchParams.get("offerId");
  const { t } = useTranslation();
  const { isLoading, toggleLoading } = useLoading();
  const navigate = useNavigate();

  const formatISOStringToTime = (isoString: string) => {
    const date = new Date(isoString);
    const formattedTime = date.toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  };

  const formatValueToISOString = (date: Value): string | undefined => {
    let newDate = new Date();
    if (date instanceof Date) {
      newDate = date;
    } else if (
      Array.isArray(date) &&
      date[0] instanceof Date &&
      date[1] instanceof Date
    ) {
      newDate = date[0];
    }
    newDate.setHours(currentTime.getHours());
    newDate.setMinutes(currentTime.getMinutes());
    newDate.setSeconds(currentTime.getSeconds());
    const utcDate = newDate.toISOString();
    return utcDate.split("T")[0];
  };

  const compareTime = (inputTimeString: string) => {
    if (date) {
      const current = new Date();
      if (date > current) {
        return true;
      }
    }
    const inputTime = new Date(inputTimeString);
    if (inputTime <= currentTime) {
      return false;
    }
    return true;
  };

  const formatInitDate = (dateTimeString: string) => {
    const [datePart, timePart] = dateTimeString.split(" ");
    const formattedDate = `${datePart}T${timePart}.000000Z`;
    return formattedDate;
  };

  const handleMeetingTime = async () => {
    try {
      const response = await api.post(`/check-time-meeting`, {
        date_meeting: formatValueToISOString(choosenDate),
      });
      if (response.status === 200) {
        const times = response.data?.data?.map((time: MeetingTimeType) => ({
          id: time.id,
          start_time: time.start_time,
          end_time: time.end_time,
          slots: time.slots,
          status: time.status,
        }));
        setTimeList(times);
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    }
  };

  const handleBookMeeting = async () => {
    if (startTime) {
      if (offerId) {
        toggleLoading(true);
        try {
          const response = await api.post(`/loans/meeting-submit`, {
            loan_offer_id: offerId,
            date_meeting: formatValueToISOString(date),
            start_time: startTime,
            note: note,
          });
          if (response.status === 200) {
            navigate(
              `/book-meeting/${response.data?.data?.loan_business_list_id}`,
            );
            document.body.style.overflow = "";
          }
        } catch (error) {
          const message =
            axios.isAxiosError(error) && error.response?.data.message
              ? error.response.data.message
              : t("login.messageError");
          toast.error(message);
        } finally {
          toggleLoading(false);
          document.body.style.overflow = "";
        }
      }
    } else toast.info(t("process.bookMeeting.timeAlert"));
  };

  const handleUpdateMeeting = async () => {
    toggleLoading(true);
    try {
      const response = await api.post(
        `/meeting/${meetingData?.meeting.id}/update`,
        {
          id: meetingData?.meeting.id,
          date_meeting: formatValueToISOString(date),
          start_time: startTime,
          note: note,
        },
      );
      if (response.status === 200) {
        toast.success(t("process.bookMeeting.updateSucess"));
        if (reFetchMeeeting) {
          reFetchMeeeting();
        }
      }
    } catch (error) {
      toast.error(t("process.bookMeeting.failedUpdate"));
    } finally {
      toggleLoading(false);
      document.body.style.overflow = "";
    }
  };

  const handleSubmit = () => {
    if (meetingData) {
      if (
        startTime === formatInitDate(meetingData.meeting.start_time) &&
        note === meetingData.meeting.note
      ) {
        toast.info(t("process.bookMeeting.existed"));
      } else {
        handleUpdateMeeting();
      }
    } else {
      handleBookMeeting();
    }
  };

  useEffect(() => {
    handleMeetingTime();
  }, [date]);

  useEffect(() => {
    let timerId = setTimeout(function tick() {
      handleMeetingTime();
      setCurrentTime(new Date());
      timerId = setTimeout(tick, 10000);
    }, 10000);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (meetingData) {
      setNote(meetingData.meeting?.note);
      choosenDate = new Date(meetingData.meeting.date_meeting);
      setDate(new Date(meetingData.meeting.date_meeting));
      setStartTime(formatInitDate(meetingData.meeting.start_time));
    }
  }, [meetingData]);

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
                <Calendar
                  onChange={(date) => {
                    choosenDate = date;
                    setDate(choosenDate);
                  }}
                  tileDisabled={({ date }) => {
                    const current = new Date();
                    current.setHours(0, 0, 0, 0);
                    return date < current;
                  }}
                  value={date}
                />
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col gap-6 items-center">
                <div className="w-full flex flex-col gap-2">
                  <div className="font-HelveticaNeue text-sm font-bold leading-5">
                    {t("process.bookMeeting.selectTime")}
                  </div>
                  <div className="grid grid-cols-6 gap-y-5 gap-x-3 sm:gap-x-5 xl:gap-x-8 max-h-[25vh] overflow-y-auto shadow-md">
                    {timeList &&
                      timeList.map((availableTime) => (
                        <button
                          onClick={() => {
                            if (
                              (availableTime.status &&
                                compareTime(availableTime?.start_time)) ||
                              (meetingData &&
                                availableTime.start_time ===
                                  formatInitDate(
                                    meetingData?.meeting.start_time,
                                  ))
                            )
                              setStartTime(availableTime.start_time);
                          }}
                          key={availableTime.id}
                          className={`${availableTime.start_time === startTime ? "bg-light_finance-sub_second" : "bg-white"} col-span-3 xxs:col-span-2 flex items-center py-2 px-3 border-[1px] border-light_finance-textbody rounded-lg`}
                        >
                          <i
                            className={`fa-solid fa-circle fa-2xs ${
                              (availableTime.status &&
                                compareTime(availableTime?.start_time)) ||
                              (meetingData &&
                                availableTime.start_time ===
                                  formatInitDate(
                                    meetingData?.meeting.start_time,
                                  ))
                                ? "text-light_finance-primary"
                                : "text-light_finance-red"
                            }`}
                          ></i>
                          <div className="ml-2 text-md font-normal whitespace-nowrap">
                            {formatISOStringToTime(availableTime.start_time)}
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
                  value={note}
                  onChange={(e) => {
                    setNote(e.currentTarget.value);
                  }}
                  className="h-32 w-full rounded-sm border-[1px] focus:!border-[1px] border-light_finance-texttitle focus:!border-light_finance-texttitle text-sm font-normal leading-5 text-light_finance-textbody"
                />
              </div>
            </div>
            <PrimarySubmitBtn
              name={t("process.book")}
              handleSubmit={handleSubmit}
              dataHsOverlay="#booking-modal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingModal;
