import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import ProjectIcon from "@components/svg/ProjectIcon";
import { useUser } from "@redux/useSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useUser();
  const [showInfo, setShowInfo] = useState(false);

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
          {Array.from({ length: user.check_submit ? 1 : 0 }).map((_, index) => (
            <div
              key={index}
              className="relative col-span-4 flex flex-col justify-between items-center cursor-pointer"
              onClick={() => setShowInfo(!showInfo)}
            >
              <ProjectIcon isActive={false} />
              {showInfo && (
                <div className="">
                  <div className="absolute shadow-lg -top-[75px] left-8 w-[278px] flex items-center bg-white rounded-md gap-2 px-3 py-2 ">
                    <div>
                      <i className="fa-solid fa-circle-info text-light_finance-primary fa-xl"></i>
                    </div>
                    <div className="text-sm font-HelveticaNeue font-normal text-light_finance-primary">
                      {t("home.blankPrjInfo")}
                    </div>
                  </div>
                  <div className="absolute -top-6 border-l-[1rem] border-l-transparent border-r-[1rem] border-r-transparent border-t-[1.5rem] border-t-white"></div>
                </div>
              )}
              <div className="py-1 font-HelveticaNeue font-normal text-xs leading-4 text-light_finance-textbody text-center">
                {t("home.merchantCash")}
              </div>
            </div>
          ))}
        </div>
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
}

export default Projects;
