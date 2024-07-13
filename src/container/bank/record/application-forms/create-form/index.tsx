import InputField from "@components/common/input";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import addFieldIcon from "@assets/icon/addFieldIcon.svg";
import addSectionIcon from "@assets/icon/addSectionIcon.svg";
import bg1 from "@assets/images/authentication/1.svg";
import defaultProfileImage from "@assets/images/profile/avatar.jpeg";
import ImageIcon from "@assets/icon/ImageIcon.svg";
import { LoanFormState, LoanSubmit } from "@type/enum";
import { useForm } from "react-hook-form";
import { questionType } from "./QuestionType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import {
  handleAddOption,
  handleDeleteField,
  handleDeleteOption,
  handleDeleteSection,
  handleOnChangeSectionName,
  handleResetCreateLoan,
  handleSetValidateOpt,
  hanldeAddField,
  hanldeAddSection,
  hanldeOnChangeField,
  handleSetFormData,
} from "@redux/createLoanReducer";
import { useCreateLoan, useUser } from "@redux/useSelector";
import { getFieldError } from "../../package-loan/create-loan-list";
import Breadcrumb from "@components/common/breadcrumb";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoading } from "@components/hook/useLoading";
import { useNavigate, useParams } from "react-router-dom";
import CancelBtn from "@components/common/button/cancel-btn";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import Loader from "@components/common/loader";

interface IdStatusProps {
  fieldId: Array<number>;
  sectionId: Array<number>;
}

