import Breadcrumb from "@components/common/breadcrumb";
import calendar from "@assets/icon/CalendarIcon.svg";
import LoanDetailItem from "@container/dashboards/process/loan-detail/LoanDetailItem";
import { InterestRateType, LoanType } from "@type/enum";
import { LoanDetailProcessType } from "@type/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { FileIcon } from "react-file-icon";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";

const BankLoanDetail = () => {
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("loanId");
  const navigate = useNavigate();
  const [loanDetail, setLoanDetail] = useState<LoanDetailProcessType>();
  const { isLoading, toggleLoading } = useLoading();

  const handleGetLoanDetail = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/loans/${loanId}`);
      if (response.status === 200) {
        setLoanDetail(response.data.data);
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      toggleLoading(false);
    }
  };
  const handleSaveFile = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/loans/view/term/${loanId}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          loanDetail?.document?.file_name ?? "term",
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    handleGetLoanDetail();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="h-screen flex flex-col sm:pb-8">
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
      <div className="flex-1 md:flex-0 bg-light_finance-background drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)] rounded-[24px] px-4 py-6 flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 xl:gap-0">
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
            <div className="flex flex-col gap-4 items-end">
              <div className="w-fit p-2 rounded-[20px] bg-light_finance-sub_second text-light_finance-primary font-HelveticaNeue font-medium leading-4 whitespace-nowrap">
                {loanDetail?.bank?.name}
              </div>
              <div className="gap-6 hidden xl:flex">
                <div className="flex h-fit items-center py-1 px-3">
                  <div className="mr-3 font-HelveticaNeue font-bold text-xs text-light_finance-textbody leading-4">
                    Term:
                  </div>
                  <div className="w-4 mr-2">
                    <FileIcon
                      extension={loanDetail?.document?.file_name
                        .split(".")
                        .pop()}
                      color="#D14423"
                      labelColor="#D14423"
                      labelUppercase
                      type="presentation"
                      glyphColor="rgba(255,255,255,0.4)"
                    />
                  </div>
                  <div className="font-HelveticaNeue text-sm text-light_finance-textbody leading-5">
                    {loanDetail?.document?.file_name}
                  </div>
                </div>
                <div className="px-3 py-1 bg-light_finance-background1 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-light_finance-textbody text-xs font-bold font-HelveticaNeue leading-none tracking-tight">
                    Application form:
                  </div>
                  <div className="text-center text-primary text-sm font-normal font-HelveticaNeue underline leading-tight">
                    View
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full justify-between flex gap-2 xl:gap-6 xl:hidden flex-col sm:flex-row">
            <div
              className="sm:w-1/2 flex h-fit items-center py-1 px-3 cursor-pointer"
              onClick={() => handleSaveFile()}
            >
              <div className="mr-3 font-HelveticaNeue font-bold text-xs text-light_finance-textbody leading-4">
                Term:
              </div>
              <div className="w-4 mr-2">
                <FileIcon
                  extension={loanDetail?.document?.file_name.split(".").pop()}
                  color="#D14423"
                  labelColor="#D14423"
                  labelUppercase
                  type="presentation"
                  glyphColor="rgba(255,255,255,0.4)"
                />
              </div>
              <div className="w-full font-HelveticaNeue text-sm text-light_finance-textbody leading-5 text-truncate">
                {loanDetail?.document?.file_name}
              </div>
            </div>
            <div className="w-40 px-3 py-1 bg-light_finance-background1 rounded-lg justify-center items-center gap-2 inline-flex">
              <div className="text-light_finance-textbody text-xs font-bold font-HelveticaNeue leading-none tracking-tight">
                Application form:
              </div>
              <div className="text-center text-primary text-sm font-normal font-HelveticaNeue underline leading-tight">
                View
              </div>
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
