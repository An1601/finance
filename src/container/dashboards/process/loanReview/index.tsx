import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import api from "@api/axios";
import { ApplicationForm, StatusCheck } from "@type/types";
import { toast } from "react-toastify";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import LoanStatus from "./active";
import { Status, StatusProcess } from "@type/enum";
import Warning from "@assets/icon/Warning.svg";
import Pdf from "@assets/icon/Pdf.svg";
import Faild from "@assets/icon/Faild.svg";

interface AnswerData {
  answers: { [key: string]: any };
}

interface ViewTerm {
  file_name: string;
}

const LoanReview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<ApplicationForm>();
  const { loanId } = useParams();
  const [answerData, setAnswersData] = useState<AnswerData>({ answers: {} });
  const [check, setCheck] = useState<StatusCheck>();
  const [term, setTerm] = useState<ViewTerm>();
  const [file, setfile] = useState<any[]>([]);

  const transformData = (data: {
    [key: string]: any;
  }): { [key: number]: any } => {
    const newData: { [key: number]: any } = {};
    let index = 1;
    for (let key in data) {
      newData[index] = data[key];
      index++;
    }
    return newData;
  };

  const fetchDataFrom = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/application-form/render/${loanId}`);
      if (response.status === 200) {
        setFormData(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  const fetchDataAnswer = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/application-form/view/answer/${loanId}`);
      if (response.status === 200) {
        setAnswersData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  const fetchViewTerm = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/loans/view/term/${loanId}`);
      if (response.status === 200) {
        setTerm(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  const fetchDataTerm = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/loans/download-term/${loanId}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        if (response.status === 200) {
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = term?.file_name || "downloaded_file";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  const fetchDataFileDoc = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(
        `/application-form/view/documents/${loanId}`,
      );
      if (response.status === 200) {
        setfile(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  const fetchDataViewFileDoc = async (path: string) => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.get(`/signed-url/${path}`);
      if (response.status === 200) {
        const url = response.data.url;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  const fetchCheck = async () => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.post(`/list-loans-submit/process/${loanId}`);
      if (response.status === 200) {
        setCheck(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  useEffect(() => {
    fetchDataFrom();
    fetchDataAnswer();
    fetchCheck();
    fetchViewTerm();
    fetchDataFileDoc();
  }, [loanId]);

  const HeaderStatus = () => {
    if (check?.current_step === StatusProcess.LOAN_SUBMIT) {
      if (check?.status === Status.NO_2) {
        return (
          <LoanStatus
            title="Your application form is waiting for bank review"
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.NO_3) {
        return (
          <LoanStatus
            title="The loan application have been rejected"
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    } else if (check?.current_step === StatusProcess.BANK_REVIEW) {
      if (check?.status === Status.NO_2) {
        return (
          <LoanStatus
            title="The bank has reviewed your loan application and sent term to you"
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.NO_3) {
        return (
          <LoanStatus
            title="The loan application have been rejected"
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    } else if (check?.current_step === StatusProcess.ELIGIBILITY_ASSESSMENT) {
      if (check?.status === Status.NO_2) {
        return (
          <LoanStatus
            title="The bank has checked Eligibility Assessment"
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.NO_3) {
        return (
          <LoanStatus
            title="Unfortunately, Your application form has been rejected"
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    } else if (check?.current_step === StatusProcess.APPROVAL_LOAN_APP) {
      if (check?.status === Status.NO_2) {
        return (
          <LoanStatus
            title="Congratulations! The bank has approved your loan "
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.NO_3) {
        return (
          <LoanStatus
            title="Reject Eligibility Assessment"
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
      <HeaderStatus />
      <div className=" w-full py-3 text-center bg-white text-light_finance-textbody font-bold text-base leading-6 tracking-tighter rounded-[5px] ">
        {t("process.loanSubmit.title")}
      </div>
      <div className="w-full flex flex-col gap-3 mt-1 md:flex-row md:gap-10 xl:gap-20">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-3">
            {formData?.application_form_sections?.map((section, index) => (
              <div
                className="w-full bg-white p-4 rounded-md border-[1px] border-stroke"
                key={index}
              >
                <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7 mb-2">
                  {section?.order_num}. {section?.name}
                </div>
                {section?.field_application_forms?.map((question, index) => (
                  <div className="flex flex-col gap-4 px-4 " key={index}>
                    <div className="flex justify-between flex-wrap ">
                      <div className="font-HelveticaNeue font-normal text-[18px] leading-5 text-light_finance-textsub dot-before">
                        {question.field_name} :
                      </div>
                      <div
                        className="font-medium text-[16px] leading-5 tracking-tight text-light_finance-textbody py-2 "
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(
                            transformData(answerData.answers)[`${question.id}`],
                          )
                            ? transformData(answerData.answers)[
                                `${question.id}`
                              ].join("<br/>")
                            : transformData(answerData.answers)[
                                `${question.id}`
                              ],
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("profile.document")}
          </div>
        </div>
        {file.map((item, index) => {
          return (
            <div className="flex flex-col gap-4 px-4" key={index}>
              <div className="flex justify-between flex-wrap mt-2">
                <div className="font-HelveticaNeue font-normal text-[18px] leading-5 text-light_finance-textsub dot-before">
                  {item?.file_name}
                </div>
                <a
                  className="font-medium text-[16px] leading-5 tracking-tight py-2 text-light_finance-primary cursor-pointer underline"
                  onClick={() => fetchDataViewFileDoc(item.path)}
                >
                  {t("process.loanSubmit.link")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("process.loanSubmit.requestDoc")}
          </div>
        </div>
        <div className="w-full border border-[#C8D0DD] text-sm p-3 rounded-sm my-3 font-normal">
          {formData?.description}
        </div>
      </div>
      <div className="w-full flex justify-between items-center bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("process.loanSubmit.term")}
          </div>
        </div>
        <div className="py-2 bg-white rounded-lg flex items-center gap-8 mt-5 md:mt-0">
          {term ? (
            <>
              <div className="flex items-center gap-1">
                <img className="w-6 h-6" src={Pdf} alt="PDF icon" />
                <div className="text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-tight">
                  {term.file_name}
                </div>
              </div>
              <div
                className="text-sm font-medium font-['Helvetica Neue'] leading-tight text-light_finance-primary cursor-pointer underline"
                onClick={() => fetchDataTerm()}
              >
                {t("process.loanSubmit.download")}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <PrimarySubmitBtn
          name="Check"
          type="submit"
          handleSubmit={() => {
            fetchCheck();
          }}
        />
      </div>
    </div>
  );
};

export default LoanReview;
