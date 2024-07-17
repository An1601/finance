import calendar from "@assets/icon/CalendarIcon.svg";
import timer from "@assets/icon/TimerIcon.svg";
import {
  InterestRateType,
  MeetingStatus,
  Status,
  StatusProcess,
} from "@type/enum";
import { useTranslation } from "react-i18next";
import { ConsultingMeeting } from "@type/types";
import { Dispatch, SetStateAction, useState } from "react";
import AlertModal from "@components/common/alert-modal";
import EditIcon from "@components/svg/Edit";
import DeleteIcon from "@components/svg/Delete";
import CompeleteIcon from "@assets/icon/Compelete.svg";
import { useProcess } from "@redux/useSelector";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const check = useProcess();

  const handleSubmit = () => {
    if (
      check.current_step === StatusProcess.BOOK_MEETING &&
      check.status === Status.APPROVAL
    ) {
      window.open(loanDetails.zoom_meeting, "_blank");
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(!isModalOpen);
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
      <div className="w-full max-w-sm p-4 bg-white rounded-2xl flex flex-col justify-center items-center gap-2 rounded-xl">
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="flex flex-col justify-start items-start">
              <div className="text-slate-600 text-xs font-normal leading-none tracking-tight">
                {loanDetails?.bank_name}
              </div>
              <div className="text-slate-900 text-lg font-bold leading-7">
                {loanDetails.loan_name}
              </div>
            </div>
          </div>
          {isShowButton ? (
            <div className="flex justify-start items-start gap-7">
              <button
                className="w-5 h-5 relative"
                data-hs-overlay="#booking-modal"
                disabled={
                  (check.current_step === StatusProcess.BOOK_MEETING &&
                    check.status === Status.APPROVAL) ||
                  check.status === Status.REJECTED
                }
                onClick={() => setCurrent(loanDetails)}
              >
                <EditIcon
                  color={
                    check.current_step === StatusProcess.BOOK_MEETING &&
                    check.status === Status.APPROVAL
                      ? "#C7CCD4"
                      : check.current_step === StatusProcess.BOOK_MEETING &&
                          check.status === Status.SUBMITED
                        ? "#45556E"
                        : check.current_step === StatusProcess.BOOK_MEETING &&
                            check.status === Status.REJECTED
                          ? "#C7CCD4"
                          : ""
                  }
                />
              </button>
              <button
                className="w-5 h-5 relative"
                onClick={handleDeleteClick}
                disabled={
                  (check.current_step === StatusProcess.BOOK_MEETING &&
                    check.status === Status.APPROVAL) ||
                  loanDetails?.state_meeting === MeetingStatus.REJECT
                }
                data-hs-overlay={`#modal_${loanDetails?.id}`}
              >
                <DeleteIcon
                  color={
                    check.current_step === StatusProcess.BOOK_MEETING &&
                    check.status === Status.APPROVAL
                      ? "#C7CCD4"
                      : check.current_step === StatusProcess.BOOK_MEETING &&
                          check.status === Status.SUBMITED
                        ? "#45556E"
                        : check.current_step === StatusProcess.BOOK_MEETING &&
                            check.status === Status.REJECTED
                          ? "#C7CCD4"
                          : ""
                  }
                />
              </button>
            </div>
          ) : (
            <img className="" src={CompeleteIcon}></img>
          )}
        </div>
        <div className="w-full h-px bg-zinc-300" />
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <div className="w-full h-52 flex flex-col justify-center items-center gap-5">
            <div className="w-full h-52 px-3 pb-3 flex flex-col justify-start items-start gap-3">
              <div className="text-slate-900 text-base font-bold leading-normal tracking-tight">
                {t("consulting.loanRequest")}
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full flex justify-between items-start">
                  <div className="text-slate-600 text-sm font-normal leading-tight dot-before">
                    {t("consulting.projectName")}:
                  </div>
                  <div className="text-slate-900 text-sm font-medium leading-tight">
                    {loanDetails?.survey_name}
                  </div>
                </div>
                <div className="w-full flex justify-between items-start">
                  <div className="text-slate-600 text-sm font-normal leading-tight dot-before">
                    {t("consulting.loanType")}:
                  </div>
                  <div className="text-slate-900 text-sm font-medium leading-tight">
                    {`${
                      loanDetails?.interest_rate_type
                        ? InterestRateType.ADJUSTABLE_RATE
                        : InterestRateType.FIXED_RATE
                    }`}
                  </div>
                </div>
                <div className="w-full flex justify-between items-start">
                  <div className="text-slate-600 text-sm font-normal leading-tight dot-before">
                    {t("consulting.creditLimit")}:
                  </div>
                  <div className="text-slate-900 text-sm font-medium leading-tight">
                    {loanDetails?.credit_limit}
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="text-slate-600 text-sm font-normal leading-tight dot-before">
                    {t("consulting.interestRate")}:
                  </div>
                  <div className="text-slate-900 text-sm font-medium leading-tight">
                    {loanDetails?.interest_rate}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex justify-start items-center gap-1">
                  <div className="w-5 h-5 relative">
                    <div className="w-5 h-5 absolute">
                      <div className="w-5 h-5 absolute" />
                      <img
                        className="w-[15px] h-[16.67px] absolute left-[2.50px] top-[0.83px]"
                        src={calendar}
                        alt="calendar"
                      />
                    </div>
                  </div>
                  <div className="text-slate-900 text-sm font-medium leading-tight">
                    {loanDetails?.date_meeting}
                  </div>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <div className="w-5 h-5 relative ">
                    <img
                      className="w-4 h-4 absolute left-[2px] top-[2px]"
                      src={timer}
                      alt="timer"
                    />
                  </div>
                  <div className="text-slate-900 text-sm font-medium leading-tight">
                    {formatDate(loanDetails?.start_time)} to{" "}
                    {formatDate(loanDetails?.end_time)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isShowButton && (
            <button
              className={`w-[280px] px-3 py-4  rounded-[28px] flex justify-center items-center ${
                check.current_step === StatusProcess.BOOK_MEETING &&
                check.status === Status.APPROVAL
                  ? "bg-light_finance-primary"
                  : check.current_step === StatusProcess.BOOK_MEETING &&
                      check.status === Status.SUBMITED
                    ? "bg-[#FFE9C9]"
                    : check.current_step === StatusProcess.BOOK_MEETING &&
                        check.status === Status.REJECTED
                      ? "bg-[#FFD4D8]"
                      : ""
              } `}
              onClick={handleSubmit}
            >
              <div
                className={`text-base font-medium leading-normal tracking-tight ${
                  check.current_step === StatusProcess.BOOK_MEETING &&
                  check.status === Status.APPROVAL
                    ? "text-white"
                    : check.current_step === StatusProcess.BOOK_MEETING &&
                        check.status === Status.SUBMITED
                      ? "text-[#FFA621]"
                      : check.current_step === StatusProcess.BOOK_MEETING &&
                          check.status === Status.REJECTED
                        ? "text-[#F65160]"
                        : ""
                }`}
              >
                {check.current_step === StatusProcess.BOOK_MEETING &&
                check.status === Status.APPROVAL
                  ? t("consulting.connect")
                  : check.current_step === StatusProcess.BOOK_MEETING &&
                      check.status === Status.SUBMITED
                    ? t("consulting.pending")
                    : check.current_step === StatusProcess.BOOK_MEETING &&
                        check.status === Status.REJECTED
                      ? "Reject"
                      : ""}
              </div>
            </button>
          )}
        </div>
        <AlertModal
          id={`modal_${loanDetails?.id}`}
          title={t("consulting.consulting")}
          content={t("consulting.comfirmDelete")}
          submitLabel={t("consulting.delete")}
          cancelLabel={t("survey.submit_modal_close")}
          handleSubmit={() => {
            handleDelete(loanDetails?.id);
            setIsModalOpen(false);
          }}
        />
      </div>
      <AlertModal
        id={`modal_${loanDetails.id}`}
        title={t("consulting.consulting")}
        content={t("consulting.comfirmDelete")}
        submitLabel={t("consulting.delete")}
        cancelLabel={t("survey.submit_modal_close")}
        handleSubmit={() => {
          handleDelete(loanDetails?.id);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default MeetingItem;
