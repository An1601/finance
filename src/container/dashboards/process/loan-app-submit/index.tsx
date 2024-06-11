import { FieldError, useForm } from "react-hook-form";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { useLocalStorage } from "@utils/index";
import { useEffect } from "react";
import { loanSubmitFields } from "@constant/LoanSubmitField";
import { useNavigate } from "react-router-dom";

const LoanAppSubmit = () => {
  const { t } = useTranslation();
  const { setItem, getItem } = useLocalStorage();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("id");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const getFieldError = (error: any): FieldError | undefined => {
    if (error && "type" in error) {
      return error as FieldError;
    }
    return undefined;
  };
  const handleSubmitLoanForm = async (data: any) => {
    setItem(`loanSubmit_${loanId}`, JSON.stringify(data));
    navigate("/loan-submit-confirm");
  };

  useEffect(() => {
    const storageItem = getItem(`loanSubmit_${loanId}`);
    if (storageItem)
      Object.entries(JSON.parse(storageItem)).forEach(([key, value]) => {
        setValue(key, value);
      });
  }, []);

  return (
    <form
      className="w-full pt-10 px-6 flex flex-col gap-6 md:gap-5 items-center"
      onSubmit={handleSubmit(handleSubmitLoanForm)}
    >
      <div className="w-full flex flex-col gap-6 items-center md:flex-row md:justify-between md:gap-[100px] xxl:justify-center">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          <div className="font-HelveticaNeue font-bold text-xl leading-7 tracking-tight text-light_finance-text">
            {t("process.loanSubmit.businessInfo")}
          </div>
          {Object.entries(loanSubmitFields.businessInfo).map(
            ([sectionName, sectionFields]) => (
              <Input
                key={sectionName}
                label={sectionFields}
                register={register(sectionName, { required: true })}
                error={getFieldError(errors[sectionName])}
              />
            ),
          )}
          <div className="font-HelveticaNeue font-bold text-xl leading-7 tracking-tight text-light_finance-text">
            {t("process.loanSubmit.partner")}
          </div>
          {Object.entries(loanSubmitFields.partner).map(
            ([sectionName, sectionFields]) => (
              <Input
                key={sectionName}
                label={sectionFields}
                register={register(sectionName, { required: true })}
                error={getFieldError(errors[sectionName])}
              />
            ),
          )}
        </div>
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          <div className="font-HelveticaNeue font-bold text-xl leading-7 tracking-tight text-light_finance-text">
            {t("process.loanSubmit.tradeRef")}
          </div>
          {Object.entries(loanSubmitFields.tradeRef).map(
            ([sectionName, sectionFields]) => (
              <Input
                key={sectionName}
                label={sectionFields}
                register={register(sectionName, { required: true })}
                error={getFieldError(errors[sectionName])}
              />
            ),
          )}
          <div className="font-HelveticaNeue font-bold text-xl leading-7 tracking-tight text-light_finance-text">
            {t("process.loanSubmit.corpRevSrvOnly")}
          </div>
          {Object.entries(loanSubmitFields.corpRevSrvOnly).map(
            ([sectionName, sectionFields]) => (
              <Input
                key={sectionName}
                label={sectionFields}
                register={register(sectionName, { required: true })}
                error={getFieldError(errors[sectionName])}
              />
            ),
          )}
        </div>
      </div>
      <PrimarySubmitBtn name={t("forgotPassword.send")} type="submit" />
    </form>
  );
};

export default LoanAppSubmit;
