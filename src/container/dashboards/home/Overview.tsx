import arrow from "../../../assets/icon/ArrowIcon.svg";
import loanApproval from "../../../assets/icon/LoanApprovalIcon.svg";
import loanRejected from "../../../assets/icon/LoanRejected.svg";
import loanInProgress from "../../../assets/icon/LoanInProgress.svg";

function Overview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 sm:hidden">
        <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
        <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
          Overview
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-5 my-0 sm:my-[1.5rem] page-header-breadcrumb">
        <div className="md:col-span-4 col-span-12 bg-white rounded-lg px-5 py-4 flex justify-between items-center">
          <div className="h-12 flex items-center">
            <img className="h-11 w-11" src={loanApproval} />
            <div className="flex flex-col ml-4">
              <div className="font-HelveticaNeue font-bold text-2xl text-light_finance-textbody">
                {12}
              </div>
              <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-textbody">
                Total Approval
              </div>
            </div>
          </div>
          <img src={arrow} alt="arrow" />
        </div>
        <div className="md:col-span-4 col-span-12 bg-white rounded-lg px-5 py-4 flex justify-between items-center">
          <div className="h-12 flex items-center">
            <img className="h-11 w-11" src={loanInProgress} />
            <div className="flex flex-col ml-4">
              <div className="font-HelveticaNeue font-bold text-2xl text-light_finance-textbody">
                {12}
              </div>
              <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-textbody">
                Total In Progress
              </div>
            </div>
          </div>
          <img src={arrow} alt="arrow" />
        </div>
        <div className="md:col-span-4 col-span-12 bg-white rounded-lg px-5 py-4 flex justify-between items-center">
          <div className="h-12 flex items-center">
            <img className="h-11 w-11" src={loanRejected} />
            <div className="flex flex-col ml-4">
              <div className="font-HelveticaNeue font-bold text-2xl text-light_finance-textbody">
                {12}
              </div>
              <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-textbody">
                Total Reject
              </div>
            </div>
          </div>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
}

export default Overview;
