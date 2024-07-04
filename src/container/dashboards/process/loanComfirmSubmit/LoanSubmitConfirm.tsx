import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@utils/index";
import CancelBtn from "@components/common/button/cancel-btn";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@api/axios";
import { ApplicationForm } from "@type/types";
import { useLoading } from "@components/hook/useLoading";
import Loader from "@components/common/loader";

interface Answers {
  [key: number]: any;
}
interface LoanForm {
  answers: Answers;
}

const LoanSubmitConfirm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loanForm, setLoanForm] = useState<LoanForm>({
    answers: {},
  });
  const { getItem, removeItem } = useLocalStorage();
  const { loanId } = useParams();
  const [formData, setFormData] = useState<ApplicationForm>();
  const [files, setFiles] = useState<File[]>([]);
  const { isLoading, toggleLoading } = useLoading();

  const mapDataBody = (arr: Answers) => {
    const mappedObject = Object.keys(arr).reduce(
      (result, key) => {
        const fieldKey = `field_${key}`;
        result[fieldKey] = arr[parseInt(key)];
        return result;
      },
      {} as { [key: string]: any },
    );
    return mappedObject;
  };

  const fetchDataFrom = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/application-form/render/${loanId}`);
      if (response.status === 200) {
        setFormData(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFrom();
  }, []);

  const handleSubmitLoanForm = async () => {
    toggleLoading(true);
    try {
      const response = await api.post("/application-form/store-answer", {
        loan_business_list_id: loanId,
        answers: mapDataBody(loanForm.answers),
      });
      if (response.status === 200) {
        removeItem(`loanSubmit_${loanId}`);
      }
    } catch (error) {
      toast.error("Form submission failed");
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    const storageItem = getItem(`loanSubmit_${loanId}`);
    if (storageItem) setLoanForm(JSON.parse(storageItem));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        return updatedFiles;
      });
    }
  };

  const handleSubmitFile = async () => {
    toggleLoading(true);
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_name[${index}]`, file);
      });
      formData.append("loan_business_list_id", loanId as string);
      const response = await api.post(
        "/application-form/upload-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
      }
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  const handleFileDelete = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      return updatedFiles;
    });
  };

  const handleSubmitBoth = async () => {
    if (files.length === 0) {
      const userConfirmed = window.confirm(
        "Are you sure you don't want to add document",
      );
      if (!userConfirmed) {
        return;
      }
    }
    toggleLoading(true);
    try {
      await Promise.all([handleSubmitLoanForm(), handleSubmitFile()]);
      toast.success(t("process.loanSubmit.formSuccess"));
      navigate(`/loan-review/${loanId}`);
    } catch (error) {
      toast.error("Form submission failed");
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="ww-full mt-10 mx-6 flex flex-col gap-1 drop-shadow-[0_4px_4px_rgba(196,203,214,0.15)]">
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
                <div className="font-HelveticaNeue font-bold text-xl leading-7 tracking-tight text-light_finance-text mb-2">
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
                            loanForm.answers[`${question.id}`],
                          )
                            ? loanForm.answers[`${question.id}`].join("<br/>")
                            : loanForm.answers[`${question.id}`],
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-danger rounded-sm" />
                <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                  {t("profile.document")}
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 items-center">
                <div
                  className="text-light_finance-primary text-base font-medium font-HelveticaNeue underline leading-normal tracking-tight cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  {t("process.loanSubmit.addDoc")}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="text-sm text-slate-600 flex items-center gap-2"
                    >
                      {file.name}
                      <i
                        onClick={() => handleFileDelete(index)}
                        className="fa-solid fa-trash fa-[24px] text-red cursor-pointer"
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 mb-5 gap-4">
        <CancelBtn
          label={t("process.edit")}
          handleOnClick={() => {
            navigate(`/loan-submit/${loanId}`);
          }}
        />
        <PrimarySubmitBtn
          name={t("forgotPassword.send")}
          type="submit"
          handleSubmit={handleSubmitBoth}
        />
      </div>
    </div>
  );
};

export default LoanSubmitConfirm;