const CreateLoanForm = () => {
  const { t } = useTranslation();
  const user = useUser();
  const [inputOption, setInputOpt] = useState("");
  const [originalList, setOriginalList] = useState<IdStatusProps>({
    fieldId: [],
    sectionId: [],
  });
  const [deleteList, setDeleteList] = useState<IdStatusProps>({
    fieldId: [],
    sectionId: [],
  });
  const [dissable, setDisable] = useState(false);
  const loanData = useCreateLoan();
  const { formId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useLoading();
  const {
    handleSubmit,
    register,
    unregister,
    setValue,
    formState: { errors },
  } = useForm();

  const getDisplayType = (fieldType: number) => {
    switch (fieldType) {
      case LoanSubmit.TEXT:
        return questionType.text.display;
      case LoanSubmit.CHECKBOX:
        return questionType.chechbox.display;
      case LoanSubmit.RADIO:
        return questionType.radio.display;
      case LoanSubmit.NUMBER:
        return questionType.number.display;
      case LoanSubmit.DATE:
        return questionType.date.display;
    }
  };
  const checkValidateSections = () => {
    if (loanData.loanForm.length === 0) {
      toast.info(t("bankForm.formWarning"));
      return false;
    }
    return loanData.loanForm.every((section) => {
      if (section.field_application_forms.length === 0) {
        toast.info(t("bankForm.sectionWarning"));
        return false;
      }
      return section.field_application_forms.every((field) => {
        if (
          (field.field_type === LoanSubmit.CHECKBOX ||
            field.field_type === LoanSubmit.RADIO) &&
          field.field_options.length === 0
        ) {
          const inputOpt = document.querySelectorAll<HTMLInputElement>(
            `#input_${section.id}_${field.id}`,
          );
          inputOpt[0].focus();
          dispatch(
            handleSetValidateOpt({ fieldId: field.id, sectionId: section.id }),
          );
          return false;
        }
        dispatch(handleSetValidateOpt({ fieldId: 0, sectionId: 0 }));
        return true;
      });
    });
  };
  const handleSubmitLoanForm = async (data: any) => {
    if (checkValidateSections()) {
      const bodyData = {
        application_form_name: data.formName,
        description: data.requestDocs,
        is_reuse: true,
        application_form_sections: loanData.loanForm.map((section) => ({
          section_name: section.name,
          field_data: section.field_application_forms,
        })),
      };
      try {
        toggleLoading(true);
        const response = await api.post(
          "/application-form/create-form",
          bodyData,
        );
        if (response.status === 200) {
          dispatch(handleResetCreateLoan());
          navigate("/bank/form-list");
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
    }
  };
  const handleMapUpdateBody = (data: any) => {
    return {
      application_form_name: data.formName,
      description: data.requestDocs,
      is_reuse: true,
      application_form_sections: loanData.loanForm.map((section, index) => ({
        ...(originalList.sectionId.includes(section.id)
          ? { id: section.id }
          : {}),
        section_name: section.name,
        order_num: index,
        field_data: section.field_application_forms.map((field, subIndex) => ({
          ...(originalList.fieldId.includes(field.id) ? { id: field.id } : {}),
          field_name: field.field_name,
          field_type: field.field_type,
          field_options: field.field_options,
          order_num: subIndex,
        })),
      })),
      sections_to_delete: deleteList.sectionId,
      fields_to_delete: deleteList.fieldId,
    };
  };
  const handleSubmitUpdateForm = async (data: any) => {
    if (checkValidateSections()) {
      const bodyData = handleMapUpdateBody(data);
      try {
        toggleLoading(true);
        const response = await api.post(
          `/application-form/update-form/${formId}`,
          bodyData,
        );
        if (response.status === 200) {
          dispatch(handleResetCreateLoan());
          navigate("/bank/form-list");
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
    }
  };
  const handleGetForm = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/application-form/render/${formId}`);
      if (response.status === 200) {
        const data = await response.data.data[0];
        setValue("formName", data?.name);
        setValue("requestDocs", data?.description);
        dispatch(
          handleSetFormData(
            data.application_form_sections.map((section: any) => {
              return {
                id: section?.id,
                sectionName: section?.name,
                order_num: section.order_num,
                field_application_forms: section?.field_application_forms,
              };
            }),
          ),
        );
        data.application_form_sections?.forEach((section: any) => {
          setValue(`sectionName_${section.id}`, section?.name);
          setOriginalList((prevList) => ({
            ...prevList,
            sectionId: [...prevList.sectionId, section.id],
          }));
          section.field_application_forms.forEach((field: any) => {
            setValue(
              `titleQuestion_${section.id}_${field.id}`,
              field?.field_name,
            );
            setOriginalList((prevList) => ({
              ...prevList,
              fieldId: [...prevList.fieldId, field.id],
            }));
          });
        });
        setDisable(
          data.visibility === LoanFormState.PUBLIC ||
            data.visibility === LoanFormState.CLOSE,
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
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
    if (formId) handleGetForm();
  }, [formId]);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen relative overflow-hidden">
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
          onSubmit={handleSubmit((data) => {
            if (!formId) handleSubmitLoanForm(data);
            else handleSubmitUpdateForm(data);
          })}
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
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                {t("createLoanForm.createLoan")}
              </div>
            </div>
            <Fragment>
              <div className="flex flex-col gap-8">
                <InputField
                  label={t("createLoanForm.loanFormName")}
                  placeholder={t("createLoanForm.inputName")}
                  register={register("formName", { required: true })}
                  error={getFieldError(errors.formName)}
                  disabled={dissable}
                />
                {loanData?.loanForm?.map((section) => (
                  <Fragment key={section.id}>
                    <div className="flex flex-col gap-8">
                      <div className="flex gap-5 items-center">
                        <InputField
                          label={t("createLoanForm.titleSection")}
                          placeholder={t("createLoanForm.inputText")}
                          register={register(`sectionName_${section.id}`, {
                            required: true,
                            onChange(event) {
                              if (event.currentTarget.value)
                                dispatch(
                                  handleOnChangeSectionName({
                                    value: event.currentTarget.value,
                                    sectionId: section.id,
                                  }),
                                );
                            },
                          })}
                          error={getFieldError(
                            errors[`sectionName_${section.id}`],
                          )}
                          disabled={dissable}
                        />
                        <i
                          className={`fa-solid fa-x fa-lg cursor-pointer ${dissable ? "hidden" : ""}`}
                          onClick={() => {
                            if (!dissable) {
                              dispatch(handleDeleteSection(section.id));
                              unregister(`sectionName_${section.id}`);
                              if (originalList.sectionId.includes(section.id))
                                setDeleteList((prevList) => ({
                                  ...prevList,
                                  sectionId: [
                                    ...prevList.sectionId,
                                    section.id,
                                  ],
                                }));
                            }
                          }}
                        ></i>
                      </div>
                    </div>
                    {section?.field_application_forms?.map((field) => (
                      <div key={field.id} className="flex flex-col gap-3">
                        <div className="w-full flex gap-5 items-start md:items-center">
                          <div className="w-full flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center">
                            <InputField
                              label={t("createLoanForm.titleQuestion")}
                              placeholder={t("createLoanForm.inputText")}
                              register={register(
                                `titleQuestion_${section.id}_${field.id}`,
                                {
                                  required: true,
                                  onChange(event) {
                                    dispatch(
                                      hanldeOnChangeField({
                                        fieldId: field.id,
                                        sectionId: section.id,
                                        name: event.currentTarget.value,
                                        type: undefined,
                                      }),
                                    );
                                  },
                                },
                              )}
                              error={getFieldError(
                                errors[
                                  `titleQuestion_${section.id}_${field.id}`
                                ],
                              )}
                              disabled={dissable}
                            />
                            <div className="relative w-2/3 md:flex-[35%] flex justify-between items-center h-[52px] px-4 py-2 border-[1px] !border-light_finance-primary rounded-sm cursor-pointer">
                              {getDisplayType(field.field_type)}
                              <input
                                type="checkbox"
                                className="filter-btn absolute top-0 left-0 w-full h-full z-10 opacity-0 peer cursor-pointer"
                                onChange={(event) => {
                                  if (event.currentTarget.checked) {
                                    document
                                      .querySelectorAll<HTMLInputElement>(
                                        "input.filter-btn",
                                      )
                                      .forEach((input) => {
                                        if (input !== event.currentTarget) {
                                          input.checked = false;
                                        }
                                      });
                                  }
                                }}
                                disabled={dissable}
                              />
                              <i
                                className={`fa-solid fa-chevron-down text-light_finance-textbody peer-checked:rotate-180 transition-all duration-300`}
                              />
                              <div className="absolute peer-checked:flex hidden top-14 right-0 z-30 bg-white rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex-col ">
                                {Object.entries(questionType).map(
                                  ([key, value]) => (
                                    <div
                                      key={key}
                                      className="w-full h-[52px] px-4 py-2  flex justify-between items-center"
                                      onClick={() =>
                                        dispatch(
                                          hanldeOnChangeField({
                                            fieldId: field.id,
                                            sectionId: section.id,
                                            name: undefined,
                                            type: value.value,
                                          }),
                                        )
                                      }
                                    >
                                      {value.display}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                          <i
                            className={`mt-6 md:mt-0 fa-solid fa-x fa-lg cursor-pointer ${dissable ? "hidden" : ""}`}
                            onClick={() => {
                              if (!dissable) {
                                unregister(
                                  `titleQuestion_${section.id}_${field.id}`,
                                );
                                dispatch(
                                  handleDeleteField({
                                    sectionId: section.id,
                                    fieldId: field.id,
                                  }),
                                );
                                if (originalList.fieldId.includes(field.id))
                                  setDeleteList((prevList) => ({
                                    ...prevList,
                                    fieldId: [...prevList.fieldId, field.id],
                                  }));
                              }
                            }}
                          ></i>
                        </div>
                        {(field.field_type === LoanSubmit.CHECKBOX ||
                          field.field_type === LoanSubmit.RADIO) && (
                          <Fragment>
                            <div className="flex flex-wrap gap-4">
                              {field.field_options?.map((option, index) => (
                                <div
                                  key={index}
                                  className="inline-flex w-auto items-center p-4 bg-light_finance-background1 gap-3"
                                >
                                  <div className="font-HelveticaNeue text-sm font-normal leading-5 text-light_finance-textbody">
                                    {option}
                                  </div>
                                  <i
                                    className={`fa-solid fa-x cursor-pointer ${dissable ? "hidden" : ""}`}
                                    onClick={() => {
                                      if (!dissable)
                                        dispatch(
                                          handleDeleteOption({
                                            fieldId: field.id,
                                            sectionId: section.id,
                                            opTionIndex: index,
                                          }),
                                        );
                                    }}
                                  ></i>
                                </div>
                              ))}
                            </div>
                            <div className="w-full flex flex-col sm:flex-row gap-2 md:gap-1">
                              <input
                                className={`sm:flex-1 h-[52px] border-[1px] ${field.id === loanData?.validateOpt?.fieldId && section.id === loanData.validateOpt.sectionId ? "!border-red focus:!border-red" : "!border-light_finance-texttitle focus:!border-light_finance-texttitle"} rounded-sm text-sm font-normal text-light_finance-textbody font-HelveticaNeue`}
                                onKeyUp={(e) => {
                                  if (
                                    e.key === "Enter" &&
                                    e.currentTarget.value !== "" &&
                                    !dissable
                                  ) {
                                    dispatch(
                                      handleAddOption({
                                        fieldId: field.id,
                                        sectionId: section.id,
                                        value: e.currentTarget.value,
                                      }),
                                    );
                                    setInputOpt("");
                                  }
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter")
                                    event.preventDefault();
                                }}
                                onChange={(e) => {
                                  if (e.currentTarget.value !== "")
                                    setInputOpt(e.currentTarget.value);
                                }}
                                placeholder={t("createLoanForm.inputAns")}
                                id={`input_${section.id}_${field.id}`}
                                value={inputOption}
                                disabled={dissable}
                              />
                              <div
                                className="w-fit flex gap-2 items-center px-4 py-3 bg-light_finance-background1 cursor-pointer"
                                onClick={() => {
                                  if (inputOption !== "" && !dissable) {
                                    dispatch(
                                      handleAddOption({
                                        fieldId: field.id,
                                        sectionId: section.id,
                                        value: inputOption,
                                      }),
                                    );
                                    setInputOpt("");
                                  }
                                }}
                              >
                                <img src={addFieldIcon} className="h-7 w-7" />
                                <div className="font-HelveticaNeue text-sm font-normal leading-5 text-light_finance-textbody">
                                  {t("createLoanForm.addOption")}
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    ))}
                    <div className="w-full inline-flex justify-start">
                      <div
                        className="flex w-fit gap-2 items-center  cursor-pointer"
                        onClick={() => {
                          if (!dissable) dispatch(hanldeAddField(section.id));
                        }}
                      >
                        <img src={addFieldIcon} />
                        <div className="font-HelveticaNeue text-sm font-normal leading-5">
                          {t("createLoanForm.addQuestion")}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div className="w-full inline-flex justify-center  cursor-pointer">
                <div
                  className="flex w-fit gap-2 items-center"
                  onClick={() => {
                    if (!dissable) dispatch(hanldeAddSection());
                  }}
                >
                  <img src={addSectionIcon} />
                  <div className="font-HelveticaNeue text-sm">
                    {t("createLoanForm.addSection")}
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                {t("createLoanForm.requestDocs")}
              </div>
            </div>
            <textarea
              className={`h-40 border-[1px] ${errors.requestDocs ? "border-red  focus:!border-red" : "border-light_finance-texttitle  focus:!border-light_finance-texttitle"}   rounded-sm text-sm font-normal text-light_finance-textbody font-HelveticaNeue`}
              {...register("requestDocs", { required: true })}
              disabled={dissable}
            />
          </div>
          {!dissable && (
            <div className="w-full flex gap-7 justify-center">
              <CancelBtn
                label={t("survey.submit_modal_close")}
                handleOnClick={() => {
                  dispatch(handleResetCreateLoan());
                  navigate("/bank/form-list");
                }}
              />
              <PrimarySubmitBtn
                type="submit"
                name={formId ? t("button.update") : t("resetPassword.create")}
              />
            </div>
          )}
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

export default CreateLoanForm;
