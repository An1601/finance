import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import calendar from "@assets/icon/CalendarIcon.svg";
import { InterestRateType, LoanType } from "@type/enum";
import api from "@api/axios";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import LoanDetailItem from "./LoanDetailItem";
import BookingModal from "../bookingModal";
import { LoanDetailProcessType } from "@type/types";
const LoanDetail = () => {
  const { t } = useTranslation();
  const { loanId } = useParams();
  const [loanDetail, setLoanDetail] = useState<LoanDetailProcessType>();
  const dispatch = useDispatch<AppDispatch>();

  const handleGetLoanDetail = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/loans/${loanId}`);
      if (response.status === 200) {
        setLoanDetail(response.data.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === 400) {
      } else toast.error(!axios.isAxiosError(error) && t("login.messageError"));
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  useEffect(() => {
    handleGetLoanDetail();
  }, []);

  useEffect(() => {
    console.log(loanDetail);
  }, [loanDetail]);

  return (
    <div className="mt-10 mx-6 flex flex-col gap-6 md:gap-5">
      <BookingModal />
      <div className="flex gap-3 bg-light_finance-sub_second px-3 py-2 max-w-[423px]">
        <div>
          <i className="fa-solid fa-circle-info text-light_finance-primary fa-lg"></i>
        </div>
        <div className="text-sm font-HelveticaNeue font-normal text-light_finance-primary">
          {t("process.loanDetail.info")}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="md:hidden w-full py-3 text-center bg-light_finance-textbody text-white font-bold text-base leading-6 tracking-tighter rounded-[24px]">
          {t("process.loanDetail.title")}
        </div>
        <div className="bg-light_finance-background rounded-[24px] px-4 py-6">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <img className="h-5 w-5" src={calendar} />
                <div>{loanDetail?.time_began}</div>
              </div>
              <div className="uppercase text-sm font-medium text-light_finance-textsub">
                {"("}
                {loanDetail?.interest_rate_type
                  ? InterestRateType.ADJUSTABLE_RATE
                  : InterestRateType.FIXED_RATE}
                {")"}
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
          <div className="w-full grid grid-cols-10 gap-3 mt-1 md:flex-row md:gap-10 xl:gap-20">
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
          <div className="flex justify-center mt-4">
            <PrimarySubmitBtn
              name={t("process.book")}
              dataHsOverlay="#booking-modal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
