import { FC, Fragment } from "react";
import HeaderMobile from "../../../components/common/header/IndexMobile";
import Overview from "./Overview";
import TopLoans from "./TopLoans";
import PackageLoanList from "../PackageLoan/PackageLoanList";
import ConsultingMeetingList from "../ConsultingMeeting/ConsultingMeetingList";

interface CrmProps {}

const HomeMobile: FC<CrmProps> = () => {
  return (
    <Fragment>
      <div className="mx-6 flex flex-col gap-8">
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
            <div className="font-HelveticaNeue font-normal text-base leading-6 tracking-tighter underline text-light_finance-primary">
              View all
            </div>
          </div>
          <div className=" my-0 sm:my-[1.5rem]">
            <PackageLoanList />
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
      </div>
    </Fragment>
  );
};

export default HomeMobile;
