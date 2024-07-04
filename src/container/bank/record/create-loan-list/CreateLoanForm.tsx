import InputField from "@components/common/input";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { getFieldError } from ".";
import addFieldIcon from "@assets/icon/addFieldIcon.svg";
import addSectionIcon from "@assets/icon/addSectionIcon.svg";
import { LoanSubmit } from "@type/enum";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { questionType } from "./QuestionType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import {
  handleAddOption,
  handleDeleteField,
  handleDeleteOption,
  handleDeleteSection,
  handleOnChangeSectionName,
  hanldeAddField,
  hanldeAddSection,
  hanldeOnChangeField,
} from "@redux/createLoanReducer";
import { useCreateLoan } from "@redux/useSelector";

interface createLoanFormType {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
const CreateLoanForm = ({ register, errors }: createLoanFormType) => {
  const { t } = useTranslation();
  const [inputOption, setInputOpt] = useState("");
  const loanData = useCreateLoan();
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col xl:flex-row gap-4 xl:gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
          <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
            {t("createLoanForm.createLoan")}
          </div>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row md:gap-7 sm:justify-between w-full md:w-fit">
          {!loanData.selectedForm && (
            <label className="flex gap-2" htmlFor="form-reuse">
              <input
                type="checkbox"
                {...register("reuse")}
                id="form-reuse"
                className="text-light_finance-primary"
              />
              <div className="font-HelveticaNeue text-light_finance-textbody cursor-pointer">
                {t("createLoanForm.formReuse")}
              </div>
            </label>
          )}
          <div
            className="font-HelveticaNeue text-light_finance-primary underline cursor-pointer"
            data-hs-overlay="#select-form-modal"
          >
            {t("createLoanForm.selectForm")}
          </div>
        </div>
      </div>
      {!loanData.selectedForm && (
        <Fragment>
          <div className="flex flex-col gap-8">
            <InputField
              label={t("createLoanForm.loanFormName")}
              placeholder={t("createLoanForm.inputName")}
              register={register("formName", { required: true })}
              error={getFieldError(errors.formName)}
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
                      error={getFieldError(errors[`sectionName_${section.id}`])}
                    />
                    <i
                      className="fa-solid fa-x fa-lg cursor-pointer"
                      onClick={() => dispatch(handleDeleteSection(section.id))}
                    ></i>
                  </div>
                </div>
                {section?.fields?.map((field) => (
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
                            errors[`titleQuestion_${section.id}_${field.id}`],
                          )}
                        />
                        <div className="relative w-2/3 md:flex-[35%] flex justify-between items-center h-[52px] px-4 py-2 border-[1px] !border-light_finance-primary rounded-sm cursor-pointer">
                          {getDisplayType(field.fieldType)}
                          <input
                            type="checkbox"
                            className="filter-btn absolute top-0 left-0 w-full h-full z-10 opacity-0 peer"
                          />
                          <i
                            className={`fa-solid fa-chevron-down text-light_finance-textbody peer-checked:rotate-180 transition-all duration-300`}
                          />
                          <div className="absolute peer-checked:flex hidden top-14 right-0 z-10 bg-white rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex-col ">
                            {Object.entries(questionType).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="w-full h-[52px] px-4 py-2 flex justify-between items-center"
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
                        className="mt-6 md:mt-0 fa-solid fa-x fa-lg cursor-pointer"
                        onClick={() =>
                          dispatch(
                            handleDeleteField({
                              sectionId: section.id,
                              fieldId: field.id,
                            }),
                          )
                        }
                      ></i>
                    </div>
                    {(field.fieldType === LoanSubmit.CHECKBOX ||
                      field.fieldType === LoanSubmit.RADIO) && (
                      <Fragment>
                        <div className="flex flex-wrap gap-4">
                          {field.options?.map((option, index) => (
                            <div
                              key={index}
                              className="inline-flex w-auto items-center p-4 bg-light_finance-background1 gap-3"
                            >
                              <div className="font-HelveticaNeue text-sm font-normal leading-5 text-light_finance-textbody">
                                {option}
                              </div>
                              <i
                                className="fa-solid fa-x cursor-pointer"
                                onClick={() =>
                                  dispatch(
                                    handleDeleteOption({
                                      fieldId: field.id,
                                      sectionId: section.id,
                                      opTionIndex: index,
                                    }),
                                  )
                                }
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
                                e.currentTarget.value !== ""
                              ) {
                                dispatch(
                                  handleAddOption({
                                    fieldId: field.id,
                                    sectionId: section.id,
                                    value: e.currentTarget.value,
                                  }),
                                );
                                e.currentTarget.value = "";
                              }
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") event.preventDefault();
                            }}
                            onChange={(e) => {
                              if (e.currentTarget.value !== "")
                                setInputOpt(e.currentTarget.value);
                            }}
                            placeholder={t("createLoanForm.inputAns")}
                            id={`input_${section.id}_${field.id}`}
                          />
                          <div
                            className="w-fit flex gap-2 items-center px-4 py-3 bg-light_finance-background1 cursor-pointer"
                            onClick={() => {
                              if (inputOption !== "") {
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
                    onClick={() => dispatch(hanldeAddField(section.id))}
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
              onClick={() => dispatch(hanldeAddSection())}
            >
              <img src={addSectionIcon} />
              <div className="font-HelveticaNeue text-sm">
                {t("createLoanForm.addSection")}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CreateLoanForm;
