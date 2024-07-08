import React from "react";
import { LoanItemType, RecordItemType } from "@type/types";
import { LoanStatus, LoanSubmitState } from "@type/enum";
import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import calendar from "@assets/icon/CalendarIcon.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatCreditLimit } from "@constant/Constant";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { handleSetIdRecord } from "@redux/processReducer";

const LoanItem: React.FC<{ loanItem: LoanItemType | RecordItemType }> = ({
  loanItem,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const checkLoanItemType = (object: any): object is LoanItemType => {
    return typeof object === "object" && "survey_answer_id" in object;
  };
  const isLoanItemType = checkLoanItemType(loanItem);

  return (
    <div className="p-4 bg-white rounded-xl w-full flex flex-col md:flex-row md:justify-between gap-3">
      <div className="flex gap-2 max-w-[85%] md:max-w-[30%]">
        <img
          src={
            isLoanItemType
              ? loanItem?.loans?.bank.thumbnail ??
                "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
              : loanItem?.loan_offer?.loans?.user?.bank?.thumbnail ??
                "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
          }
          className="h-[44px] min-w-[44px] xl:h-[4.5rem] xl:min-w-[4.5rem] rounded-full overflow-hidden"
        />
        <div className="max-w-full flex flex-col justify-center">
          <div className="font-HelveticaNeue font-medium text-[10px] md:text-xs leading-4 text-light_finance-primary text-truncate">
            {isLoanItemType
              ? loanItem?.survey_answers?.property_address[0]
              : loanItem?.loan_offer?.survey_answers?.property_address[0]}
          </div>
          <div className="font-HelveticaNeue font-normal text-xs md:text-sm leading-4 tracking-tight text-light_finance-textsub text-truncate">
            {isLoanItemType
              ? loanItem?.loans?.bank?.name
              : loanItem?.loan_offer?.loans?.user?.bank?.name}
          </div>
          <div className="font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate">
            {isLoanItemType
              ? loanItem?.loans?.name
              : loanItem?.loan_offer?.loans?.name}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full flex max-[400px]:flex-col justify-end items-end md:items-center gap-3 lg:gap-8 xxl:gap-20">
        <div className="w-full md:w-fit flex flex-col justify-center-center lg:items-end gap-3">
          <div className="flex items-center gap-4 max-[415px]:gap-2">
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                $
                {formatCreditLimit(
                  isLoanItemType
                    ? loanItem?.loans?.credit_limit
                    : loanItem.loan_offer?.loans?.credit_limit,
                )}
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("home.creditLimit")}
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {isLoanItemType
                  ? loanItem?.loans?.interest_rate
                  : loanItem.loan_offer?.loans?.interest_rate}
                %
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("consulting.rate")}
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {isLoanItemType
                  ? loanItem?.loans?.origination_fee
                  : loanItem.loan_offer?.loans?.origination_fee}
                %
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("process.loanDetail.originalFee")}
              </div>
            </div>
          </div>
          <div className="lg:flex hidden gap-1">
            <img className="h-5 w-5" src={calendar} />
            <div>
              {isLoanItemType
                ? loanItem?.loans?.time_began
                : loanItem?.time_submit}
            </div>
          </div>
        </div>
        {(() => {
          switch (loanItem?.state) {
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
            default:
              return (
                <MobileHomeBtn
                  className={
                    isLoanItemType &&
                    loanItem.state_submit === LoanSubmitState.SUBMIT
                      ? "bg-light_finance-textsub"
                      : isLoanItemType &&
                          loanItem.state_submit === LoanSubmitState.NOT_SUBMIT
                        ? "bg-light_finance-primary items-center"
                        : ""
                  }
                  name={
                    isLoanItemType &&
                    loanItem.state_submit === LoanSubmitState.SUBMIT
                      ? "Details"
                      : isLoanItemType &&
                          loanItem.state_submit === LoanSubmitState.NOT_SUBMIT
                        ? "Submit"
                        : ""
                  }
                  handleSubmit={() => {
                    dispatch(
                      handleSetIdRecord(
                        isLoanItemType ? loanItem.loan_business_list.id : 0,
                      ),
                    );
                    navigate(
                      `/loan-detail?loanId=${
                        isLoanItemType && loanItem?.loans?.id
                      }&offerId=${isLoanItemType && loanItem?.id}`,
                    );
                  }}
                />
              );
          }
        })()}
      </div>
    </div>
  );
};

export default LoanItem;
