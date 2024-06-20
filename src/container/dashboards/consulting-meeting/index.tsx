import { useNavigate, useParams } from "react-router-dom";
import bg1 from "@assets/images/authentication/1.svg";
import MeetingFilter from "./MeetingFilter";
import { useTranslation } from "react-i18next";
import useWindowWidth from "@components/hook/useWindowWidth";
import MeetingItem from "./ConsultingItem";
import api from "@api/axios";
import { useEffect, useState } from "react";
import ConsultingMeetingItem from "./ConsultingMeetingItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import Loader from "@components/common/loader";
import { useLoading } from "@redux/useSelector";
import BookingModal from "../process/bookingModal";
import { ConsultingMeeting } from "@type/types";
import { toast } from "react-toastify";

function MeetingIndex() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const [loanData, setLoanData] = useState<ConsultingMeeting[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { loanId } = useParams();
  const isLoading = useLoading();
  const [current, setCurrent] = useState<ConsultingMeeting>();

  const fetchDataMeeting = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get("/meeting/");
      if (response.status === 200) setLoanData(response.data.data);
    } catch (error) {}
    dispatch(setLoadingFalse());
  };

  const fetchDataMeetingUser = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/meeting/submit/${loanId}`);
      setLoanData(response.data.data);
    } catch (error) {}
    dispatch(setLoadingFalse());
  };

  const handleDeleteMeeting = async (id: number) => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.delete(`/meeting/${id}/delete`);
      if (response.status === 200) {
        toast.success("Deleted meeting successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to delete meeting!");
    }
    dispatch(setLoadingFalse());
  };

  useEffect(() => {
    if (loanId) fetchDataMeetingUser();
    else fetchDataMeeting();
  }, [loanId]);

  if (isLoading) return <Loader />;

  return (
    <>
      <BookingModal meetingData={current} />
      {windowWidth >= 910 ? (
        <div className="min-h-screen relative ">
          <div className="mx-6 pt-7">
            <div className="flex flex-col my-7">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-danger rounded-sm" />
                  <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                    {t("consulting.consulting")}
                  </div>
                </div>
                <MeetingFilter />
              </div>
            </div>
            <div className="">
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
        </div>
      ) : (
        <div className="min-h-screen relative overflow-hidden">
          <div className="z-10 relative mx-6 pt-7">
            <div className="flex md:hidden items-center justify-between">
              <div className="flex gap-3 md:gap-2 items-center">
                <i
                  className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
                  onClick={() => {
                    navigate("/");
                  }}
                ></i>
                <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
                  {t("consulting.consulting")}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 my-7">
              <div className="w-full flex items-center justify-between">
                <div className="md:flex items-center gap-2 hidden">
                  <div className="w-1 h-5 bg-danger rounded-sm" />
                  <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                    {t("consulting.consulting")}
                  </div>
                </div>
                <MeetingFilter />
              </div>
              {loanData?.map((loan, index) => {
                return (
                  <ConsultingMeetingItem
                    loanDetails={loan}
                    key={index}
                    handleDelete={handleDeleteMeeting}
                    isSetting
                    setCurrent={setCurrent}
                  />
                );
              })}
            </div>
          </div>
          <div className="absolute w-full sm:hidden top-[-1.5rem]">
            {[...Array(Math.ceil(window.innerHeight / 987) + 1)].map(
              (_, index) => (
                <img
                  key={index}
                  className="w-full bg-cover bg-center"
                  src={bg1}
                  alt=""
                />
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MeetingIndex;
