import bg1 from "@assets/images/authentication/1.svg";
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
import BottomBarCustom from "@components/common/bottom-bar";
import { BankSurveyItemType } from "@type/types";

const SurveyBankIndex = () => {
  const { t } = useTranslation();
  const [surveyList, setSurveyList] = useState<BankSurveyItemType[]>([]);
  const { isLoading, toggleLoading } = useLoading();

  const handleGetSurveys = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/bank/surveys");
      if (response.status === 200) {
        setSurveyList(response.data.data);
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    handleGetSurveys();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BottomBarCustom />
      <div className=" z-10 relative mx-6 py-7">
        <div className="flex flex-col gap-8 sm:gap-5">
          <div className="flex sm:hidden justify-between">
            <ProfileHeader />
            <Notification />
          </div>
          <div className="w-full flex flex-col gap-6 md:flex-row md:gap-0 items-center justify-between">
            <div className="hidden gap-3 items-center md:flex">
              <div className="sm:block hidden w-1 h-5 bg-danger rounded-sm" />
              <div className="flex gap-2 items-center">
                <span className="text-center text-light_finance-textbody text-xl font-bold font-HelveticaNeue leading-8">
                  {t("sideBar.record")}
                </span>
                <i className="fa-solid fa-angles-right fa-lg"></i>
                <span className="text-sm text-light_finance-textsub font-normal font-HelveticaNeue">
                  {t("sideBar.surveyList")}
                </span>
              </div>
            </div>
            <BankTabHeader />
            <BankSurveyFilter />
          </div>
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
