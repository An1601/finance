import { Fragment } from "react";
import Input from "./Input";
import InputDate from "./InputDate";
import { LoanSubmit } from "@type/enum";
import SurveyRadioItem from "@container/survey/surveyRadioItem";
import SurveySelectItem from "@container/survey/surveySelectItem";

interface LoanFormFieldProps {
  question: any;
  answers: { [key: number]: any };
  errors: { [key: number]: boolean };
  t: (key: string) => string;
  handleInputChange: (fieldId: any, value: any) => void;
  handleDateChange: (fieldId: any, date: any) => void;
  handleRadioChange: (fieldId: any, value: any) => void;
  handleCheckboxChange: (fieldId: number, value: any) => void;
}

const LoanFormField: React.FC<LoanFormFieldProps> = ({
  t,
  question,
  answers,
  errors,
  handleInputChange,
  handleDateChange,
  handleRadioChange,
  handleCheckboxChange,
}) => {
  switch (question?.field_type) {
    case LoanSubmit.TEXT:
      return (
        <Fragment>
          <Input
            label={question?.field_name}
            value={answers[question?.id] || ""}
            onChange={(e) => handleInputChange(question?.id, e.target.value)}
            error={errors[question?.id]}
          />
          {errors[question.id] && (
            <div className="text-sm text-red mt-2">
              {t("process.loanSubmit.validate")}
            </div>
          )}
        </Fragment>
      );
    case LoanSubmit.NUMBER:
      return (
        <Fragment>
          <Input
            label={question?.field_name}
            type="number"
            value={answers[question?.id] || ""}
            onChange={(e) => handleInputChange(question?.id, e.target.value)}
            error={errors[question?.id]}
          />
          {errors[question.id] && (
            <div className="text-sm text-red mt-2">
              {t("process.loanSubmit.validate")}
            </div>
          )}
        </Fragment>
      );
    case LoanSubmit.DATE:
      return (
        <Fragment>
          <InputDate
            label={question?.field_name}
            selected={answers[question?.id] || ""}
            onChange={(date) => handleDateChange(question?.id, date)}
            error={errors[question?.id]}
          />
          {errors[question.id] && (
            <div className="text-sm text-red mt-2">
              {t("process.loanSubmit.validate")}
            </div>
          )}
        </Fragment>
      );
    case LoanSubmit.RADIO:
      return (
        <Fragment>
          <div className="flex flex-col gap-2">
            <div className="text-slate-600 text-sm font-normal font-HelveticaNeue leading-none tracking-tight">
              {question?.field_name}
            </div>
            {question?.field_options?.map((option: any, sub_index: number) => (
              <SurveyRadioItem
                key={sub_index}
                label={option}
                name={`${question?.id}`}
                id={`${question?.id}_${sub_index}`}
                checked={answers[question?.id]?.includes(option) || false}
                onChangeAnswer={() => handleRadioChange(question?.id, option)}
              />
            ))}
          </div>
          {errors[question.id] && (
            <div className="text-sm text-red mt-2">
              {t("process.loanSubmit.validate")}
            </div>
          )}
        </Fragment>
      );
    case LoanSubmit.CHECKBOX:
      return (
        <Fragment>
          <div className="flex flex-col gap-2">
            <div className="text-slate-600 text-sm font-normal font-HelveticaNeue leading-none tracking-tight">
              {question?.field_name}
            </div>
            {question?.field_options?.map((option: any, sub_index: number) => (
              <SurveySelectItem
                key={sub_index}
                label={option}
                id={`${question?.id}_${sub_index}`}
                checked={answers[question?.id]?.includes(option) || false}
                onChangeAnswer={() =>
                  handleCheckboxChange(question?.id, option)
                }
              />
            ))}
          </div>
          {errors[question.id] && (
            <div className="text-sm text-red mt-2">
              {t("process.loanSubmit.validate")}
            </div>
          )}
        </Fragment>
      );
    default:
      return null;
  }
};

export default LoanFormField;
