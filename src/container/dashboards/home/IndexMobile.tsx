import { FC, Fragment } from "react";
import HeaderMobile from "../../../components/common/header/IndexMobile";
import Overview from "./Overview";
import TopLoans from "./TopLoans";
import PackageLoanList from "../PackageLoan/PackageLoanList";
import ConsultingMeetingList from "../ConsultingMeeting/ConsultingMeetingList";
import BottomBarCustom from "../../../components/common/bottomBar";
import { useNavigate } from "react-router-dom";
import { loanDetails } from "../PackageLoan/LoanListData";

interface CrmProps {}

const HomeMobile: FC<CrmProps> = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="mx-6 my-[75px]  flex flex-col gap-8">
        <HeaderMobile />
        <TopLoans />
        <Overview />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 sm:hidden">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                Package loans list
              </div>
            </div>
            <div
              className="font-HelveticaNeue font-normal text-base leading-6 tracking-tighter underline text-light_finance-primary"
              onClick={() => {
                navigate("/loan-list");
              }}
            >
              View all
            </div>
          </div>
          <div className=" my-0 sm:my-[1.5rem]">
            <PackageLoanList loanDetails={loanDetails} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 sm:hidden">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                Consulting meeting list
              </div>
            </div>
            <div className="font-HelveticaNeue font-normal text-base leading-6 tracking-tighter underline text-light_finance-primary">
              View all
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
