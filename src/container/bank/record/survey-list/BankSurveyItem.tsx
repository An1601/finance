import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import calendar from "@assets/icon/CalendarIcon.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { BankSurveyItemType } from "@type/types";

const BankSurveyItem = ({ surveyItem }: { surveyItem: BankSurveyItemType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded-xl w-full flex flex-col md:flex-row md:justify-between gap-3">
      <div className="flex gap-2 max-w-[85%] md:max-w-[30%] items-center">
        <img
          src={
            surveyItem?.thumbnail ??
            "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
          }
          className="h-[44px] min-w-[44px] xl:h-[4.5rem] xl:min-w-[4.5rem] rounded-full overflow-hidden"
        />
        <div className="max-w-full flex flex-col justify-center">
          <div className="font-HelveticaNeue font-normal text-xs md:text-sm leading-4 tracking-tight text-light_finance-textsub text-truncate">
            {surveyItem?.business_name}
          </div>
          <div className="font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate">
            {t("surveyBank.surveyDisplayName")}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full flex max-[400px]:flex-col justify-end items-end md:items-center gap-3 lg:gap-8 xl:gap-16 xxl:gap-20">
        <div className="w-full md:w-fit flex flex-col justify-center-center lg:items-end gap-3">
          <div className="flex items-center gap-4 max-[415px]:gap-2">
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col text-center ">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {surveyItem.net_worth}
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("surveyBank.netWorth")}
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col text-center ">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {surveyItem.liquidity}
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("surveyBank.liquidity")}
              </div>
            </div>
            <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col text-center">
              <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
                {surveyItem.income}
              </div>
              <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                {t("surveyBank.income")}
              </div>
            </div>
          </div>
          <div className="lg:flex hidden gap-1">
            <img className="h-5 w-5" src={calendar} />
            <div>{surveyItem?.time_submit}</div>
          </div>
        </div>
        {surveyItem.state ? (
          <div
            className="bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center cursor-pointer"
            onClick={() => navigate(`/bank/survey-detail/${surveyItem.id}`)}
          >
            <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-sm leading-4 px-3 py-2 whitespace-nowrap">
              {t("surveyBank.loanSent")}
            </div>
          </div>
        ) : (
          <MobileHomeBtn
            name={t("surveyBank.view")}
            className="!w-[94px]"
            handleSubmit={() =>
              navigate(`/bank/survey-detail/${surveyItem.id}`)
            }
          />
        )}
      </div>
    </div>
  );
};

export default BankSurveyItem;
