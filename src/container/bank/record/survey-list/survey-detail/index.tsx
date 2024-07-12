import api from "@api/axios";
import Breadcrumb from "@components/common/breadcrumb";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import calendar from "@assets/icon/CalendarIcon.svg";
import bg1 from "@assets/images/authentication/1.svg";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { surveyFullQuestion } from "@constant/SurveyQuestion";
import SelectSurveyModal from "./SelectFormModal";

interface SurveyAns {
  finance_type: string[];
  collateral_type: string[];
  property_address: string[];
  property_valuation: number;
  loan_amount: number;
  number_unit: number;
  total_square_footage: number;
  property_rent: number;
  property_taxe: number;
  property_insurance: number;
  utilities: number;
  repair_maintenance: number;
  management_fee: number;
  finance_goal: string[];
  property_own?: string;
  credit_score?: string;
  net_worth?: string;
  liquidity?: string;
  income?: string;
}
interface SurveyAnsProps {
  id: number;
  business_name: string;
  thumbnail: null;
  time_submit: string;
  state: number;
  survey: SurveyAns;
}
export interface RcmLoanProps {
  id: number;
  name: string;
  time_began?: string;
  description?: string;
}

const BankSurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useLoading();
  const [loanList, setLoanList] = useState<RcmLoanProps[]>([]);
  const [survey, setSurvey] = useState<SurveyAnsProps>();
  const [rcmLoan, setRcmLoan] = useState<number[]>([]);
  const [assignedLoan, setAssignedLoann] = useState<number[]>([]);
  const { t } = useTranslation();
  let questionNum = 0;

  const handleGetSurveyDetail = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/bank/surveys/${id}`);
      if (response.status === 200) {
        setSurvey(response.data.data[0]);
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };
  const handleGetRecommendLoans = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/bank/loans-public`);
      if (response.status === 200) {
        setLoanList(response.data.data);
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };
  const handleGetAssignedLoans = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/bank/loan-offers/${id}`);
      if (response.status === 200) {
        setAssignedLoann(response.data.data);
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    handleGetSurveyDetail();
    handleGetRecommendLoans();
  }, []);
  useEffect(() => {
    if (survey?.state) handleGetAssignedLoans();
  }, [survey?.id]);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SelectSurveyModal
        rcmLoan={rcmLoan}
        setRcmLoan={setRcmLoan}
        loanList={loanList}
        surveyId={survey?.id}
        assignedLoan={assignedLoan}
      />
      <div className="relative z-10 w-full flex flex-col min-h-[95vh]">
        <div className="hidden sm:block">
          <Breadcrumb
            primaryText={t("sideBar.record")}
            secondaryText={t("sideBar.surveyList")}
            thirdText={t("surveyBank.detail")}
          />
        </div>
        <div className="sm:hidden mx-6 my-7 flex gap-3 md:gap-2 items-center">
          <i
            className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
            {t("process.loanDetail.title")}
          </div>
        </div>

        <div className="flex-1 mx-6 sm:mx-0 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
          <div className="bg-white sm:hidden shadow py-3 flex items-center justify-center rounded-[24px]">
            <div className="text-base font-bold leading-6 font-HelveticaNeue text-light_finance-textbody uppercase">
              {t("process.loanDetail.title")}
            </div>
          </div>
          <div className="flex-1 sm:flex-0 p-6 flex flex-col gap-3 bg-white rounded-[28px]">
            <div className="hidden sm:flex justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src={
                    survey?.thumbnail ??
                    "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg"
                  }
                  className="h-[44px] min-w-[44px] xl:h-[4.5rem] xl:min-w-[4.5rem] rounded-full overflow-hidden"
                />
                <div className="flex flex-col justify-center">
                  <div className="font-HelveticaNeue font-normal text-xs md:text-sm leading-4 tracking-tight text-light_finance-textsub text-truncate">
                    {survey?.business_name}
                  </div>
                  <div className="font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate">
                    {t("surveyBank.surveyDisplayName")}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-end">
                <div className="flex gap-6 items-center">
                  <div className="flex gap-2">
                    <div>{t("process.loanDetail.id")}</div>
                    <div>{survey?.id}</div>
                  </div>
                  <div className="flex gap-1">
                    <img className="h-5 w-5" src={calendar} />
                    <div>{survey?.time_submit}</div>
                  </div>
                  {survey?.state ? (
                    <div className="bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
                      <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-sm leading-4 px-3 py-1 whitespace-nowrap">
                        {t("surveyBank.loanSent")}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#FFE9C9] rounded-sm inline-flex items-center justify-center">
                      <div className="text-center font-HelveticaNeue font-medium text-light_finance-secondary text-sm leading-4 px-3 py-1 whitespace-nowrap">
                        {t("consulting.pending")}
                      </div>
                    </div>
                  )}
                </div>
                <PrimarySubmitBtn
                  name={t("surveyBank.sendLoan")}
                  customClass="!px-3 !py-2 !w-fit rounded-xl"
                  dataHsOverlay="#select-loan-modal"
                />
              </div>
            </div>
            <div className="flex sm:hidden flex-col gap-1">
              <div className="w-full flex gap-6 items-center justify-between">
                <div className="flex gap-6 items-center">
                  <div className="flex gap-2">
                    {t("process.loanDetail.id")}
                    <div>{survey?.id}</div>
                  </div>
                  <div className="flex gap-1">
                    <img className="h-5 w-5" src={calendar} />
                    <div>{survey?.time_submit}</div>
                  </div>
                </div>
                {survey?.state ? (
                  <div className="bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
                    <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-sm leading-4 px-3 py-1 whitespace-nowrap">
                      {t("surveyBank.loanSent")}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FFE9C9] rounded-sm inline-flex items-center justify-center">
                    <div className="text-center font-HelveticaNeue font-medium text-light_finance-secondary text-sm leading-4 px-3 py-1 whitespace-nowrap">
                      {t("consulting.pending")}
                    </div>
                  </div>
                )}
              </div>
              <div className="font-HelveticaNeue font-bold text-base md:text-xl leading-7 text-light_finance-textbody text-truncate uppercase">
                {t("surveyBank.surveyDisplayName")}
              </div>
            </div>
            <hr className="hidden sm:block w-full h-[1px] bg-stroke" />
            <div className="flex flex-col gap-9 ">
              {surveyFullQuestion?.map((unit) =>
                unit.map((question) => {
                  questionNum += 1;
                  return (
                    <div className="flex flex-col gap-3" key={question.id}>
                      <div className="text-base leading-6 text-light_finance-textbody font-semibold tracking-tight font-HelveticaNeue">
                        {`${questionNum}. ${question.content}`}
                      </div>
                      {!question.subQuestions ? (
                        <div className="w-full flex gap-6 flex-wrap">
                          {Array.isArray(
                            survey?.survey[question.id as keyof SurveyAns],
                          ) ? (
                            (
                              survey?.survey[
                                question.id as keyof SurveyAns
                              ] as string[]
                            ).map((opt, subindex) => (
                              <div
                                key={subindex}
                                className="px-4 py-2 bg-light_finance-background1 rounded-[20px]"
                              >
                                <div className="text-sm leading-5 text-light_finance-textbody font-bold tracking-tight font-HelveticaNeue">
                                  {opt}
                                  <span className="font-normal">
                                    {" "}
                                    {question.label}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 bg-light_finance-background1 rounded-[20px]">
                              <div className="text-sm leading-5 text-light_finance-textbody font-bold tracking-tight font-HelveticaNeue">
                                {survey?.survey[question.id as keyof SurveyAns]}
                                <span className="font-normal">
                                  {" "}
                                  {question.label}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : question.id === "property_address" ? (
                        <div className="flex gap-6 flex-wrap">
                          {question.subQuestions.map((subQuestion, index) => (
                            <div
                              key={subQuestion.id}
                              className="px-4 py-2 bg-light_finance-background1 rounded-[20px]"
                            >
                              <div className="text-sm leading-5 text-light_finance-textbody font-bold tracking-tight font-HelveticaNeue">
                                {survey?.survey["property_address"][index]}{" "}
                                <span className="font-normal">
                                  {subQuestion.label}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        question.subQuestions.map((subQuestion) => (
                          <div
                            key={subQuestion.id}
                            className="w-full flex justify-start items-center gap-3"
                          >
                            <div className="text-base leading-6 text-light_finance-textbody font-normal tracking-tight font-HelveticaNeue dot-before">
                              {subQuestion.content ?? subQuestion.label}
                            </div>
                            <div className="flex gap-6 flex-wrap">
                              {Array.isArray(
                                survey?.survey[
                                  subQuestion.id as keyof SurveyAns
                                ],
                              ) ? (
                                (
                                  survey?.survey[
                                    question.id as keyof SurveyAns
                                  ] as string[]
                                ).map((opt, subindex) => (
                                  <div
                                    key={subindex}
                                    className="px-4 py-2 bg-light_finance-background1 rounded-[20px]"
                                  >
                                    <div className="text-sm leading-5 text-light_finance-textbody font-bold tracking-tight font-HelveticaNeue">
                                      {opt}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-2 bg-light_finance-background1 rounded-[20px]">
                                  <div className="text-sm leading-5 text-light_finance-textbody font-bold tracking-tight font-HelveticaNeue">
                                    {
                                      survey?.survey[
                                        subQuestion.id as keyof SurveyAns
                                      ]
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                }),
              )}
            </div>
            <div className="w-full flex justify-center">
              <PrimarySubmitBtn
                name={t("surveyBank.sendLoan")}
                customClass={"sm:!hidden"}
                dataHsOverlay="#select-loan-modal"
              />
            </div>
          </div>
        </div>
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

export default BankSurveyDetail;
