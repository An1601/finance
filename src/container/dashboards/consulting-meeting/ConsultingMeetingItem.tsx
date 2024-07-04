import calendar from "@assets/icon/CalendarIcon.svg";
import timer from "@assets/icon/TimerIcon.svg";
import { useTranslation } from "react-i18next";
import { ConsultingMeeting } from "@type/types";
import { InterestRateType, MeetingStatus } from "@type/enum";
import { useEffect, useRef, useState } from "react";
import AlertModal from "@components/common/alert-modal";

const ConsultingMeetingItem = ({
  loanDetails,
  handleDelete,
  isSetting,
  setCurrent,
  isShowButton,
}: {
  loanDetails?: ConsultingMeeting | undefined;
  handleDelete?: (id: number) => void;
  isSetting?: boolean;
  setCurrent?: any;
  isShowButton?: boolean;
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (
      loanDetails?.meeting?.state === MeetingStatus.CONNECT &&
      loanDetails?.meeting?.zoom_meeting
    ) {
      window.open(loanDetails?.meeting?.zoom_meeting, "_blank");
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatDate = (dateTimeString?: string) => {
    if (!dateTimeString) return "Invalid date";
    const dateObject = new Date(dateTimeString.replace(" ", "T") + "Z");
    const isoString = dateObject.toISOString();
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(isoString));
  };

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-3">
      <div className="flex gap-10 h-11 justify-between items-start">
        <div className="max-w-full flex flex-col">
          <div className="font-HelveticaNeue font-normal text-xs leading-4 tracking-tight text-light_finance-textsub overflow-hidden text-ellipsis whitespace-nowrap w-32 text-truncate">
            {`${
              loanDetails?.loan_offer?.loans?.interest_rate_type ===
              InterestRateType.ADJUSTABLE_RATE
                ? t("process.loanDetail.adjustType")
                : t("process.loanDetail.fixType")
            }`}
          </div>
          <div className="font-HelveticaNeue font-bold text-lg leading-7 text-light_finance-textbody overflow-hidden text-ellipsis whitespace-nowrap">
            {loanDetails?.loan_offer?.loans?.name}
          </div>
        </div>
        <div>
          {isShowButton && (
            <button
              onClick={handleSubmit}
              disabled={loanDetails?.meeting?.state === MeetingStatus.REJECT}
              className={`w-[86px] h-9 px-4 py-2 rounded-lg justify-center items-center gap-1 inline-flex ${
                loanDetails?.meeting?.state === MeetingStatus.CONNECT
                  ? "bg-light_finance-primary"
                  : loanDetails?.meeting?.state === MeetingStatus.PENDING
                    ? "bg-[#FFE9C9]"
                    : loanDetails?.meeting?.state === MeetingStatus.REJECT
                      ? "bg-[#FFD4D8]"
                      : ""
              }`}
            >
              <div
                className={`text-center text-sm font-medium font-['Helvetica Neue'] leading-tight ${
                  loanDetails?.meeting?.state === MeetingStatus.CONNECT
                    ? "text-white"
                    : loanDetails?.meeting?.state === MeetingStatus.PENDING
                      ? "text-[#FFA621]"
                      : loanDetails?.meeting?.state === MeetingStatus.REJECT
                        ? "text-[#F65160]"
                        : ""
                }`}
              >
                {loanDetails?.meeting?.state === MeetingStatus.CONNECT
                  ? t("consulting.connect")
                  : loanDetails?.meeting?.state === MeetingStatus.PENDING
                    ? t("consulting.pending")
                    : loanDetails?.meeting?.state === MeetingStatus.REJECT
                      ? "Rejct"
                      : ""}
              </div>
            </button>
          )}

          {isSetting && (
            <button
              className="w-6 h-6 relative cursor-pointer"
              onClick={toggleDropdown}
              disabled={loanDetails?.meeting.state === MeetingStatus.REJECT}
            >
              <i className="fa-solid fa-ellipsis-vertical fa-lg px-2"></i>
            </button>
          )}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute mt-2 "
            >
              <div className="py-2 text-sm text-gray-700 ">
                <button
                  className="px-4 py-2 hover:bg-gray-300 w-full flex items-center"
                  data-hs-overlay="#booking-modal"
                  onClick={() => {
                    setCurrent(loanDetails);
                  }}
                >
                  <i className="fas fa-edit mr-4"></i>
                  {t("consulting.edit")}
                </button>
                <button
                  className=" px-4 py-2 hover:bg-gray-300 w-full flex items-center"
                  onClick={handleDeleteClick}
                  data-hs-overlay={`#modal_${loanDetails?.meeting?.id}`}
                >
                  <i className="fas fa-trash-alt mr-4"></i>
                  {t("consulting.delete")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-6 flex justify-between">
        <div className="flex gap-[2px]">
          <img className="h-5 w-5" src={calendar} />
          <div> {loanDetails?.meeting?.date_meeting}</div>
        </div>

        <div className="flex gap-[2px] w-[170px]">
          <img className="h-5 w-5" src={timer} />
          <div>
            {loanDetails?.meeting?.start_time &&
            loanDetails?.meeting?.end_time ? (
              <>
                {formatDate(loanDetails?.meeting?.start_time)} to{" "}
                {formatDate(loanDetails?.meeting?.end_time)}
              </>
            ) : (
              t("consulting.notAvailable")
            )}
          </div>
        </div>
      </div>

      <AlertModal
        id={`modal_${loanDetails?.meeting?.id}`}
        title={t("consulting.consulting")}
        content={t("consulting.comfirmDelete")}
        submitLabel={t("consulting.delete")}
        cancelLabel={t("survey.submit_modal_close")}
        handleSubmit={() => {
          if (handleDelete && loanDetails?.meeting?.id !== undefined) {
            handleDelete(loanDetails.meeting.id);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ConsultingMeetingItem;
