import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { RcmLoanProps } from ".";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { useLoading } from "@components/hook/useLoading";
import api from "@api/axios";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";

const SelectSurveyModal = ({
  rcmLoan,
  setRcmLoan,
  loanList,
  surveyId,
}: {
  rcmLoan: number[];
  setRcmLoan: Dispatch<SetStateAction<number[]>>;
  loanList: RcmLoanProps[];
  surveyId: number | undefined;
}) => {
  const { t } = useTranslation();
  const { isLoading, toggleLoading } = useLoading();

  const handleSendLoan = async () => {
    toggleLoading(true);
    try {
      const response = await api.post(`/bank/offer-loans`, {
        survey_id: surveyId,
        loan_offer: rcmLoan,
      });
      document.body.style.overflow = "";
      if (response.status === 200) {
        toast.success(
          <div className="sm:w-[380px] flex flex-col">
            <div className="text-base font-bold leading-8 text-light_finance-textbody">
              {t("toast.success")}
            </div>
            <div>{t("surveyBank.loanSetSuccess")}</div>
          </div>,
        );
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div id="select-loan-modal" className="hs-overlay ti-modal hidden">
      <div className="!max-w-full h-full px-6 ti-modal-box flex justify-center items-center">
        <div className="w-full ti-modal-content sm:w-[80vw] md:w-[60vw] xl:w-[40vw] h-auto max-h-[95vh] px-6 py-4 !border !border-defaultborder dark:!border-defaultborder/10 !rounded-[0.5rem]">
          <div className="w-full max-h-full flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between items-center">
              <div className="flex-1 text-center text-xl sm:text-2xl font-HelveticaNeue font-semibold uppercase">
                {t("surveyBank.selectLoan")}
              </div>
              <i
                className="fa-solid fa-x fa-lg cursor-pointer"
                data-hs-overlay="#select-loan-modal"
              ></i>
            </div>
            <hr className="bg-stroke h-[2px]" />
            <div className="flex flex-col max-h-[65vh] overflow-y-auto">
              {loanList?.map((loan) => (
                <label
                  key={loan.id}
                  className="w-fit px-4 py-2 max-w-full flex gap-2 items-center"
                  htmlFor={`form_${loan.id}`}
                >
                  <input
                    type="checkbox"
                    id={`form_${loan.id}`}
                    className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary cursor-pointer"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setRcmLoan([...rcmLoan, loan.id]);
                      } else {
                        setRcmLoan(rcmLoan.filter((item) => loan.id !== item));
                      }
                    }}
                  />
                  <span className="text-base font-HelveticaNeue font-normal text-light_finance-textbody">
                    {loan.name}
                  </span>
                </label>
              ))}
            </div>
            <hr className="bg-stroke h-[2px]" />
            <div className="w-full flex justify-center h-fit">
              <PrimarySubmitBtn
                name={t("forgotPassword.send")}
                handleSubmit={handleSendLoan}
                dataHsOverlay="#select-loan-modal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSurveyModal;
