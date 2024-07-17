import bg1 from "@assets/images/authentication/1.svg";
import Notification from "@components/common/header/Notification";
import ProfileHeader from "@components/common/header/ProfileHeader";
import SearchBar from "@components/common/header/SearchBar";
import TotalDisbursements from "./TotalDisbursements";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BankLoanItemType, BankSurveyItemType } from "@type/types";
import BankSurveyItem from "../record/survey-list/BankSurveyItem";
import BottomBarCustom from "@components/common/bottom-bar";
import BankLoanItem from "../record/package-loan/BankLoanItem";

interface BankMobileHomeProps {
  loans: BankLoanItemType[];
  surveyList: BankSurveyItemType[];
  handleGetLoans: () => Promise<void>;
}

const BankMobileHome = ({
  loans,
  surveyList,
  handleGetLoans,
}: BankMobileHomeProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div className="w-full z-10 relative">
        <BottomBarCustom />
        <div className="mx-6 py-7 flex flex-col gap-6">
          <div className="h-fit flex flex-col gap-5">
            <div className="flex justify-between">
              <ProfileHeader />
              <Notification />
            </div>
            <SearchBar isEnable={false} />
          </div>
          <div className="flex flex-col gap-8">
            <TotalDisbursements />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 sm:hidden">
                  <div className="w-1 h-5 bg-danger rounded-sm" />
                  <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                    {t("sideBar.applyLoanList")}
                  </div>
                </div>
                <div
                  className="font-HelveticaNeue font-normal text-base leading-6 underline text-light_finance-primary"
                  onClick={() => {
                    navigate("/bank/loan-list");
                  }}
                >
                  {t("home.viewAll")}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {loans?.map((loanitem, index) => {
                  return (
                    <BankLoanItem
                      key={index}
                      loanItem={loanitem}
                      refetchLoans={handleGetLoans}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 sm:hidden">
                  <div className="w-1 h-5 bg-danger rounded-sm" />
                  <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                    {t("sideBar.surveyList")}
                  </div>
                </div>
                <div
                  className="font-HelveticaNeue font-normal text-base leading-6 underline text-light_finance-primary"
                  onClick={() => {
                    navigate("/bank/survey-list");
                  }}
                >
                  {t("home.viewAll")}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {surveyList?.map((survey, index) => {
                  return <BankSurveyItem key={index} surveyItem={survey} />;
                })}
              </div>
            </div>
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

export default BankMobileHome;
