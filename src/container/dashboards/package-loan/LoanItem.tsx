import React from "react";
import { LoanListItemType } from "@type/types";
import { LoanStatus } from "@type/enum";
import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import calendar from "@assets/icon/CalendarIcon.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoanItem: React.FC<{ loan: LoanListItemType }> = ({ loan }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-xl flex max-[400px]:flex-col justify-between max-[375px]:justify-center items-end md:items-center gap-3 md:gap-8 lg:gap-20">
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex gap-2">
          <img
            src={loan.bank_thumbnail}
            className="h-11 w-11 xl:h-[4.5rem] xl:w-[4.5rem] rounded-full overflow-hidden"
          />
          <div className="max-w-full flex flex-col justify-center">
            <div className="font-HelveticaNeue font-medium text-[10px] md:text-xs leading-4 text-light_finance-primary text-truncate">
              {loan.project.name}
            </div>
            <div className="font-HelveticaNeue font-normal text-xs md:text-sm leading-4 tracking-tight text-light_finance-textsub text-truncate">
              {loan.bank.name}
            </div>
            <div className="max-w-full font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate">
              {loan.loan_name}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center-center lg:items-end gap-3 ">
          <div className="flex items-center gap-4 max-[415px]:gap-2">
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col md:flex-row lg:flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                ${loan.credit_limit}
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                Credit limit
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col md:flex-row lg:flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {loan.rate_month}%
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                Rate
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col md:flex-row lg:flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {loan.origination_fee}%
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                Origination fee
              </div>
            </div>
          </div>
          <div className="lg:flex hidden gap-1">
            <img className="h-5 w-5" src={calendar} />
            <div>24,Oct 2024</div>
          </div>
        </div>
      </div>
      {(() => {
        switch (loan.state) {
          case LoanStatus.APPROVED:
            return (
              <div className="h-5 w-[66px] bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
                <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-[10px] leading-4">
                  {t("packageLoanList.approval")}
                </div>
              </div>
            );
          case LoanStatus.INPROGRESS:
            return (
              <div className="h-5 w-[66px] bg-[#D9E8FF] rounded-sm inline-flex items-center justify-center">
                <div className="text-center font-HelveticaNeue font-medium text-[#408CFF] text-[10px] leading-4">
                  {t("packageLoanList.inProgress")}
                </div>
              </div>
            );
          case LoanStatus.REJECT:
            return (
              <div className="h-5 w-[66px] bg-[#FFD4D8] rounded-sm inline-flex items-center justify-center">
                <div className="text-center font-HelveticaNeue font-medium text-[#F65160] text-[10px] leading-4">
                  {t("packageLoanList.reject")}
                </div>
              </div>
            );
          default:
            return (
              <MobileHomeBtn
                name="Submit"
                handleSubmit={() => navigate(`/loan/${loan.id}`)}
              />
            );
        }
      })()}
    </div>
  );
};

export default LoanItem;
