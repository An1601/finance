import Breadcrumb from "@components/common/breadcrumb";
import calendar from "@assets/icon/CalendarIcon.svg";
import LoanDetailItem from "@container/dashboards/process/loan-detail/LoanDetailItem";
import { InterestRateType, LoanType } from "@type/enum";
import { LoanDetailProcessType } from "@type/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BankLoanDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loanDetail, setLoanDetail] = useState<LoanDetailProcessType>();

  useEffect(() => {
    setLoanDetail({
      id: 2,
      name: "Tremayne Beahan",
      interest_rate_type: 0,
      type: 0,
      origination_fee: 3.3,
      interest_rate: 1.24,
      duration: 2.34,
      credit_limit: 300000,
      description:
        "Temporibus eligendi minima optio inventore. Aliquam qui velit aspernatur saepe iusto unde.",
      time_began: "1991-07-16",
      category: {
        id: 4,
        name: "Car Loans",
        thumbnail: "https://www.google.com.vn/car",
        created_at: null,
        updated_at: null,
      },
      bank: {
        name: "Bank banh",
      },
    });
  }, []);

  return (
    <div className="h-screen my-8">
      <div className="hidden sm:block">
        <Breadcrumb
          primaryText={t("sideBar.record")}
          secondaryText={t("sideBar.createLoan")}
          showSecondary
        />
      </div>
      <div className="sm:hidden my-7 mx-6 flex gap-3 items-center">
        <i
          className=" fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
          onClick={() => {
            navigate("/");
          }}
        ></i>
        <div className="text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
          {t("sideBar.createLoan")}
        </div>
      </div>
      <div className="bg-light_finance-background drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)] rounded-[24px] px-4 py-6 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <img className="h-5 w-5" src={calendar} />
              <div>{loanDetail?.time_began}</div>
            </div>
            <div className="uppercase text-sm font-medium text-light_finance-textsub">
              {"( "}
              {loanDetail?.interest_rate_type ===
              InterestRateType.ADJUSTABLE_RATE
                ? t("process.loanDetail.adjustType")
                : t("process.loanDetail.fixType")}
              {" )"}
            </div>
            <div className="uppercase text-xl font-bold leading-7 text-light_finance-textbody">
              {loanDetail?.name}
            </div>
          </div>
          <div>
            <div className="p-2 rounded-[20px] bg-light_finance-sub_second text-light_finance-primary font-HelveticaNeue font-medium leading-4 whitespace-nowrap">
              {loanDetail?.bank?.name}
            </div>
          </div>
        </div>
        <hr className="text-stroke" />
        <div className="w-full grid grid-cols-10 gap-3 mt-1 md:gap-10 xl:gap-20">
          <div className="col-span-12 md:col-span-4 border-[1px] rounded-lg border-stroke mt-1 flex flex-col gap-3 p-3">
            <LoanDetailItem
              label={t("process.loanDetail.id")}
              value={loanDetail?.id}
            />
            <LoanDetailItem
              label={t("process.loanDetail.interestRate")}
              value={`${loanDetail?.interest_rate ?? ""}%/${t("process.loanDetail.month")}`}
            />
            <LoanDetailItem
              label={t("process.loanDetail.creditLimit")}
              value={`$${loanDetail?.credit_limit ?? ""}`}
            />
            <LoanDetailItem
              label={t("process.loanDetail.duration")}
              value={`${loanDetail?.duration ?? ""} ${t("process.loanDetail.year")}`}
            />
            <LoanDetailItem
              label={t("process.loanDetail.loanType")}
              value={`${loanDetail?.type === LoanType.SECURE ? t("process.loanDetail.secure") : loanDetail?.type === LoanType.UNSECURE ? t("process.loanDetail.unsecure") : ""}`}
            />
            <LoanDetailItem
              label={t("process.loanDetail.originalFee")}
              value={`${loanDetail?.origination_fee ?? ""}%`}
            />
          </div>
          <div className="col-span-12 md:col-span-6 font-HelveticaNeue font-normal text-sm leading-5 text-light_finance-textbody">
            {loanDetail?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankLoanDetail;
