import { Link } from "react-router-dom";
import { Sourcedata } from "./indexData";

function StateLoansChart() {
  return (
    <div className="xxl:col-span-12 xl:col-span-12  col-span-12">
      <div className="box">
        <div className="sm:px-5 sm:py-6 sm:border-b-[1px] sm:border-stroke flex justify-between items-center">
          <div className="flex items-center gap-2 ">
            <div className="w-1 h-5 bg-danger rounded-sm" />
            <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
              State package loans
            </div>
          </div>
        </div>
        <div className="box-body overflow-hidden">
          <div className="leads-source-chart flex items-center justify-center">
            <Sourcedata />
            <div className="lead-source-value ">
              <span className="block text-[0.875rem] ">Total</span>
              <span className="block text-[1.5625rem] font-bold">4,145</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-dashed dark:border-defaultborder/10">
          <div className="col !p-0">
            <div className="!pe-4 p-[0.95rem] text-center">
              <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend tablet inline-block">
                Approval
              </span>
              <div>
                <span className="text-[1rem]  font-semibold">679</span>
              </div>
            </div>
          </div>
          <div className="col !p-0">
            <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
              <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">
                In Progress
              </span>
              <div>
                <span className="text-[1rem]  font-semibold">1,267</span>
              </div>
            </div>
          </div>
          <div className="col !p-0">
            <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
              <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend laptop inline-block">
                Reject
              </span>
              <div>
                <span className="text-[1rem]  font-semibold">1,153</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateLoansChart;
