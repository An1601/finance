import loanCategory from "@assets/icon/LoanCategoryIcon.svg";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12 flex flex-col gap-3 sm:gap-0 sm:bg-white rounded-lg">
      <div className="sm:px-5 sm:py-6 sm:border-b-[1px] sm:border-stroke flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("home.yourProject")}
          </div>
        </div>
        <i className="fa-solid fa-chevron-up hidden sm:block rotate-90 fa-xl"></i>
      </div>
      <div className="sm:p-5 ">
        <div className="grid grid-cols-12 gap-x-6 gap-y-5 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="col-span-4 flex flex-col gap-1 items-center"
            >
              <img
                src={loanCategory}
                className="rounded-full"
                width={52}
                height={52}
              />
              <div className="font-HelveticaNeue font-normal text-xs leading-4 text-light_finance-textbody">
                {t("home.merchantCash")}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-6 sm:mb-6">
          <AuthSubmitBtn
            name="Start new project"
            customClass="!w-[156px] rounded-xl !py-3"
            handleSubmit={() => navigate("/survey")}
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
