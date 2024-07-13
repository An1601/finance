import Breadcrumb from "@components/common/breadcrumb";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import InputField from "@components/common/input";
import { useCreateLoan, useUser } from "@redux/useSelector";
import { FieldError, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import defaultProfileImage from "@assets/images/profile/avatar.jpeg";
import ImageIcon from "@assets/icon/ImageIcon.svg";
import CancelBtn from "@components/common/button/cancel-btn";
import { useEffect, useState } from "react";
import { InterestRateType, LoanType } from "@type/enum";
import { US_CURRENTCY } from "@constant/Constant";
import api from "@api/axios";
import { toast } from "react-toastify";
import bg1 from "@assets/images/authentication/1.svg";
import SelectFormModal from "./SelectFormModal";
import axios from "axios";
import Loader from "@components/common/loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import {
  handleResetCreateLoan,
  handleSelectForm,
} from "@redux/createLoanReducer";
import { useNavigate, useParams } from "react-router-dom";
import { getAllForm } from "@redux/userThunks";
import { FileIcon } from "react-file-icon";
import { useLoading } from "@components/hook/useLoading";

export interface validateOptType {
  fieldId: number;
  sectionId: number;
}
export interface formItem {
  id: number;
  bank_id: number;
  name: string;
  description: string;
}
export const getFieldError = (error: any): FieldError | undefined => {
  if (error && "type" in error) {
    return error as FieldError;
  }
  return undefined;
};

