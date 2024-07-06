import React, { Fragment } from "react";
import SurveyRadioItem from "./surveyRadioItem";
import InputField from "@components/common/input";
import SurveySelectItem from "./surveySelectItem";
import SurveyDragDrop from "./surveyDragDrop";
import { SurveyAnsType } from "@type/enum";

interface SurveyUnitProps {
  question: any;
  currentIndex: number;
  answers: any[];
  handleChangeText: (value: string, idQuestion: string) => void;
  handelChangeRadio: (
    value: string,
    idQuestion: string,
    isInput: boolean,
  ) => void;
  handelChangeCheckbox: (value: string, idQuestion: string) => void;
  setSortQuestion: React.Dispatch<React.SetStateAction<string[]>>;
  sortQuestion: string[];
}

const SurveyUnit: React.FC<SurveyUnitProps> = ({
  question,
  currentIndex,
  answers,
  handleChangeText,
  handelChangeRadio,
  handelChangeCheckbox,
  setSortQuestion,
  sortQuestion,
}) => {
  return (
    <div key={question.id} className={`w-full flex flex-col gap-6`}>
      <div className="font-HelveticaNeue font-bold text-lg leading-7 text-light_finance-textbody">
        {question?.content}
      </div>
      <div className="flex flex-col gap-6">
        {(() => {
          switch (question?.type) {
            case SurveyAnsType.ONE_CHOICE:
              return (
                <Fragment>
                  {question?.choice?.map((option: any, sub_index: any) => (
                    <SurveyRadioItem
                      key={sub_index}
                      label={option}
                      name={`radio_${question.id}`}
                      id={`radio_${question.id}_${sub_index}`}
                      onChangeAnswer={() =>
                        handelChangeRadio(option, question.id, false)
                      }
                    />
                  ))}
                  {answers[currentIndex]
                    .find((item: any) => item.id === question.id)
                    ?.ans.includes("Other") && (
                    <InputField
                      label="Explain"
                      onChange={(e) =>
                        handelChangeRadio(
                          e.currentTarget.value,
                          question.id,
                          true,
                        )
                      }
                    />
                  )}
                </Fragment>
              );
            case SurveyAnsType.MULTI_CHOICE:
              return (
                <Fragment>
                  {question?.choice.map((option: any, sub_index: any) => (
                    <SurveySelectItem
                      key={sub_index}
                      label={option}
                      onChangeAnswer={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        handelChangeCheckbox(e.currentTarget.id, question.id);
                      }}
                    />
                  ))}
                </Fragment>
              );
            case SurveyAnsType.TEXT:
              return (
                <InputField
                  label={question?.label ?? ""}
                  type="number"
                  onChange={(e) =>
                    handleChangeText(e.currentTarget.value, question.id)
                  }
                />
              );
            case SurveyAnsType.ARRAY:
              return (
                <SurveyDragDrop
                  choices={sortQuestion}
                  setSortChoices={setSortQuestion}
                />
              );
            case SurveyAnsType.SUB_QUESTION:
              return (
                <Fragment>
                  {question?.subQuestions?.map((subQuestion: any) => {
                    switch (subQuestion.type) {
                      case SurveyAnsType.TEXT:
                        if (
                          subQuestion.id === "loan_amount" &&
                          !answers[0][0]?.ans.includes("Refinance") &&
                          !answers[0][0]?.ans.includes("Bridge")
                        ) {
                          return null;
                        }
                        return (
                          <InputField
                            label={subQuestion.label ?? ""}
                            key={subQuestion.id}
                            type={
                              subQuestion.id !== "property_address_a" &&
                              subQuestion.id !== "property_address_b" &&
                              subQuestion.id !== "property_address_c"
                                ? "number"
                                : "text"
                            }
                            onChange={(e) =>
                              handleChangeText(
                                e.currentTarget.value,
                                subQuestion.id,
                              )
                            }
                          />
                        );
                      case SurveyAnsType.ONE_CHOICE:
                        return (
                          <div
                            key={subQuestion.id}
                            className="w-full flex flex-col gap-4"
                          >
                            <div className="font-medium font-HelveticaNeue text-base text-light_finance-textbody leading-6">
                              {subQuestion.content}
                            </div>
                            {subQuestion?.choice.map(
                              (option: any, option_index: any) => (
                                <SurveyRadioItem
                                  key={option_index}
                                  label={option}
                                  name={subQuestion.id.toString()}
                                  id={`radio_${subQuestion.id}_${option_index}`}
                                  onChangeAnswer={() =>
                                    handelChangeRadio(
                                      option,
                                      subQuestion.id,
                                      false,
                                    )
                                  }
                                />
                              ),
                            )}
                          </div>
                        );
                    }
                  })}
                </Fragment>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default SurveyUnit;
