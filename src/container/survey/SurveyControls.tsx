import React from "react";
import CancelBtn from "@components/common/button/cancel-btn";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import { useTranslation } from "react-i18next";

interface SurveyNavigationProps {
  currentIndex: number;
  surveyLength: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const SurveyControls: React.FC<SurveyNavigationProps> = ({
  currentIndex,
  surveyLength,
  handlePrevious,
  handleNext,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <CancelBtn label={t("survey.back")} handleOnClick={handlePrevious} />
      <PrimarySubmitBtn
        name={
          currentIndex < surveyLength - 1
            ? t("survey.next")
            : t("survey.submit_modal_submit")
        }
        handleSubmit={handleNext}
      />
    </div>
  );
};

export default SurveyControls;
