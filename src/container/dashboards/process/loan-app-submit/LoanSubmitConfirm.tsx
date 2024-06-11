import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { useTranslation } from "react-i18next";
import { loanSubmitFields } from "@constant/LoanSubmitField";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@utils/index";
import CancelBtn from "@components/common/button/cancel-btn";
import LoanConfirmItem from "./LoanConfirmItem";
import { useNavigate } from "react-router-dom";

const LoanSubmitConfirm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loanForm, setLoanForm] = useState([]);
  const { getItem, removeItem } = useLocalStorage();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("id");

  const handleSubmitLoanForm = async () => {
    removeItem(`loanSubmit_${loanId}`);
  };

  useEffect(() => {
    const storageItem = getItem(`loanSubmit_${loanId}`);
    if (storageItem) setLoanForm(JSON.parse(storageItem));
  }, []);

  return (
    <div className="ww-full mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
      <div className=" w-full py-3 text-center bg-white text-light_finance-textbody font-bold text-base leading-6 tracking-tighter rounded-[24px] ">
        {t("process.loanSubmit.title")}
      </div>
      <div className="bg-light_finance-background rounded-[24px] px-4 py-6">
        <div className="w-full flex flex-col gap-3 mt-1 md:flex-row md:gap-10 xl:gap-20">
          <div className="w-full flex flex-col border-[1px] border-stroke rounded-lg">
            <div className="w-full flex flex-col gap-3 p-3">
              <div className="font-HelveticaNeue font-bold text-base leading-6 tracking-tight text-light_finance-textbody">
                {t("process.loanSubmit.businessInfo")}
              </div>
              <div className="flex flex-col gap-4">
                {Object.entries(loanSubmitFields.businessInfo).map(
                  ([sectionName, sectionFields]) => (
                    <LoanConfirmItem
                      key={sectionName}
                      label={sectionFields}
                      value={loanForm[sectionName as keyof typeof loanForm]}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 p-3">
              <div className="font-HelveticaNeue font-bold text-base leading-6 tracking-tight text-light_finance-textbody">
                {t("process.loanSubmit.partner")}
              </div>
              <div className="flex flex-col gap-4">
                {Object.entries(loanSubmitFields.partner).map(
                  ([sectionName, sectionFields]) => (
                    <LoanConfirmItem
                      key={sectionName}
                      label={sectionFields}
                      value={loanForm[sectionName as keyof typeof loanForm]}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col border-[1px] border-stroke rounded-lg">
            <div className="w-full flex flex-col gap-3 p-3">
              <div className="font-HelveticaNeue font-bold text-base leading-6 tracking-tight text-light_finance-textbody">
                {t("process.loanSubmit.tradeRef")}
              </div>
              <div className="flex flex-col gap-4">
                {Object.entries(loanSubmitFields.tradeRef).map(
                  ([sectionName, sectionFields]) => (
                    <LoanConfirmItem
                      key={sectionName}
                      label={sectionFields}
                      value={loanForm[sectionName as keyof typeof loanForm]}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 p-3">
              <div className="font-HelveticaNeue font-bold text-base leading-6 tracking-tight text-light_finance-textbody">
                {t("process.loanSubmit.corpRevSrvOnly")}
              </div>
              <div className="flex flex-col gap-4">
                {Object.entries(loanSubmitFields.corpRevSrvOnly).map(
                  ([sectionName, sectionFields]) => (
                    <LoanConfirmItem
                      key={sectionName}
                      label={sectionFields}
                      value={
                        sectionName === "creditLimit"
                          ? `$${loanForm[sectionName as keyof typeof loanForm]}`
                          : loanForm[sectionName as keyof typeof loanForm]
                      }
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-5 mb-5 gap-4">
          <CancelBtn
            label={t("process.edit")}
            handleOnClick={() => {
              navigate("/loan-submit");
            }}
          />
          <PrimarySubmitBtn
            name={t("forgotPassword.send")}
            type="submit"
            handleSubmit={handleSubmitLoanForm}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanSubmitConfirm;
