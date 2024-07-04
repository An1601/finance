import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { MENU_PROCESS } from "@constant/processItemData";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLoading } from "@components/hook/useLoading";
import api from "@api/axios";
import { StatusCheck } from "@type/types";
import { StatusProcess } from "@type/enum";

const ProcessHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentPath = window.location.pathname;
  const [activeIndex, setActiveIndex] = useState(0);
  const { loanId } = useParams();
  const { toggleLoading } = useLoading();
  const [check, setCheck] = useState<StatusCheck>();

  const fetchCheck = async () => {
    toggleLoading(true);
    try {
      const response = await api.post(`/list-loans-submit/process/${loanId}`);
      if (response.status === 200) {
        setCheck(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCheck();
  }, []);

  useEffect(() => {
    if (
      currentPath.includes(`/book-meeting-success/${loanId}`) ||
      currentPath.includes(`/loan-submit/${loanId}`) ||
      currentPath.includes(`/loan-submit-confirm/${loanId}`)
    ) {
      setActiveIndex(1);
    } else if (currentPath.includes(`/loan-review/${loanId}`)) {
      setActiveIndex(2);
    } else if (check?.current_step === StatusProcess.ELIGIBILITY_ASSESSMENT) {
      setActiveIndex(3);
    } else if (check?.current_step === StatusProcess.APPROVAL_LOAN_APP) {
      setActiveIndex(4);
    } else {
      setActiveIndex(0);
    }
  }, [check?.current_step, currentPath]);

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex items-center justify-between px-6">
        <div className="flex gap-3 items-center md:hidden">
          <i
            className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
            {t("process.title")}
          </div>
        </div>
        <div className="hidden gap-3 items-center md:flex">
          <div className="md:block hidden w-1 h-5 bg-danger rounded-sm" />
          <div className="flex gap-2 items-center">
            <span className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
              {t("home.packageLoansList")}
            </span>
            <i className="fa-solid fa-angles-right fa-lg"></i>
            <span className="text-sm text-light_finance-textsub font-normal font-HelveticaNeue">
              {t("process.title")}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden ml-[18px]">
        <div
          className={`relative flex items-center justify-between right-[${148 * (activeIndex - 1)}px]`}
        >
          {MENU_PROCESS.map((item, index) => (
            <Fragment key={item.id}>
              <div className="flex flex-col gap-2 items-center mt-1">
                {index < activeIndex ? item.iconActive : item.icon}
                <div className="w-[100px] h-8 font-HelveticaNeue text-center text-[11.5px] font-bold text-light_finance-textbody tracking-tight">
                  {item.name}
                </div>
              </div>
              {index !== MENU_PROCESS.length - 1 && (
                <div className=" bg-light_finance-textsub flex-1">
                  <div className="h-px min-w-12"></div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessHeader;
