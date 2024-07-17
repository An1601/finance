import React from "react";
import { BankRecordItemType } from "@type/types";
import { LoanStatus } from "@type/enum";
import calendar from "@assets/icon/CalendarIcon.svg";
import { useTranslation } from "react-i18next";
import { formatCreditLimit } from "@constant/Constant";
import { useUser } from "@redux/useSelector";

const BankRecordItem: React.FC<{
  recordItem: BankRecordItemType;
}> = ({ recordItem }) => {
  const { t } = useTranslation();
  const user = useUser();

  return (
    <a
      href={`/bank/process/loan-form-submit?loanId=${recordItem.loan_id}&recordId=${recordItem.id}&formId=${recordItem.application_form_id}`}
      className="p-4 bg-white rounded-xl w-full flex flex-col md:flex-row md:justify-between gap-3"
    >
      <div className="flex gap-2 max-w-[85%] md:max-w-[30%]">
        <img
          src={
            user.business_profile?.thumbnail ??
            "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
          }
          className="h-[44px] min-w-[44px] xl:h-[4.5rem] xl:min-w-[4.5rem] rounded-full overflow-hidden"
        />
        <div className="max-w-full flex flex-col justify-center">
          <div className="font-HelveticaNeue font-normal text-xs md:text-sm leading-4 tracking-tight text-light_finance-textsub text-truncate">
            {user.business_profile?.name}
          </div>
          <div className="font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate">
            {recordItem?.loan_name}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full flex max-[400px]:flex-col justify-end items-end md:items-center gap-3 lg:gap-8 xxl:gap-20">
        <div className="w-full md:w-fit flex flex-col justify-center-center lg:items-end gap-3">
          <div className="flex items-center gap-4 max-[415px]:gap-2">
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                ${formatCreditLimit(recordItem?.credit_limit)}
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("home.creditLimit")}
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {recordItem?.interest_rate}%
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("consulting.rate")}
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {recordItem?.origination_fee}%
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("process.loanDetail.originalFee")}
              </div>
            </div>
          </div>
          <div className="lg:flex hidden gap-1">
            <img className="h-5 w-5" src={calendar} />
            <div>{recordItem?.time_submit}</div>
          </div>
        </div>
        {(() => {
          switch (recordItem?.state) {
            case LoanStatus.APPROVED:
              return (
                <div className="bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
                  <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-[10px] leading-4 px-2 py-[2px] whitespace-nowrap">
                    {t("packageLoanList.approval")}
                  </div>
                </div>
              );
            case LoanStatus.INPROGRESS:
              return (
                <div className="bg-[#D9E8FF] rounded-sm inline-flex items-center justify-center">
                  <div className="text-center font-HelveticaNeue font-medium text-[#408CFF] text-[10px] leading-4 px-2 py-[2px] whitespace-nowrap">
                    {t("packageLoanList.inProgress")}
                  </div>
                </div>
              );
            case LoanStatus.REJECT:
              return (
                <div className="bg-[#FFD4D8] rounded-sm inline-flex items-center justify-center">
                  <div className="text-center font-HelveticaNeue font-medium text-[#F65160] text-[10px] leading-4 px-2 py-[2px] whitespace-nowrap">
                    {t("packageLoanList.reject")}
                  </div>
                </div>
              );
          }
        })()}
      </div>
    </a>
  );
};

export default BankRecordItem;
