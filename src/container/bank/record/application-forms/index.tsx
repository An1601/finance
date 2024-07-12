import BankTabHeader from "@components/common/bank-tab-header";
import BottomBarCustom from "@components/common/bottom-bar";
import ProfileHeader from "@components/common/header/ProfileHeader";
import BankSurveyFilter from "../survey-list/SurveyFilter";
import { useTranslation } from "react-i18next";
import Notification from "@components/common/header/Notification";
import { useLoading } from "@components/hook/useLoading";
import { useEffect, useState } from "react";
import BankFormItem from "./BankFormItem";
import { ApplicationFormType } from "@type/types";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import bg1 from "@assets/images/authentication/1.svg";
import Loader from "@components/common/loader";
import { useNavigate } from "react-router-dom";

const BankApplicationForms = () => {
  const { t } = useTranslation();
  const [forms, setForms] = useState<ApplicationFormType[]>([]);
  const { isLoading, toggleLoading } = useLoading();
  const navigate = useNavigate();

  const handleGetForms = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/bank/application-forms");
      if (response.status === 200) {
        setForms(response.data);
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    handleGetForms();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BottomBarCustom />
      <div className=" z-10 relative mx-6 sm:mx-0 pt-7 pb-14">
        <div className="flex flex-col gap-8 sm:gap-5">
          <div className="flex sm:hidden justify-between">
            <ProfileHeader />
            <Notification />
          </div>
          <div className="w-full flex flex-col gap-6 sm:flex-row sm:gap-0 items-center justify-between">
            <div className="hidden gap-3 items-center sm:flex">
              <div className="sm:block hidden w-1 h-5 bg-danger rounded-sm" />
              <div className="flex gap-2 items-center">
                <span className="text-center text-light_finance-textbody text-xl font-bold font-HelveticaNeue leading-8">
                  {t("sideBar.record")}
                </span>
                <i className="fa-solid fa-angles-right fa-lg"></i>
                <span className="text-sm text-light_finance-textsub font-normal font-HelveticaNeue">
                  {t("sideBar.applicationForms")}
                </span>
              </div>
            </div>
            <BankTabHeader />
          </div>
          <div className="w-full flex flex-col gap-6 sm:flex-row sm:gap-0 items-center justify-between">
            <div className="w-full sm:w-fit">
              <BankSurveyFilter />
            </div>
            <button
              className="w-[200px] sm:w-[180px] lg:w-[200px] px-3 py-2 rounded-xl flex justify-evenly items-center bg-light_finance-primary drop-shadow-[0_6px_6px_rgba(50,215,75,0.35)] text-light_finance-textbody "
              onClick={() => navigate("/bank/form-create")}
            >
              <i className="fa-solid fa-plus text-light_finance-primary fa-xl py-4 px-2 rounded-full bg-white"></i>
              <div className="text-base text-white font-semibold font-['Helvetica Neue'] leading-normal tracking-tight">
                {t("bankForm.addForm")}
              </div>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-y-3 md:gap-y-5 md:gap-20">
            {forms?.map((form) => {
              return (
                <div className="col-span-2 md:col-span-1" key={form.id}>
                  <BankFormItem formItem={form} fetchForms={handleGetForms} />
                </div>
              );
            })}
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

export default BankApplicationForms;
