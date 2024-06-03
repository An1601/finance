import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import { surveyQuestion, surveyUnitLength } from "@constant/SurveyQuestion";
import { SurveyAnsType } from "@type/enum";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyRadioItem from "./surveyRadioItem";
import InputField from "@components/common/input";
import SurveySelectItem from "./surveySelectItem";
import SurveyDragDrop from "./surveyDragDrop";
import AlertModal, {
  modalShow,
  modalClose,
} from "@components/common/alertModal/index";
import CancelBtn from "@components/common/button/cancelBtn";
import { useTranslation } from "react-i18next";

const SurveyIndex = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrenIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { id: string; ans: Array<string> }[][]
  >(Array.from({ length: surveyQuestion.length }, () => []));
  const [sortQuestion, setSortQuestion] = useState(
    surveyQuestion[6].find((item) => item.id === "8")?.choice ?? [],
  );

  const handleAnswer = (
    value: { id: string; ans: Array<string> }[],
    changedIndex: number = currentIndex,
  ) => {
    setAnswers(() => {
      return answers.map((row, index) => {
        return index === changedIndex ? value : row;
      });
    });
  };
  const handleChangeText = (value: string, idQuestion: string) => {
    const answer = answers[currentIndex]?.find(
      (item) => item.id === idQuestion,
    );
    if (answer) {
      if (!value) {
        handleAnswer(
          answers[currentIndex].filter((item) => {
            return item.id !== idQuestion;
          }),
        );
      } else
        handleAnswer(
          answers[currentIndex].map((item) => {
            if (item.id === idQuestion) {
              return { ...item, ans: [value] };
            }
            return item;
          }),
        );
    } else
      handleAnswer([
        ...answers[currentIndex],
        {
          id: idQuestion,
          ans: [value],
        },
      ]);
  };
  const handelChangeRadio = (value: string, idQuestion: string) => {
    const answer = answers[currentIndex]?.find(
      (item) => item.id === idQuestion,
    );
    if (answer)
      handleAnswer(
        answers[currentIndex].map((item) => {
          if (item.id === idQuestion) {
            return { ...item, ans: [value] };
          }
          return item;
        }),
      );
    else
      handleAnswer([
        ...answers[currentIndex],
        {
          id: idQuestion,
          ans: [value],
        },
      ]);
  };
  const handelChangeCheckbox = (value: string, idQuestion: string) => {
    const answer = answers[currentIndex]?.find(
      (item) => item.id === idQuestion,
    );
    if (answer) {
      if (answer?.ans.includes(value))
        if (answer.ans.length > 1)
          handleAnswer([
            {
              id: idQuestion,
              ans: answer.ans.filter((ans) => ans !== value),
            },
          ]);
        else handleAnswer([]);
      else
        handleAnswer([
          {
            id: idQuestion,
            ans: [...answer.ans, value],
          },
        ]);
    } else {
      handleAnswer([
        ...answers[currentIndex],
        {
          id: idQuestion,
          ans: [value],
        },
      ]);
    }
  };
  const hanldePrevious = () => {
    if (currentIndex > 0) {
      setCurrenIndex(currentIndex - 1);
    }
  };
  const hanldeNext = () => {
    if (currentIndex >= surveyQuestion.length - 1) checkSubmitSurvey();
    else setCurrenIndex(currentIndex + 1);
  };
  const checkDoneUnit = (index: number) => {
    if (index === 3)
      return (
        answers[index].length ===
        (answers[0][0]?.ans.includes("Refinance") ||
        answers[0][0]?.ans.includes("Bridge")
          ? 2
          : 1)
      );
    return answers[index].length === surveyUnitLength[index];
  };
  const checkSubmitSurvey = () => {
    const emptyIndex = answers.findIndex((_, index) => !checkDoneUnit(index));
    if (emptyIndex >= 0) {
      setCurrenIndex(emptyIndex);
    } else {
      modalShow("survey-submit-modal");
    }
  };
  const handleSubmitSurvey = () => {
    console.log(answers);
  };

  useEffect(() => {
    if (currentIndex === 7) handleAnswer([{ id: "8", ans: sortQuestion }], 6);
  }, [sortQuestion, currentIndex]);
  useEffect(() => {
    modalShow("survey-begin-modal");
  }, []);

  return (
    <div className="min-h-screen lg:min-h-full w-screen z-10 pt-7 md:pt-10 flex flex-col gap-6">
      <AlertModal
        id="survey-begin-modal"
        title={t("survey.start_modal_title")}
        content={t("survey.start_modal_content")}
        submitLabel={t("survey.start_modal_continue")}
        handleSubmit={() => modalClose("survey-begin-modal")}
      />
      <AlertModal
        id="survey-submit-modal"
        title={t("survey.submit_modal_title")}
        content={t("survey.submit_modal_content")}
        submitLabel={t("survey.submit_modal_submit")}
        cancelLabel={t("survey.submit_modal_close")}
        handleSubmit={handleSubmitSurvey}
      />
      <div className="flex gap-3 items-center mx-6 lg:hidden">
        <i
          className=" fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
          onClick={() => {
            navigate("/");
          }}
        ></i>
        <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
          {t("survey.tittle")}
        </div>
      </div>
      <div className="w-full flex-1 bg-light_finance-background rounded-t-[1.5rem] pb-20 flex flex-col justify-between items-center gap-10">
        <div className="w-full sm:max-w-xl flex flex-col gap-9 pt-8 px-6">
          <div className="w-full flex flex-col gap-1">
            <div className="w-full h-6 justify-between items-center inline-flex">
              {Array.from({ length: answers.length }).map((_, index) => (
                <i
                  key={index}
                  className={`${
                    !checkDoneUnit(index) ? "invisible" : ""
                  } text-light_finance-primary fa-solid fa-check h-6 w-6`}
                />
              ))}
            </div>
            <div className="w-full h-6 justify-start items-center inline-flex pl-[2px] pr-2">
              {Array.from({ length: answers.length }).map((_, index) => {
                return (
                  <Fragment key={index}>
                    {currentIndex === index ? (
                      <div className="font-HelveticaNeue text-sm text-light_finance-background bg-primary h-6 w-6 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                    ) : checkDoneUnit(index) ? (
                      <div className="w-1.5 h-1.5 bg-light_finance-primary rounded-full" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-light_finance-textsub rounded-full" />
                    )}
                    {index !== answers.length - 1 && (
                      <div className="grow shrink basis-0 h-px bg-light_finance-textsub" />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
          {currentIndex === 7 && (
            <div className="w-full font-HelveticaNeue text-lg font-bold leading-7 text-light_finance-primary text-center">
              {t("survey.interlude")}
            </div>
          )}
          {surveyQuestion.map((unit, index) => (
            <div
              key={index}
              className={`w-full flex flex-col gap-9 ${currentIndex !== index && "hidden"}`}
            >
              {unit.map((question) => (
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
                              {question?.choice?.map((option, sub_index) => (
                                <SurveyRadioItem
                                  key={sub_index}
                                  label={option}
                                  name={`radio_${question.id}`}
                                  onChangeAnswer={() =>
                                    handelChangeRadio(option, question.id)
                                  }
                                />
                              ))}
                            </Fragment>
                          );
                        case SurveyAnsType.MULTI_CHOICE:
                          return (
                            <Fragment>
                              {question?.choice.map((option, sub_index) => (
                                <SurveySelectItem
                                  key={sub_index}
                                  label={option}
                                  onChangeAnswer={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                  ) => {
                                    handelChangeCheckbox(
                                      e.currentTarget.id,
                                      question.id,
                                    );
                                  }}
                                />
                              ))}
                            </Fragment>
                          );
                        case SurveyAnsType.TEXT:
                          return (
                            <InputField
                              label={question?.label ?? ""}
                              onChange={(e) =>
                                handleChangeText(
                                  e.currentTarget.value,
                                  question.id,
                                )
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
                              {question?.subQuestions?.map((subQuestion) => {
                                switch (subQuestion.type) {
                                  case SurveyAnsType.TEXT:
                                    if (
                                      subQuestion.id === "4b" &&
                                      !answers[0][0]?.ans.includes(
                                        t("survey.question_1_choice2"),
                                      ) &&
                                      !answers[0][0]?.ans.includes(
                                        t("survey.question_1_choice4"),
                                      )
                                    ) {
                                      return;
                                    }
                                    return (
                                      <InputField
                                        label={subQuestion.label ?? ""}
                                        key={subQuestion.id}
                                        onChange={(e) => {
                                          handleChangeText(
                                            e.currentTarget.value,
                                            subQuestion.id,
                                          );
                                        }}
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
                                          (option, index) => (
                                            <SurveyRadioItem
                                              key={index}
                                              label={option}
                                              name={subQuestion.id.toString()}
                                              onChangeAnswer={() => {
                                                handelChangeRadio(
                                                  option,
                                                  subQuestion.id,
                                                );
                                              }}
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
              ))}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <CancelBtn label={t("survey.back")} handleOnClick={hanldePrevious} />
          <AuthSubmitBtn
            name={`${currentIndex < surveyQuestion.length - 1 ? t("survey.next") : t("survey.submit_modal_submit")}`}
            handleSubmit={hanldeNext}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyIndex;
