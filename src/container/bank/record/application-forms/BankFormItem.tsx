import { ApplicationFormType } from "@type/types";
import calendar from "@assets/icon/CalendarIcon.svg";
import EditIcon from "@components/svg/Edit";
import DeleteIcon from "@components/svg/Delete";
import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import { useTranslation } from "react-i18next";
import { LoanFormState } from "@type/enum";
import { toast } from "react-toastify";
import api from "@api/axios";
import { useLoading } from "@components/hook/useLoading";
import Loader from "@components/common/loader";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { showSweetAlert } from "@components/sweet-alert/Alert";

const BankFormItem = ({
  formItem,
  fetchForms,
}: {
  formItem: ApplicationFormType;
  fetchForms: () => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useLoading();

  const hanldeChangeState = async (state: number) => {
    toggleLoading(true);
    try {
      const response = await api.post(
        `/application-form/update-form-visibility/${formItem.id}`,
        {
          visibility: state,
        },
      );
      if (response.status === 200) {
        fetchForms();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };
  const hanldeDeleteForm = async () => {
    toggleLoading(true);
    try {
      const response = await api.delete(
        `/bank/application-forms/${formItem.id}/delete`,
      );
      if (response.status === 200) {
        fetchForms();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <a
      href={`/bank/form/${formItem.id}`}
      className="px-4 py-[18px] bg-white flex justify-between rounded-xl cursor-pointer"
    >
      <div className="flex flex-col gap-2 py-[10px]c">
        <div className="font-HelveticaNeue font-bold text-light_finance-textbody text-xl leading-7">
          {formItem.name}
        </div>
        <div className="flex gap-[2px]">
          <img className="h-5 w-5" src={calendar} />
          <div className="font-HelveticaNeue font-normal text-sm leading-5 text-light_finance-textbody">
            {formItem.created_at &&
              new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(formItem.created_at))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-end justify-center">
        {formItem.visibility === LoanFormState.DRAFT && (
          <div className="flex w-fit gap-7">
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/bank/form/${formItem.id}`);
              }}
            >
              <EditIcon color={"#45556E"} />
            </div>
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                showSweetAlert(
                  hanldeDeleteForm,
                  t("warning.title"),
                  t("warning.content"),
                  t("consulting.delete"),
                  t("survey.submit_modal_close"),
                );
              }}
            >
              <DeleteIcon color={"#45556E"} />
            </div>
          </div>
        )}
        {formItem.visibility === LoanFormState.DRAFT && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MobileHomeBtn
              name={t("bankForm.public")}
              handleSubmit={() =>
                showSweetAlert(
                  () => hanldeChangeState(LoanFormState.PUBLIC),
                  t("warning.title"),
                  t("warning.content"),
                  t("bankForm.public"),
                  t("survey.submit_modal_close"),
                )
              }
            />
          </div>
        )}
        {formItem.visibility === LoanFormState.PUBLIC && (
          <Fragment>
            <div className="bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
              <div className="text-center font-HelveticaNeue font-medium text-[#00D097] text-sm leading-4 px-2 py-[2px] whitespace-nowrap">
                {t("bankForm.published")}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MobileHomeBtn
                name={t("bankForm.close")}
                className="bg-rose-600 text-white"
                handleSubmit={() => hanldeChangeState(LoanFormState.CLOSE)}
              />
            </div>
          </Fragment>
        )}
        {formItem.visibility === LoanFormState.CLOSE && (
          <Fragment>
            <div className="bg-[#FFD4D8] rounded-sm inline-flex items-center justify-center">
              <div className="text-center font-HelveticaNeue font-medium text-[#F65160] text-sm leading-4 px-2 py-[2px] whitespace-nowrap">
                {t("bankForm.closed")}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MobileHomeBtn
                name={t("bankForm.restore")}
                className="!bg-[#408CFF]"
                handleSubmit={() => hanldeChangeState(LoanFormState.PUBLIC)}
              />
            </div>
          </Fragment>
        )}
      </div>
    </a>
  );
};

export default BankFormItem;
