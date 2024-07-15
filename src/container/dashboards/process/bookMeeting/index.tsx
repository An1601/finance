import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "@api/axios";
import { useEffect, useState } from "react";
import Loader from "@components/common/loader";
import { ConsultingMeeting } from "@type/types";
import { toast } from "react-toastify";
import BookingModal from "../bookingModal";
import Warning from "@assets/icon/Warning.svg";
import { Status, StatusProcess } from "@type/enum";
import MeetingItem from "./ConsultingItem";
import { useLoading } from "@components/hook/useLoading";
import { useProcess } from "@redux/useSelector";

function Meeting() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState<ConsultingMeeting[]>([]);
  const { loanId } = useParams();
  const { isLoading, toggleLoading } = useLoading();
  const [current, setCurrent] = useState<ConsultingMeeting>();
  const check = useProcess();

  const fetchDataMeeting = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/meeting/");
      if (response.status === 200) setLoanData(response.data.data);
    } catch (error) {}
    toggleLoading(false);
  };

  const fetchDataMeetingUser = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/meeting/submit/${loanId}`);
      setLoanData(response.data.data);
    } catch (error) {}
    toggleLoading(false);
  };

  const handleDeleteMeeting = async (id: number) => {
    toggleLoading(true);
    try {
      const response = await api.delete(`/meeting/${id}/delete`);
      if (response.status === 200) {
        toast.success(t("consulting.deleteSuccess"));
        document.body.style.overflow = "";
        navigate("/loan-list");
      }
    } catch (error) {
      toast.error(t("consulting.failedDelete"));
    }
    toggleLoading(false);
  };

  useEffect(() => {
    loanId ? fetchDataMeetingUser() : fetchDataMeeting();
  }, [loanId]);

  if (isLoading) return <Loader />;

  return (
    <>
      <BookingModal
        meetingData={current}
        reFetchMeeeting={loanId ? fetchDataMeetingUser : fetchDataMeeting}
      />
      <div className="min-h-screen relative ">
        <div className="mx-6 pt-7">
          <div className="flex justify-between items-center">
            <div className="bg-[#E7FFFC] px-3 py-2 bg-cyan-50 rounded-lg justify-start items-center gap-3 inline-flex my-5">
              <div className="w-6 h-6">
                <img src={Warning} />
              </div>
              <div className="text-[16px] font-normal font-Helvetica Neue leading-tight text-light_finance-primary">
                {check.current_step === StatusProcess.BOOK_MEETING &&
                check.status === Status.APPROVAL
                  ? t("process.bookMeeting.notiConnect")
                  : check.current_step === StatusProcess.BOOK_MEETING &&
                      check.status === Status.SUBMITED
                    ? t("process.bookMeeting.notiPending")
                    : check.current_step === StatusProcess.BOOK_MEETING &&
                        check.status === Status.REJECTED
                      ? t("process.bookMeeting.notiReject")
                      : t("process.bookMeeting.compleMeeting")}
              </div>
            </div>
          </div>
          {loanData?.map((loan, index) => {
            return (
              <MeetingItem
                key={index}
                loanDetails={loan}
                handleDelete={handleDeleteMeeting}
                setCurrent={setCurrent}
                isShowButton={
                  check.current_step === StatusProcess.BOOK_MEETING
                    ? true
                    : false
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Meeting;