const CreateLoan = () => {
  const { loanId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useUser();
  const { isLoading, toggleLoading } = useLoading();
  const dispatch = useDispatch<AppDispatch>();
  const loanData = useCreateLoan();
  const [interestRateType, setInterestRateType] = useState<number>();
  const [loanType, setLoanType] = useState<number>();
  const [uploadFile, setUploadFile] = useState<File | undefined>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

  const handleMapBodyData = (data: any) => {
    const bodyData = new FormData();
    bodyData.append("name", data.name);
    bodyData.append(
      "application_form_id",
      loanData.selectedForm?.toString() ?? "",
    );
    bodyData.append("interest_rate_type", interestRateType?.toString() ?? "");
    bodyData.append("type", loanType?.toString() ?? "");
    bodyData.append(
      "origination_fee",
      data.origination_fee.replace("%", "") ?? "",
    );
    bodyData.append("interest_rate", data.interest_rate.replace("%", "") ?? "");
    bodyData.append("duration", data.duration.replace(" year", "") ?? "");
    bodyData.append(
      "credit_limit",
      data.credit_limit.replace(/[^0-9.-]+/g, "") ?? "",
    );
    bodyData.append("description", data.description);
    bodyData.append("thumbnail", user.business_profile?.thumbnail ?? "a");
    bodyData.append("path_term", uploadFile ?? "");
    return bodyData;
  };
  const handleSetUpdateInitValue = async (data: any) => {
    const values = {
      name: data.loan_name,
      interest_rate_type: data.interest_rate_type,
      type: data.loan_type,
      origination_fee: data.origination_fee + "%",
      interest_rate: data.interest_rate + "%",
      duration: data.duration + " year",
      credit_limit: US_CURRENTCY.format(data.credit_limit),
      description: data.description,
      file: data,
    };
    setLoanType(data.loan_type);
    setInterestRateType(data.interest_rate_type);
    dispatch(handleSelectForm(data.application_form_id));
    reset(values);
    const fetchFile = await handleGetTerm();
    if (fetchFile) {
      const file = new File([fetchFile], data.term_name, {
        type: fetchFile.type,
      });
      setUploadFile(file);
    }
  };
  const handleSubmitLoan = async (data: any) => {
    if (!loanData.selectedForm) {
      toast.info(t("createLoanForm.selectWarning"));
    } else if (!uploadFile) {
      toast.info(t("createLoanForm.fileWarning"));
    } else {
      try {
        toggleLoading(true);
        const response = await api.post(
          `${loanId ? `/loans/${loanId}/update` : "/loans/create"}`,
          handleMapBodyData(data),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.status === 200) {
          toast.success(
            <div className="sm:w-[380px] flex flex-col">
              <div className="text-base font-bold leading-8 text-light_finance-textbody">
                {t("toast.success")}
              </div>
              <div>
                {loanId
                  ? t("createLoanForm.updateLoanOk")
                  : t("createLoanForm.messageSuccess")}
              </div>
            </div>,
          );
          navigate(`/bank/loan-detail/?loanId=${loanId ?? response.data.data}`);
        }
        dispatch(handleResetCreateLoan());
      } catch (error) {
        const message =
          axios.isAxiosError(error) && error.response?.data.message
            ? error.response.data.message
            : t("login.messageError");
        toast.error(message);
      } finally {
        toggleLoading(false);
      }
    }
  };
  const handleGetTerm = async () => {
    try {
      const response = await api.get(`/loans/download-term/${loanId}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    }
  };
  const handleGetLoanDetail = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/loans/${loanId}`);
      if (response.status === 200) {
        const data = response.data.data;
        handleSetUpdateInitValue(data);
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
  const uncheckFilerInputs = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.matches("input.filter-btn")) {
      document
        .querySelectorAll<HTMLInputElement>("input.filter-btn")
        .forEach((input) => {
          input.checked = false;
        });
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", uncheckFilerInputs);
    return () => {
      document.body.removeEventListener("click", uncheckFilerInputs);
    };
  }, [uncheckFilerInputs]);
  useEffect(() => {
    dispatch(getAllForm());
  }, []);
  useEffect(() => {
    if (loanId) handleGetLoanDetail();
  }, [loanId]);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SelectFormModal />
      <div className="relative z-10 min-h-screen">
        <div className="hidden sm:block">
          <Breadcrumb
            primaryText={t("sideBar.record")}
            secondaryText={t("sideBar.createLoan")}
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
        <form
          className="p-6 bg-white rounded-[28px] flex flex-col gap-10"
          onSubmit={handleSubmit(handleSubmitLoan)}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <img
                className="w-[110px] h-[110px] rounded-full border-[1px] border-black"
                src={defaultProfileImage}
                alt="logo"
              />
              <img
                className="absolute bottom-0 right-0 cursor-pointer"
                src={ImageIcon}
              />
            </div>
            <div className="text-center text-light_finance-textbody text-2xl font-bold tracking-wide pt-2">
              {user.business_profile?.name}
            </div>
            <div className="text-center text-light_finance-textbody text-sm ">
              {user.business_profile?.email}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
                <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                  {t("createLoanForm.loanInfo")}
                </div>
              </div>
              <div
                className="font-HelveticaNeue text-light_finance-primary underline cursor-pointer"
                data-hs-overlay="#select-form-modal"
              >
                {t("createLoanForm.selectForm")}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-20 justify-between">
              <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <div className="w-full flex flex-col gap-2 relative">
                  <div
                    className={`w-full h-[52px] px-4 py-2 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.interest_rate_type ? "border-red" : "border-light_finance-texttitle"} flex justify-between items-center`}
                  >
                    <input
                      className="w-full p-0 border-none outline-none text-light_finance-textbody text-sm font-normal leading-tight"
                      value={
                        interestRateType === InterestRateType.ADJUSTABLE_RATE
                          ? t("process.loanDetail.adjustType")
                          : interestRateType === InterestRateType.FIXED_RATE
                            ? t("process.loanDetail.fixType")
                            : ""
                      }
                      {...register("interest_rate_type", { required: true })}
                      disabled={true}
                    />
                    <input
                      type="checkbox"
                      className="filter-btn absolute top-0 left-0 w-full h-full z-10 opacity-0 peer cursor-pointer"
                    />
                    <i
                      className={`fa-solid fa-chevron-down text-light_finance-textbody peer-checked:rotate-180 transition-all duration-300`}
                    />
                    <div className="absolute peer-checked:flex hidden top-10 right-4 w-fit z-10 bg-white rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex-col ">
                      <div className="self-stretch px-3 py-2 justify-start items-start gap-2 inline-flex">
                        <input
                          className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary cursor-pointer"
                          type="checkbox"
                          id="adjustable_rate"
                          checked={
                            interestRateType ===
                            InterestRateType.ADJUSTABLE_RATE
                          }
                          onChange={(e) => {
                            if (e.currentTarget.value)
                              setInterestRateType(
                                InterestRateType.ADJUSTABLE_RATE,
                              );
                            setValue(
                              "interest_rate_type",
                              InterestRateType.ADJUSTABLE_RATE,
                            );
                          }}
                        />
                        <label
                          htmlFor="adjustable_rate"
                          className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5  cursor-pointer"
                        >
                          {t("process.loanDetail.adjustType")}
                        </label>
                      </div>
                      <div className="self-stretch px-3 py-2 justify-start items-start gap-2 inline-flex">
                        <input
                          className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary cursor-pointer"
                          type="checkbox"
                          id="fixed_rate"
                          checked={
                            interestRateType === InterestRateType.FIXED_RATE
                          }
                          onChange={(e) => {
                            if (e.currentTarget.value)
                              setInterestRateType(InterestRateType.FIXED_RATE);
                            setValue(
                              "interest_rate_type",
                              InterestRateType.FIXED_RATE,
                            );
                          }}
                        />
                        <label
                          htmlFor="fixed_rate"
                          className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5  cursor-pointer"
                        >
                          {t("process.loanDetail.fixType")}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="absolute px-1 left-[12px] top-[-0.5rem] h-4 bg-light_finance-background rounded-[0.25rem] flex items-center">
                    <div
                      className={`${errors.interest_rate_type ? "text-red" : "text-light_finance-textsub"} text-xs font-normal leading-none`}
                    >
                      {t("process.loanDetail.interestRateType")}
                    </div>
                  </div>
                </div>
                <InputField
                  label={t("process.loanDetail.loanName")}
                  register={register("name", { required: true })}
                  error={getFieldError(errors.name)}
                />
                <InputField
                  label={t("process.loanDetail.interestRate")}
                  register={register("interest_rate", {
                    required: true,
                    validate: (value) => value !== "%",
                    onBlur(event) {
                      event.currentTarget.type = "text";
                      setValue(
                        "interest_rate",
                        event.currentTarget.value + "%",
                      );
                    },
                  })}
                  error={getFieldError(errors.interest_rate)}
                  onFocus={(event) => {
                    event.currentTarget.type = "number";
                    event.currentTarget.value =
                      getValues("interest_rate").replace("%", "") ?? 0;
                  }}
                  placeholder="16.45%"
                />
                <InputField
                  label={t("process.loanDetail.creditLimit")}
                  register={register("credit_limit", {
                    required: true,
                    validate: (value) => value !== "$0.00",
                    onBlur(event) {
                      event.currentTarget.type = "text";
                      setValue(
                        "credit_limit",
                        US_CURRENTCY.format(event.currentTarget.value) ?? "",
                      );
                    },
                  })}
                  error={getFieldError(errors.credit_limit)}
                  onFocus={(event) => {
                    event.currentTarget.type = "number";
                    const formatNum = parseFloat(
                      getValues("credit_limit").replace(/[^0-9.-]+/g, ""),
                    );
                    event.currentTarget.value = formatNum.toString() ?? 0;
                  }}
                  type="text"
                  placeholder="$125.000"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <InputField
                  label={t("process.loanDetail.duration")}
                  register={register("duration", {
                    required: true,
                    validate: (value) => value !== " year",
                    onBlur(event) {
                      event.currentTarget.type = "text";
                      setValue("duration", event.currentTarget.value + " year");
                    },
                  })}
                  error={getFieldError(errors.duration)}
                  onFocus={(event) => {
                    event.currentTarget.type = "number";
                    event.currentTarget.value =
                      getValues("duration").replace(" year", "") ?? 0;
                  }}
                  type="text"
                  placeholder="3 year"
                />
                <div className="w-full flex flex-col gap-2 relative">
                  <div
                    className={`w-full h-[52px] px-4 py-2 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.type ? "border-red" : "border-light_finance-texttitle"} flex justify-between items-center`}
                  >
                    <input
                      className="w-full p-0 border-none outline-none text-light_finance-textbody text-sm font-normal leading-tight"
                      value={
                        loanType === LoanType.SECURE
                          ? t("process.loanDetail.secure")
                          : loanType === LoanType.UNSECURE
                            ? t("process.loanDetail.unsecure")
                            : ""
                      }
                      disabled={true}
                      {...register("type", { required: true })}
                    />
                    <input
                      type="checkbox"
                      className="filter-btn absolute top-0 left-0 w-full h-full z-10 opacity-0 peer cursor-pointer"
                    />
                    <i
                      className={`fa-solid fa-chevron-down text-light_finance-textbody peer-checked:rotate-180 transition-all duration-300`}
                    />
                    <div className="absolute peer-checked:flex hidden top-10 right-4 w-fit z-10 bg-white rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex-col ">
                      <div className="self-stretch px-3 py-2 justify-start items-start gap-2 inline-flex">
                        <input
                          className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary cursor-pointer"
                          type="checkbox"
                          id="secure_type"
                          checked={loanType === LoanType.SECURE}
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              setValue("type", LoanType.SECURE);
                              setLoanType(LoanType.SECURE);
                            }
                          }}
                        />
                        <label
                          htmlFor="secure_type"
                          className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5 cursor-pointer"
                        >
                          {t("process.loanDetail.secure")}
                        </label>
                      </div>
                      <div className="self-stretch px-3 py-2 justify-start items-start gap-2 inline-flex">
                        <input
                          className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary cursor-pointer"
                          type="checkbox"
                          id="unsecure_type"
                          checked={loanType === LoanType.UNSECURE}
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              setValue("type", LoanType.UNSECURE);
                              setLoanType(LoanType.UNSECURE);
                            }
                          }}
                        />
                        <label
                          htmlFor="unsecure_type"
                          className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5 cursor-pointer"
                        >
                          {t("process.loanDetail.unsecure")}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="absolute px-1 left-[12px] top-[-0.5rem] h-4 bg-light_finance-background rounded-[0.25rem] flex items-center">
                    <div
                      className={`${errors.type ? "text-red" : "text-light_finance-textsub"} text-xs font-normal leading-none`}
                    >
                      {t("process.loanDetail.loanType")}
                    </div>
                  </div>
                </div>
                <InputField
                  label={t("process.loanDetail.originalFee")}
                  register={register("origination_fee", {
                    required: true,
                    validate: (value) => value !== "%",
                    onBlur(event) {
                      event.currentTarget.type = "text";
                      setValue(
                        "origination_fee",
                        event.currentTarget.value + "%",
                      );
                    },
                  })}
                  error={getFieldError(errors.origination_fee)}
                  onFocus={(event) => {
                    event.currentTarget.type = "number";
                    event.currentTarget.value =
                      getValues("origination_fee").replace("%", "") ?? 0;
                  }}
                  placeholder="0.85%"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                {t("createLoanForm.loanDesc")}
              </div>
            </div>
            <textarea
              {...register("description", { required: true })}
              className={`h-40 border-[1px] ${errors.description ? "border-red  focus:!border-red" : "border-light_finance-texttitle  focus:!border-light_finance-texttitle"}   rounded-sm text-sm font-normal text-light_finance-textbody font-HelveticaNeue`}
            />
          </div>
          <div className="w-full flex gap-4 justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                {t("createLoanForm.term")}
              </div>
            </div>
            <div className="w-fit h-fit flex justify-between gap-4 items-center">
              {uploadFile?.name && (
                <div className="w-6">
                  <FileIcon
                    extension={uploadFile?.name?.toString().split(".").pop()}
                    color="#D14423"
                    labelColor="#D14423"
                    labelUppercase
                    type="presentation"
                    glyphColor="rgba(255,255,255,0.4)"
                  />
                </div>
              )}
              <div className="max-w-32 text-sm text-light_finance-textbody focus:!outline-none cursor-pointer text-truncate">
                {uploadFile?.name}
              </div>
              <input
                id="input-file"
                type="file"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    setUploadFile(e.currentTarget.files[0]);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor="input-file"
                className="text-sm text-light_finance-primary underline font font-normal cursor-pointer"
              >
                {t("createLoanForm.updateTerm")}
              </label>
            </div>
          </div>
          <div className="w-full flex gap-7 justify-center">
            <CancelBtn
              label={t("survey.submit_modal_close")}
              type="button"
              handleOnClick={() => {
                dispatch(handleResetCreateLoan());
                navigate("/bank/loan-list");
              }}
            />
            <PrimarySubmitBtn
              type="submit"
              name={loanId ? t("button.update") : t("resetPassword.create")}
            />
          </div>
        </form>
      </div>
      <div className="absolute w-full sm:hidden top-[-1.5rem]">
        {[...Array(Math.ceil(window.innerHeight / 987) + 1)].map((_, index) => (
          <img
            key={index}
            className="w-full bg-cover bg-center"
            src={bg1}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default CreateLoan;
