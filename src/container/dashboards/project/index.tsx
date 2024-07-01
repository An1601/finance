import api from "@api/axios";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectIcon from "@components/svg/ProjectIcon";
import { ProjectItemType } from "@type/types";
import Breadcrumb from "@components/common/breadcrumb";
import Loader from "@components/common/loader";
import bg1 from "@assets/images/authentication/1.svg";
import { LoadingContext } from "@components/hook/useLoading";

const Projects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const [projects, setProjects] = useState<ProjectItemType[]>([]);

  const handleGetTopProjects = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/list-project");
      if (response.status === 200) {
        setProjects(response.data.data);
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
    handleGetTopProjects();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 px-5 sm:px-0">
        <div className="hidden sm:block">
          <Breadcrumb primaryText={t("home.yourProject")} />
        </div>
        <div className="py-8 flex items-center gap-2 sm:hidden">
          <i
            className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
            {t("home.yourProject")}{" "}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-6 gap-y-3 mb-10">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 flex items-center py-2 px-3 gap-2 cursor-pointer bg-white rounded-lg shadow-md"
              onClick={() => {
                if (project.status) navigate(`/loan-list/${project.id}`);
                else toast.info(t("home.blankPrjInfo"));
              }}
            >
              <ProjectIcon isActive={project.status} />
              <div className="w-full py-1 font-HelveticaNeue font-medium text-base leading-4 text-light_finance-textbody text-truncate">
                {project.project_name}
              </div>
              <i className="fa-solid fa-chevron-up rotate-90 fa-xl cursor-pointer"></i>
            </div>
          ))}
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

export default Projects;
