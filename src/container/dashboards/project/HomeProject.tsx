import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { ProjectItemType } from "@type/types";

const HomeProject = ({ projects }: { projects: ProjectItemType[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="col-span-12 xl:col-span-12 min-[675px]:col-span-6 flex flex-col gap-3 sm:gap-0 sm:bg-white rounded-lg">
      <div className="sm:px-5 sm:py-6 sm:border-b-[1px] sm:border-stroke flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("home.yourProject")}
          </div>
        </div>
        <i
          className="hidden sm:block fa-solid fa-chevron-up rotate-90 fa-xl cursor-pointer"
          onClick={() => {
            navigate("/projects");
          }}
        ></i>
        <div
          className="sm:hidden font-HelveticaNeue font-normal text-base leading-6 tracking-tighter underline text-light_finance-primary"
          onClick={() => {
            navigate("/projects");
          }}
        >
          {t("home.viewAll")}
        </div>
      </div>
      <div className="w-full sm:p-5">
        <ProjectsList projects={projects} />
        <div className="w-full flex justify-center mt-6 sm:mb-6">
          <PrimarySubmitBtn
            name="Start new project"
            customClass="!w-[156px] rounded-xl !py-3"
            handleSubmit={() => navigate("/survey")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeProject;
