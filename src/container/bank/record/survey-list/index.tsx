import bg1 from "@assets/images/authentication/1.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import BankSurveyItem from "./BankSurveyItem";
import BankSurveyFilter from "./SurveyFilter";
import api from "@api/axios";
import { toast } from "react-toastify";
import ProfileHeader from "@components/common/header/ProfileHeader";
import Notification from "@components/common/header/Notification";
import BankTabHeader from "@components/common/bank-tab-header";

const SurveyBankIndex = () => {
  const { t } = useTranslation();
  const [surveyList, setSurveyList] = useState<BankSurveyItem[]>([]);
  const { isLoading, toggleLoading } = useLoading();

  const handleGetLoanDetail = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/bank/surveys");
      if (response.status === 200) {
        console.log(response.data.data);
        setSurveyList(response.data.data);
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    handleGetLoanDetail();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 py-8">
        <div className="flex flex-col gap-8 sm:gap-5">
          <div className="flex sm:hidden justify-between">
            <ProfileHeader />
            <Notification />
          </div>
          <div className="w-full flex flex-col gap-4 md:flex-row md:gap-0 items-center justify-between">
            <div className="w-full hidden sm:flex items-center gap-2">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                {t("packageLoanList.packageLoanList")}
              </div>
            </div>
            <BankSurveyFilter />
          </div>
          <BankTabHeader />
          <div className="flex flex-col gap-3">
            {surveyList.map((loanitem, index) => {
              return <BankSurveyItem key={index} surveyItem={loanitem} />;
            })}
          </div>
        </div>
      </div>
      <div className="absolute w-full sm:hidden top-[-1.5rem]">
        {[...Array(Math.ceil(window.innerHeight / 987) + 1)].map((_, index) => (
          <img
            key={index}
            className="w-full bg-cover bg-center"
            src={bg1}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default SurveyBankIndex;
