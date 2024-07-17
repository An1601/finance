import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "@api/axios";
import { ApplicationFormType, StatusCheck } from "@type/types";
import { toast } from "react-toastify";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import LoanStatus from "@container/dashboards/process/loan-review/active";
import Warning from "@assets/icon/Warning.svg";
import CancelBtn from "@components/common/button/cancel-btn";
import { BankReviewStatus, Status, StatusProcess } from "@type/enum";
import Faild from "@assets/icon/Faild.svg";
import TermItem from "./TermItem";
import RequestItem from "./RequestItem";
import { useNavigate } from "react-router-dom";

interface AnswerData {
  answers: { [key: string]: any };
}

interface FileName {
  id: number;
  term_name: string;
}

const LoanFormBank = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApplicationFormType>();
  const searchParams = new URLSearchParams(location.search);
  const loanId = searchParams.get("loanId");
  const recordId = searchParams.get("recordId");
  const formdId = searchParams.get("formId");
  const [answerData, setAnswersData] = useState<AnswerData>({ answers: {} });
  const [check, setCheck] = useState<StatusCheck>();
  const [file, setfile] = useState<any[]>([]);
  const { isLoading, toggleLoading } = useLoading();
  const [loanDetail, setLoanDetail] = useState<FileName>();
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  const transformData = (data: {
    [key: string]: any;
  }): { [key: number]: any } => {
    const newData: { [key: number]: any } = {};
    let index = 1;
    for (const key in data) {
      newData[index] = data[key];
      index++;
    }
    return newData;
  };

  const fetchDataFrom = async () => {
    try {
      const response = await api.get(`/application-form/render/${formdId}`);
      if (response.status === 200) {
        setFormData(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
    }
  };

  const fetchDataAnswer = async () => {
    try {
      const response = await api.get(
        `/application-form/view/answer/${recordId}`,
      );
      if (response.status === 200) {
        setAnswersData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const fetchDataFileDoc = async () => {
    try {
      const response = await api.get(
        `/application-form/view/documents/${recordId}`,
      );
      if (response.status === 200) {
        setfile(response.data.data);
      }
    } catch (error) {}
  };

  const fetchDataViewFileDoc = async (path: string) => {
    toggleLoading(true);
    try {
      const response = await api.get(`/signed-url/${path}`);
      if (response.status === 200) {
        const url = response.data.url;
        if (isIOS) {
          window.location.href = url;
        } else {
          const newWindow = window.open(url, "_blank");
          if (
            !newWindow ||
            newWindow.closed ||
            typeof newWindow.closed == "undefined"
          ) {
            toast.error("Pop-up blocked! Please allow pop-ups for this site.");
          }
        }
      } else {
        throw new Error("Failed to fetch URL");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      toggleLoading(false);
    }
  };

  const fecthGetLoanDetail = async () => {
    try {
      const response = await api.get(`/loans/${loanId}`);
      if (response.status === 200) {
        setLoanDetail(response.data.data);
      }
    } catch (error) {}
  };

  const fetchDataTerm = async () => {
    try {
      const response = await api.get(`/loans/download-term/${loanDetail?.id}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        if (response.status === 200) {
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = loanDetail?.term_name || "downloaded_file";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {}
  };

  const fetchCheck = async () => {
    try {
      const response = await api.post(`/list-loans-submit/process/${recordId}`);
      if (response.status === 200) {
        setCheck(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const handleReject = async () => {
    toggleLoading(true);
    try {
      const response = await api.post(`/bank/review-loan`, {
        record_id: recordId,
        status: BankReviewStatus.REJECT,
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  const handleSubmit = async () => {
    toggleLoading(true);
    try {
      const response = await api.post(`/bank/review-loan`, {
        record_id: recordId,
        status:
          check?.current_step === StatusProcess.LOAN_SUBMIT
            ? BankReviewStatus.SENDTERM
            : check?.current_step === StatusProcess.BANK_REVIEW
              ? BankReviewStatus.ELIGIBILITY
              : check?.current_step === StatusProcess.ELIGIBILITY_ASSESSMENT
                ? BankReviewStatus.APPOVAL
                : "",
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  const fetchDataProcess = async () => {
    toggleLoading(true);
    try {
      await Promise.all([
        fetchDataFrom(),
        fetchDataAnswer(),
        fetchDataFileDoc(),
        fetchCheck(),
        fecthGetLoanDetail(),
      ]);
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  const FooterStatus = () => {
    if (check?.current_step === StatusProcess.LOAN_SUBMIT) {
      if (check?.status === Status.APPROVAL) {
        return (
          <div className="flex flex-row items-center justify-center mt-5 mb-5 gap-4">
            <CancelBtn
              label={t("packageLoanList.reject")}
              handleOnClick={() => {
                handleReject();
              }}
            />
            <PrimarySubmitBtn
              name={t("processBank.approve")}
              type="submit"
              handleSubmit={() => {
                handleSubmit();
              }}
            />
          </div>
        );
      }
    } else if (check?.current_step === StatusProcess.BANK_REVIEW) {
      if (check?.status === Status.APPROVAL) {
        return (
          <div className="flex flex-row items-center justify-center mt-5 mb-5 gap-4">
            <CancelBtn
              label={t("packageLoanList.reject")}
              handleOnClick={() => {
                handleReject();
              }}
            />
            <PrimarySubmitBtn
              name={t("processBank.confrim")}
              type="submit"
              handleSubmit={() => {
                handleSubmit();
              }}
            />
          </div>
        );
      }
    } else if (check?.current_step === StatusProcess.ELIGIBILITY_ASSESSMENT) {
      if (check?.status === Status.APPROVAL) {
        return (
          <div className="flex flex-row items-center justify-center mt-5 mb-5 gap-4">
            <CancelBtn
              label={t("packageLoanList.reject")}
              handleOnClick={() => {
                handleReject();
              }}
            />
            <PrimarySubmitBtn
              name={t("processBank.approve")}
              type="submit"
              handleSubmit={() => {
                handleSubmit();
              }}
            />
          </div>
        );
      }
    }

    return null;
  };

  const HeaderStatus = () => {
    if (check?.current_step === StatusProcess.LOAN_SUBMIT) {
      if (check?.status === Status.APPROVAL) {
        return (
          <LoanStatus
            title={t("processBank.statusCheck")}
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      }
    } else if (check?.current_step === StatusProcess.BANK_REVIEW) {
      if (check?.status === Status.APPROVAL) {
        return (
          <LoanStatus
            title={t("processBank.statusBank")}
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.REJECTED) {
        return (
          <LoanStatus
            title={t("processBank.statusReject")}
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    } else if (check?.current_step === StatusProcess.ELIGIBILITY_ASSESSMENT) {
      if (check?.status === Status.APPROVAL) {
        return (
          <LoanStatus
            title={t("processBank.statusEligibility")}
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.REJECTED) {
        return (
          <LoanStatus
            title={t("processBank.statusReject")}
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    } else if (check?.current_step === StatusProcess.APPROVAL_LOAN_APP) {
      if (check?.status === Status.APPROVAL) {
        return (
          <LoanStatus
            title={t("processBank.statusApprove")}
            icon={Warning}
            className="bg-[#E7FFFC]"
            styleText="text-light_finance-primary"
          />
        );
      } else if (check?.status === Status.REJECTED) {
        return (
          <LoanStatus
            title={t("processBank.statusReject")}
            icon={Faild}
            className="bg-[#FFF3F4]"
            styleText="text-[#F65160]"
          />
        );
      }
    }
    return null;
  };

  useEffect(() => {
    if (loanId && recordId && formdId) {
      fetchDataProcess();
    }
  }, [loanId, recordId, formdId]);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
      <HeaderStatus />
      <div className="w-full py-3 text-center bg-white text-light_finance-textbody font-bold text-base md:text-lg leading-6 tracking-tighter rounded-[5px]">
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
                  <div className="flex flex-col px-4 mb-2" key={index}>
                    <div className="flex items-center">
                      <div className="w-2/3 font-HelveticaNeue font-normal text-[16px] md:text-[18px] leading-5 text-light_finance-textsub dot-before">
                        {question.field_name} :
                      </div>
                      <div
                        className="flex w-1/3 justify-end font-medium text-[14px] md:text-[16px] leading-5 tracking-tight text-light_finance-textbody py-2"
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
        {file.map((item, index) => (
          <div className="flex flex-col gap-4 px-4" key={index}>
            <div className="flex justify-between flex-wrap mt-2">
              <div className="font-HelveticaNeue font-normal text-[16px] md:text-[18px] leading-5 text-light_finance-textsub dot-before">
                {item?.file_name}
              </div>
              <a
                className="font-medium text-[14px] md:text-[16px] leading-5 tracking-tight py-2 text-light_finance-primary cursor-pointer underline"
                onClick={() => fetchDataViewFileDoc(item?.path)}
              >
                {t("process.loanSubmit.link")}
              </a>
            </div>
          </div>
        ))}
      </div>
      {check?.current_step === StatusProcess.BANK_REVIEW && (
        <TermItem
          fileName={loanDetail?.term_name}
          handleDownTerm={() => {
            fetchDataTerm();
          }}
        />
      )}
      {check?.current_step === StatusProcess.ELIGIBILITY_ASSESSMENT ||
      check?.current_step === StatusProcess.APPROVAL_LOAN_APP ? (
        <>
          <RequestItem description={formData?.description} />
          <TermItem
            fileName={loanDetail?.term_name}
            handleDownTerm={() => {
              fetchDataTerm();
            }}
          />
        </>
      ) : null}
      <FooterStatus />
      {check?.current_step === StatusProcess.LOAN_SUBMIT && (
        <div
          className="flex justify-center font-medium text-[14px] md:text-[16px] leading-5 tracking-tight py-2 text-light_finance-primary cursor-pointer underline"
          onClick={() =>
            navigate(
              `/bank/process/request-document?loanId=${loanId}&recordId=${recordId}&formId=${formdId}`,
            )
          }
        >
          {t("processBank.requestDoc")}
        </div>
      )}
    </div>
  );
};

export default LoanFormBank;
