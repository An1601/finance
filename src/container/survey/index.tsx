import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyProgress from "./SurveyProgress";
import AlertModals from "./AlertModals";
import {
  surveyProjectQuestion,
  surveyFullQuestion,
  surveyUnitLength,
} from "@constant/SurveyQuestion";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useUser } from "@redux/useSelector";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { handleCheckSubmit } from "@redux/userReducers";
import { AppDispatch } from "@redux/store";
import { modalShow } from "@components/common/alert-modal";
import SurveyUnit from "./SurveyUnit";
import { SurveyAnsEnum } from "@type/enum";
import SurveyControls from "./SurveyControls";
import { LoadingContext } from "@components/hook/useLoading";
import Loader from "@components/common/loader";

const SurveyIndex: React.FC = () => {
  const user = useUser();
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const surveyQuestion = user.check_submit
    ? surveyProjectQuestion
    : surveyFullQuestion;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentIndex, setCurrenIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ id: string; ans: string[] }[]>
  >(Array.from({ length: surveyQuestion.length }, () => []));
  const [sortQuestion, setSortQuestion] = useState(
    surveyQuestion[6].find((item) => item.id === "8")?.choice ?? [],
  );

  const handleAnswer = (
    value: { id: string; ans: string[] }[],
    changedIndex: number = currentIndex,
  ) => {
    setAnswers(() =>
      answers.map((row, index) => (index === changedIndex ? value : row)),
    );
  };

  const handleChangeText = (value: string, idQuestion: string) => {
    const answer = answers[currentIndex]?.find(
      (item) => item.id === idQuestion,
    );
    if (answer) {
      if (!value) {
        handleAnswer(
          answers[currentIndex].filter((item) => item.id !== idQuestion),
        );
      } else {
        handleAnswer(
          answers[currentIndex].map((item) =>
            item.id === idQuestion ? { ...item, ans: [value] } : item,
          ),
        );
      }
    } else {
      handleAnswer([
        ...answers[currentIndex],
        { id: idQuestion, ans: [value] },
      ]);
    }
  };

  const handelChangeRadio = (
    value: string,
    idQuestion: string,
    isInput: boolean,
  ) => {
    const answer = answers[currentIndex]?.find(
      (item) => item.id === idQuestion,
    );
    if (answer) {
      if (isInput) {
        handleAnswer(
          answer.ans.length > 1
            ? answers[currentIndex].map((item) =>
                item.id === idQuestion
                  ? {
                      ...item,
                      ans: item.ans.map((answer, index) =>
                        index === 1 ? value : answer,
                      ),
                    }
                  : item,
              )
            : answers[currentIndex].map((item) =>
                item.id === idQuestion
                  ? { ...item, ans: [...item.ans, value] }
                  : item,
              ),
        );
      } else {
        handleAnswer(
          answers[currentIndex].map((item) =>
            item.id === idQuestion ? { ...item, ans: [value] } : item,
          ),
        );
      }
    } else {
      handleAnswer([
        ...answers[currentIndex],
        { id: idQuestion, ans: [value] },
      ]);
    }
  };

  const handelChangeCheckbox = (value: string, idQuestion: string) => {
    const answer = answers[currentIndex]?.find(
      (item) => item.id === idQuestion,
    );
    if (answer) {
      if (answer?.ans.includes(value)) {
        if (answer.ans.length > 1) {
          handleAnswer([
            { id: idQuestion, ans: answer.ans.filter((ans) => ans !== value) },
          ]);
        } else {
          handleAnswer([]);
        }
      } else {
        handleAnswer([{ id: idQuestion, ans: [...answer.ans, value] }]);
      }
    } else {
      handleAnswer([
        ...answers[currentIndex],
        { id: idQuestion, ans: [value] },
      ]);
    }
  };

  const hanldePrevious = () => {
    if (currentIndex > 0) {
      setCurrenIndex(currentIndex - 1);
    }
  };

  const hanldeNext = () => {
    if (currentIndex >= surveyQuestion.length - 1) {
      checkSubmitSurvey();
    } else {
      setCurrenIndex(currentIndex + 1);
    }
  };

  const checkDoneUnit = (index: number) => {
    if (index === 3) {
      return (
        answers[index].length ===
        (answers[0][0]?.ans.includes("Refinance") ||
        answers[0][0]?.ans.includes("Bridge")
          ? 2
          : 1)
      );
    }
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

  const mapBodyRequest = () => {
    const result: { [key: string]: any } = {};
    const mapIdToKey = (id: string): string | undefined => {
      for (const key in SurveyAnsEnum) {
        if (SurveyAnsEnum[key as keyof typeof SurveyAnsEnum] === id) {
          return key;
        }
      }
      return undefined;
    };

    const propertyAddressValues: string[] = [];
    answers.forEach((group) => {
      group.forEach((item) => {
        const key = mapIdToKey(item.id);
        if (key) {
          if (key.startsWith("property_address")) {
            propertyAddressValues.push(...item.ans);
          } else {
            if (item.ans.length > 1 || item.id === "1" || item.id === "2") {
              result[key] = item.ans;
            } else {
              result[key] = item.ans[0];
            }
          }
        }
      });
    });

    if (propertyAddressValues.length > 0) {
      result["property_address"] = propertyAddressValues;
    }

    return result;
  };

  const handleSubmitSurvey = async () => {
    try {
      toggleLoading(true);
      const response = await api.post(
        `${user.check_submit ? "survey/store-survey" : "/survey/store-first-survey"}`,
        mapBodyRequest(),
      );

      if (response.status === 200) {
        dispatch(handleCheckSubmit(true));
        toast.success(
          <div className="sm:w-[380px] flex flex-col">
            <div className="text-base font-bold leading-8 text-light_finance-textbody">
              Successfully!!
            </div>
            <div>{t("survey.survey_success")}</div>
          </div>,
        );
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError"),
      );
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    if (currentIndex === 6) handleAnswer([{ id: "8", ans: sortQuestion }], 6);
  }, [sortQuestion, currentIndex]);

  useEffect(() => {
    modalShow("survey-begin-modal");
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen lg:min-h-full w-screen z-10 pt-7 md:pt-10 flex flex-col gap-6">
      <AlertModals handleSubmitSurvey={handleSubmitSurvey} />
      <div className="flex gap-3 items-center mx-6 lg:hidden">
        <i
          className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
          onClick={() => navigate("/")}
        ></i>
        <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
          {t("survey.title")}
        </div>
      </div>
      <div className="w-full flex-1 bg-light_finance-background rounded-t-[1.5rem] pb-20 flex flex-col justify-between items-center gap-10">
        <div className="w-full sm:max-w-xl flex flex-col gap-9 pt-8 px-6">
          <SurveyProgress
            answers={answers}
            currentIndex={currentIndex}
            checkDoneUnit={checkDoneUnit}
          />
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
                <SurveyUnit
                  key={question.id}
                  question={question}
                  currentIndex={currentIndex}
                  answers={answers}
                  handleChangeText={handleChangeText}
                  handelChangeRadio={handelChangeRadio}
                  handelChangeCheckbox={handelChangeCheckbox}
                  setSortQuestion={setSortQuestion}
                  sortQuestion={sortQuestion}
                />
              ))}
            </div>
          ))}
        </div>
        <SurveyControls
          currentIndex={currentIndex}
          surveyLength={surveyQuestion.length}
          handlePrevious={hanldePrevious}
          handleNext={hanldeNext}
        />
      </div>
    </div>
  );
};

export default SurveyIndex;
