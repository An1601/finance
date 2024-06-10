import React from "react";
import AlertModal, { modalClose } from "@components/common/alert-modal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface AlertModalsProps {
  handleSubmitSurvey: () => void;
}

const AlertModals: React.FC<AlertModalsProps> = ({ handleSubmitSurvey }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <AlertModal
        id="survey-begin-modal"
        title={t("survey.start_modal_title")}
        content={t("survey.start_modal_content")}
        submitLabel={t("survey.start_modal_continue")}
        cancelLabel={t("survey.submit_modal_close")}
        handleSubmit={() => modalClose("survey-begin-modal")}
        handleCancel={() => navigate("/dashboard")}
      />
      <AlertModal
        id="survey-submit-modal"
        title={t("survey.submit_modal_title")}
        content={t("survey.submit_modal_content")}
        submitLabel={t("survey.submit_modal_submit")}
        cancelLabel={t("survey.submit_modal_close")}
        handleSubmit={handleSubmitSurvey}
      />
    </>
  );
};

export default AlertModals;
