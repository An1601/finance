import { Fragment } from "react";
import { BankLoanItemType } from "@type/types";
import { LoanFormState } from "@type/enum";
import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatCreditLimit } from "@constant/Constant";
import { useUser } from "@redux/useSelector";
import DeleteIcon from "@components/svg/Delete";
import EditIcon from "@components/svg/Edit";
import { showSweetAlert } from "@components/sweet-alert/Alert";
import { useLoading } from "@components/hook/useLoading";
import api from "@api/axios";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";

const BankLoanItem = ({
  loanItem,
  refetchLoans,
}: {
  loanItem: BankLoanItemType;
  refetchLoans: () => Promise<void>;
}) => {
  const { t } = useTranslation();
  const user = useUser();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useLoading();

  const hanldeChangeState = async (state: number, loanId: number) => {
    toggleLoading(true);
    try {
      const response = await api.post(
        `/loans/${loanId}/update-loan-visibility`,
        {
          visibility: state,
        },
      );
      if (response.status === 200) {
        refetchLoans();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };
  const hanldeDeleteLoan = async (loanId: number) => {
    toggleLoading(true);
    try {
      const response = await api.delete(`/loans/${loanId}/delete`);
      if (response.status === 200) {
        refetchLoans();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <a
      href={`/bank/loan-detail?loanId=${loanItem.id}`}
      className="w-full bg-white rounded-xl p-4 justify-between flex flex-col xxs:flex-row items-end"
    >
      <div className="w-full xxs:max-w-[75%] flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex gap-2">
          <img
            src={
              user.business_profile?.thumbnail ??
              "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
            }
            className="h-[44px] min-w-[44px] xl:h-[4.5rem] xl:min-w-[4.5rem] rounded-full overflow-hidden"
          />
          <div className="flex flex-col justify-center max-w-[75%]">
            <div className="font-HelveticaNeue font-normal text-xs md:text-sm leading-4 tracking-tight text-light_finance-textsub text-truncate">
              {user.business_profile?.name}
            </div>
            <div className="font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate">
              {loanItem?.name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 max-[415px]:gap-2">
          <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
            <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
              ${formatCreditLimit(loanItem?.credit_limit)}
            </div>
            <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
              {t("home.creditLimit")}
            </div>
          </div>
          <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
            <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
              {loanItem?.interest_rate}%
            </div>
            <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
              {t("consulting.rate")}
            </div>
          </div>
          <div className="px-3 py-1 bg-light_finance-background1 rounded-[20px] justify-center items-center gap-1 flex flex-col xl:flex-row text-center whitespace-nowrap">
            <div className="text-light_finance-textbody text-xs md:text-sm font-bold font-['Helvetica Neue'] leading-none tracking-tight">
              {loanItem?.origination_fee}%
            </div>
            <div className="text-light_finance-textsub text-[10px] md:text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
              {t("process.loanDetail.originalFee")}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-end justify-center">
        {loanItem.visibility === LoanFormState.DRAFT && (
          <div className="flex w-fit gap-7">
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/bank/loan/${loanItem.id}`);
              }}
            >
              <EditIcon color={"#45556E"} />
            </div>
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                showSweetAlert(
                  () => hanldeDeleteLoan(loanItem.id),
                  t("warning.title"),
                  t("warning.content"),
                  t("consulting.delete"),
                  t("survey.submit_modal_close"),
                );
              }}
            >
              <DeleteIcon color={"#45556E"} />
            </div>
          </div>
        )}
        {loanItem.visibility === LoanFormState.DRAFT && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MobileHomeBtn
              name={t("bankForm.public")}
              handleSubmit={() =>
                showSweetAlert(
                  () => hanldeChangeState(LoanFormState.PUBLIC, loanItem.id),
                  t("warning.title"),
                  t("warning.content"),
                  t("bankForm.public"),
                  t("survey.submit_modal_close"),
                )
              }
            />
          </div>
        )}
        {loanItem.visibility === LoanFormState.PUBLIC && (
          <Fragment>
            <div className="bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
              <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-sm leading-4 px-2 py-[2px] whitespace-nowrap">
                {t("bankForm.published")}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MobileHomeBtn
                name={t("bankForm.close")}
                className="bg-rose-600 text-white"
                handleSubmit={() =>
                  hanldeChangeState(LoanFormState.CLOSE, loanItem.id)
                }
              />
            </div>
          </Fragment>
        )}
        {loanItem.visibility === LoanFormState.CLOSE && (
          <Fragment>
            <div className="bg-[#FFD4D8] rounded-sm inline-flex items-center justify-center">
              <div className="text-center font-HelveticaNeue font-medium text-[#F65160] text-sm leading-4 px-2 py-[2px] whitespace-nowrap">
                {t("bankForm.closed")}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MobileHomeBtn
                name={t("bankForm.restore")}
                className="!bg-[#408CFF]"
                handleSubmit={() =>
                  hanldeChangeState(LoanFormState.PUBLIC, loanItem.id)
                }
              />
            </div>
          </Fragment>
        )}
      </div>
    </a>
  );
};

export default BankLoanItem;
