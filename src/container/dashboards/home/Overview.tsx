import loanApproval from "@assets/icon/LoanApprovalIcon.svg";
import loanRejected from "@assets/icon/LoanRejected.svg";
import loanInProgress from "@assets/icon/LoanInProgress.svg";
import { useTranslation } from "react-i18next";
import { useUser } from "@redux/useSelector";
import { RecordItemType } from "@type/types";
import { LoanStatus } from "@type/enum";

const Overview = ({ records }: { records: RecordItemType[] }) => {
  const { t } = useTranslation();
  const user = useUser();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 sm:hidden">
        <div className="w-1 h-5 bg-danger rounded-sm" />
        <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
          {t("home.overview")}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-5 my-0 sm:my-[1.5rem] page-header-breadcrumb">
        <div className="md:col-span-4 col-span-12 bg-white rounded-lg px-5 py-4 flex justify-between items-center">
          <div className="h-12 flex items-center">
            <img className="h-11 w-11" src={loanApproval} />
            <div className="flex flex-col ml-4">
              <div className="font-HelveticaNeue font-bold text-2xl text-light_finance-textbody">
                {user.check_submit
                  ? records.filter((item) => item.state === LoanStatus.APPROVED)
                      .length
                  : "0"}
              </div>
              <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-textbody">
                {t("home.totalApproval")}
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-up hidden sm:block rotate-90 fa-xl"></i>
        </div>
        <div className="md:col-span-4 col-span-12 bg-white rounded-lg px-5 py-4 flex justify-between items-center">
          <div className="h-12 flex items-center">
            <img className="h-11 w-11" src={loanInProgress} />
            <div className="flex flex-col ml-4">
              <div className="font-HelveticaNeue font-bold text-2xl text-light_finance-textbody">
                {user.check_submit
                  ? records.filter(
                      (item) => item.state === LoanStatus.INPROGRESS,
                    ).length
                  : "0"}
              </div>
              <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-textbody">
                {t("home.totalProgress")}
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-up hidden sm:block rotate-90 fa-xl"></i>
        </div>
        <div className="md:col-span-4 col-span-12 bg-white rounded-lg px-5 py-4 flex justify-between items-center">
          <div className="h-12 flex items-center">
            <img className="h-11 w-11" src={loanRejected} />
            <div className="flex flex-col ml-4">
              <div className="font-HelveticaNeue font-bold text-2xl text-light_finance-textbody">
                {user.check_submit
                  ? records.filter((item) => item.state === LoanStatus.REJECT)
                      .length
                  : "0"}
              </div>
              <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-textbody">
                {t("home.totalReject")}
              </div>
            </div>
          </div>
          <i className="fa-solid fa-chevron-up hidden sm:block rotate-90 fa-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Overview;
