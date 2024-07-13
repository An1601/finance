import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { useNavigate, useParams } from "react-router-dom";
import api from "@api/axios";
import { ApplicationFormType } from "@type/types";
import { toast } from "react-toastify";
import { useLocalStorage } from "@utils/index";
import LoanFormField from "./QuestionItem";
import { useLoading } from "@components/hook/useLoading";
import Loader from "@components/common/loader";

interface Answers {
  [key: number]: any;
}

interface Errors {
  [key: number]: boolean;
}

const LoanAppSubmit = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ApplicationFormType>();
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const { getItem, setItem } = useLocalStorage();
  const { loanId } = useParams();
  const { isLoading, toggleLoading } = useLoading();

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
    const storageItem = getItem(`loanSubmit_${loanId}`);
    if (storageItem) {
      const storedData = JSON.parse(storageItem);
      setAnswers(storedData.answers);
    }
  }, []);

  const handleInputChange = (fieldId: any, value: any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldId]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldId]: !value,
    }));
  };

  const handleDateChange = (fieldId: any, date: any) => {
    const formattedDate = formatDate(date);
    handleInputChange(fieldId, formattedDate);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldId]: !date,
    }));
  };

  const handleRadioChange = (fieldId: any, value: any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldId]: [value],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldId]: !value,
    }));
  };

  const handleCheckboxChange = (fieldId: number, value: any) => {
    setAnswers((prevAnswers) => {
      const currentValues = prevAnswers[fieldId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: any) => v !== value)
        : [...currentValues, value];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldId]: newValues.length === 0,
      }));
      return {
        ...prevAnswers,
        [fieldId]: newValues,
      };
    });
  };

  const validateFields = () => {
    const newErrors: Errors = {};
    formData?.application_form_sections?.forEach((section) => {
      section?.field_application_forms?.forEach((question) => {
        if (!answers[question.id]) {
          newErrors[question.id] = true;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.error(t("process.loanSubmit.requiedForm"));
      return;
    }
    const data = {
      loan_business_list_id: loanId,
      answers: answers,
    };

    setItem(`loanSubmit_${loanId}`, JSON.stringify(data));
    navigate(`/process/loan-submit-confirm/${loanId}`);
  };

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full pt-10 px-6 flex flex-col gap-6 md:gap-5 items-center">
      <div className="w-full px-6 py-3 bg-white rounded-[5px] shadow justify-between items-center inline-flex">
        <div className="w-full text-slate-900 text-base font-bold font-['Helvetica Neue'] leading-normal tracking-tight text-center">
          {t("process.loanSubmit.titleLoan")}
        </div>
      </div>
      {formData?.application_form_sections?.map((section, index) => {
        return (
          <div className="w-full bg-white p-6 rounded-md" key={index}>
            <div className="font-HelveticaNeue font-bold text-xl leading-7 tracking-tight text-light_finance-text">
              {section?.order_num}. {section?.name}
            </div>
            <div className="flex flex-col gap-8 mt-4">
              {section?.field_application_forms?.map((question) => (
                <div key={question?.id} className="">
                  <LoanFormField
                    t={t}
                    question={question}
                    answers={answers}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                    handleRadioChange={handleRadioChange}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="w-full flex flex-col gap-4 items-center">
        <PrimarySubmitBtn
          name={t("process.loanSubmit.create")}
          type="submit"
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoanAppSubmit;
