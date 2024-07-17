import calendar from "@assets/icon/CalendarIcon.svg";
import timer from "@assets/icon/TimerIcon.svg";
import { MeetingStatus } from "@type/enum";
import { useTranslation } from "react-i18next";
import { ConsultingMeeting } from "@type/types";
import { Dispatch, SetStateAction } from "react";
import AlertModal, { modalShow } from "@components/common/alert-modal";
import EditIcon from "@components/svg/Edit";
import DeleteIcon from "@components/svg/Delete";

const MeetingItem = ({
  loanDetails,
  handleDelete,
  setCurrent,
  isShowButton,
}: {
  loanDetails: ConsultingMeeting;
  handleDelete: (id: number) => void;
  setCurrent: Dispatch<SetStateAction<ConsultingMeeting | undefined>>;
  isShowButton?: boolean;
}) => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (
      loanDetails.state_meeting === MeetingStatus.CONNECT &&
      loanDetails.zoom_meeting
    ) {
      window.open(loanDetails.zoom_meeting, "_blank");
    }
  };

  const formatDate = (dateTimeString: string) => {
    const dateObject = new Date(dateTimeString.replace(" ", "T") + "Z");
    const isoString = dateObject.toISOString();
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(isoString));
  };

  return (
    <div>
      <div className="w-full h-24 p-4 bg-white rounded-[16px] justify-between items-start inline-flex mb-6">
        <div className="grow shrink basis-0 self-stretch justify-between items-center flex">
          <div className="h-16 justify-start items-center gap-2 flex">
            <div className="self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-teal-500 text-xs font-medium font-['Helvetica Neue'] leading-none tracking-tight">
                {loanDetails?.survey_name}
              </div>
              <div className="flex-col justify-start items-start flex">
                <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-tight">
                  {`${
                    loanDetails?.interest_rate_type
                      ? t("process.loanDetail.adjustType")
                      : t("process.loanDetail.fixType")
                  }`}
                </div>
                <div className="text-slate-900 text-xl font-bold font-['Helvetica Neue'] leading-7">
                  {loanDetails?.loan_name}
                </div>
              </div>
            </div>
          </div>
          <div className=" self-stretch justify-start items-center gap-[84px] flex">
            <div className="flex flex-col xl:flex-row justify-center items-end xl:justify-end xl:items-center gap-6 ">
              <div className="justify-start items-center gap-1 flex w-[160px]">
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute">
                    <div className="w-5 h-5 left-0 top-0 absolute" />
                    <img
                      className="w-[15px] h-[16.67px] absolute left-[2.50px] top-[0.83px]"
                      src={calendar}
                      alt="calendar"
                    />
                  </div>
                </div>
                <div className="text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-tight ">
                  {loanDetails?.date_meeting}
                </div>
              </div>
              <div className="justify-start items-center gap-1 flex w-[180px]">
                <div className="w-5 h-5 relative ">
                  <img
                    className="w-4 h-4 absolute left-[2px] top-[2px]"
                    src={timer}
                    alt="timer"
                  />
                </div>
                <div className="text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-tight ">
                  {formatDate(loanDetails?.start_time)} to{" "}
                  {formatDate(loanDetails?.end_time)}
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-between items-end inline-flex">
              <div className="justify-start items-start gap-7 inline-flex">
                <button
                  className="w-5 h-5 relative"
                  data-hs-overlay="#booking-modal"
                  disabled={loanDetails.state_meeting !== MeetingStatus.PENDING}
                  onClick={() => setCurrent(loanDetails)}
                >
                  <EditIcon
                    color={
                      loanDetails?.state_meeting !== MeetingStatus.PENDING
                        ? "#C7CCD4"
                        : "#45556E"
                    }
                  />
                </button>
                <button
                  className="w-5 h-5 relative"
                  onClick={() => modalShow(`modal_${loanDetails.id}`)}
                  disabled={loanDetails.state_meeting !== MeetingStatus.PENDING}
                >
                  <DeleteIcon
                    color={
                      loanDetails?.state_meeting !== MeetingStatus.PENDING
                        ? "#C7CCD4"
                        : "#45556E"
                    }
                  />
                </button>
              </div>
              {isShowButton && (
                <button
                  className={`w-[94px] px-6 py-2 rounded-lg justify-center items-center gap-1 inline-flex ${
                    loanDetails?.state_meeting === MeetingStatus.PENDING
                      ? "bg-[#FFE9C9]"
                      : loanDetails?.state_meeting === MeetingStatus.REJECT
                        ? "bg-[#FFD4D8]"
                        : loanDetails?.state_meeting === MeetingStatus.DONE
                          ? "bg-light_finance-textsub"
                          : "bg-light_finance-primary"
                  }`}
                  onClick={handleSubmit}
                  disabled={loanDetails.state_meeting !== MeetingStatus.CONNECT}
                >
                  <div
                    className={`text-center text-sm font-medium  leading-tight  ${
                      loanDetails.state_meeting === MeetingStatus.PENDING
                        ? "text-[#FFA621]"
                        : loanDetails?.state_meeting === MeetingStatus.REJECT
                          ? "text-[#F65160]"
                          : "text-white"
                    }`}
                  >
                    {loanDetails.state_meeting === MeetingStatus.PENDING
                      ? t("consulting.pending")
                      : loanDetails?.state_meeting === MeetingStatus.REJECT
                        ? t("home.reject")
                        : t("consulting.connect")}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        id={`modal_${loanDetails.id}`}
        title={t("consulting.consulting")}
        content={t("consulting.comfirmDelete")}
        submitLabel={t("consulting.delete")}
        cancelLabel={t("survey.submit_modal_close")}
        handleSubmit={() => {
          handleDelete(loanDetails?.id);
        }}
      />
    </div>
  );
};

export default MeetingItem;
