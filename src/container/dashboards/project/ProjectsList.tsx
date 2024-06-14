import ProjectIcon from "@components/svg/ProjectIcon";
import { ProjectItemType } from "@type/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectsList = ({ projects }: { projects: ProjectItemType[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-3">
      {projects?.map((project) => (
        <div
          key={project.id}
          className="col-span-4 flex flex-col justify-between items-center cursor-pointer"
          onClick={() => {
            if (project.status) navigate(`/loan-list/${project.id}`);
            else toast.info(t("home.blankPrjInfo"));
          }}
        >
          <ProjectIcon isActive={project.status} />
          <div className="w-full py-1 font-HelveticaNeue font-normal text-xs leading-4 text-light_finance-textbody text-center text-truncate">
            {project.project_name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
