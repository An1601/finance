import { Fragment } from "react";
import Overview from "./Overview";
import TopLoans from "./TopLoans";
import PackageLoanList from "../PackageLoan/PackageLoanList";
import ConsultingMeetingList from "../ConsultingMeeting/ConsultingMeetingList";
import BottomBarCustom from "@components/common/bottomBar";
import { useNavigate } from "react-router-dom";
import { loanDetails } from "../PackageLoan/LoanListData";
import ProfileHeader from "@components/common/header/ProfileHeader";
import Notification from "@components/common/header/Notification";
import SearchBar from "@components/common/header/SearchBar";
import { useTranslation } from "react-i18next";

const HomeMobile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="mx-6 my-7  flex flex-col gap-8">
        <div className="h-fit flex flex-col gap-5">
          <div className="flex justify-between">
            <ProfileHeader />
            <Notification />
          </div>
          <SearchBar isEnable={false} />
        </div>
        <TopLoans />
        <Overview />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 sm:hidden">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                {t("home.packageLoansList")}
              </div>
            </div>
            <div
              className="font-HelveticaNeue font-normal text-base leading-6 tracking-tighter underline text-light_finance-primary"
              onClick={() => {
                navigate("/loan-list");
              }}
            >
              {t("home.viewAll")}
            </div>
          </div>
          <div className=" my-0 sm:my-[1.5rem]">
            <PackageLoanList loanDetails={loanDetails} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 sm:hidden">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                {t("home.consulting")}
              </div>
            </div>
            <div
              className="font-HelveticaNeue font-normal text-base leading-6 tracking-tighter underline text-light_finance-primary"
              onClick={() => {
                navigate("/meeting");
              }}
            >
              {t("home.viewAll")}
            </div>
          </div>
          <div className=" my-0 sm:my-[1.5rem]">
            <ConsultingMeetingList />
          </div>
        </div>
        <BottomBarCustom />
      </div>
    </Fragment>
  );
};

export default HomeMobile;
