import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "@api/axios";
import { useEffect, useState } from "react";
import Loader from "@components/common/loader";
import { ConsultingMeeting, StatusCheck } from "@type/types";
import { toast } from "react-toastify";
import BookingModal from "../bookingModal";
import Warning from "@assets/icon/Warning.svg";
import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import MeetingItem from "../bookMeeting/ConsultingItem";
import { StatusProcess } from "@type/enum";
import { useLoading } from "@components/hook/useLoading";

function CompeleteBookMeeting() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState<ConsultingMeeting[]>([]);
  const { loanId } = useParams();
  const { isLoading, toggleLoading } = useLoading();
  const [current, setCurrent] = useState<ConsultingMeeting>();
  const [check, setCheck] = useState<StatusCheck>();

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
        if (loanId) fetchDataMeetingUser();
        else fetchDataMeeting();
      }
    } catch (error) {
      toast.error(t("consulting.failedDelete"));
    }
    toggleLoading(false);
  };

  const fetchCheck = async () => {
    toggleLoading(true);
    try {
      const response = await api.post(`/list-loans-submit/process/${loanId}`);
      if (response.status === 200) {
        setCheck(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    fetchDataMeetingUser();
    fetchCheck();
  }, [check?.current_step]);

  const handleLoanForm = () => {
    check?.current_step === StatusProcess.LOAN_ASSIGN
      ? navigate(`/loan-submit/${loanId}`)
      : toast.warning("Wait for application form to be sent");
  };

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
                {t("process.bookMeeting.compleMeeting")}
              </div>
            </div>
            <MobileHomeBtn name="Check" handleSubmit={handleLoanForm} />
          </div>
          {loanData?.map((loan, index) => {
            return (
              <MeetingItem
                key={index}
                loanDetails={loan}
                handleDelete={handleDeleteMeeting}
                setCurrent={setCurrent}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CompeleteBookMeeting;