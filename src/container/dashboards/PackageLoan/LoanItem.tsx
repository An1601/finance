import React from "react";
import { LoanDetails } from "../../../type/types";
import MobileHomeBtn from "../../../components/common/button/MobileHomeBtn";

const LoanItem: React.FC<{ loan: LoanDetails }> = ({ loan }) => {
  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-3">
      <div className="flex gap-10 h-11 justify-between items-start">
        <div className="flex gap-2">
          <img
            src={loan.bank_thumbnail}
            className="h-11 w-11 rounded-full overflow-hidden"
          />
          <div className="flex flex-col">
            <div className="font-HelveticaNeue font-normal text-xs leading-4 tracking-tight text-light_finance-textsub">
              {loan.bank_name}
            </div>
            <div className="font-HelveticaNeue font-bold text-lg leading-7 text-light_finance-textbody">
              {loan.loan_name}
            </div>
          </div>
        </div>
        <MobileHomeBtn name="Submit" />
      </div>
      <div className="h-6 justify-start items-center gap-3 inline-flex">
        <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex">
          <div className="justify-start items-center gap-1 flex">
            <div className="text-light_finance-textbody text-xs font-bold font-['Helvetica Neue'] leading-none tracking-tight">
              ${loan.credit_limit}
            </div>
            <div className="text-light_finance-textsub text-[10px] font-normal font-['Helvetica Neue'] leading-none tracking-tight">
              Credit limit
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex">
          <div className="text-light_finance-textbody text-xs font-bold font-['Helvetica Neue'] leading-none tracking-tight">
            {loan.rate_month}%
          </div>
          <div className="text-light_finance-textsub text-[10px] font-normal font-['Helvetica Neue'] leading-none tracking-tight">
            Rate/ Month
          </div>
        </div>
        <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex">
          <div className="text-light_finance-textbody text-xs font-bold font-['Helvetica Neue'] leading-none tracking-tight">
            {loan.APR}%
          </div>
          <div className="text-light_finance-textsub text-[10px] font-normal font-['Helvetica Neue'] leading-none tracking-tight">
            APR
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanItem;
