import { Fragment } from "react";
import Overview from "./Overview";
import PackageLoanList from "../package-loan/PackageLoanList";
import ConsultingMeetingList from "../consulting-meeting/ConsultingMeetingList";
import BottomBarCustom from "@components/common/bottom-bar";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "@components/common/header/ProfileHeader";
import Notification from "@components/common/header/Notification";
import SearchBar from "@components/common/header/SearchBar";
import { useTranslation } from "react-i18next";
import HomeProject from "../project/HomeProject";
import {
  ConsultingMeeting,
  LoanItemType,
  ProjectItemType,
  RecordItemType,
} from "@type/types";

interface UserMobileHomeProps {
  userProjects: ProjectItemType[];
  records: RecordItemType[];
  loanList: LoanItemType[];
  meetingList: ConsultingMeeting[];
}

const HomeMobile = ({
  userProjects,
  records,
  loanList,
  meetingList,
}: UserMobileHomeProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="mx-6 my-7 flex flex-col gap-8">
        <div className="h-fit flex flex-col gap-5">
          <div className="flex justify-between">
            <ProfileHeader />
            <Notification />
          </div>
          <SearchBar isEnable={false} />
        </div>
        <HomeProject projects={userProjects} />
        <Overview records={records} />
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
            <PackageLoanList loanDetails={loanList} />
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
            <ConsultingMeetingList loanData={meetingList} />
          </div>
        </div>
        <BottomBarCustom />
      </div>
    </Fragment>
  );
};

export default HomeMobile;
