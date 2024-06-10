import { Fragment } from "react/jsx-runtime";
import AuthSubmitBtn from "../button/AuthSubmitBtn";
import CancelBtn from "../button/cancelBtn";
import surveyIcon from "@assets/icon/surveyIcon.svg";
interface AlertModalProps {
  id: string;
  title?: string;
  content?: string;
  submitLabel?: string;
  cancelLabel?: string;
  handleCancel?: () => void;
  handleSubmit?: () => void;
}

export const modalShow = (id: string) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("hidden");
  }
};
export const modalClose = (id: string) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("hidden");
  }
};

const AlertModal: React.FC<AlertModalProps> = ({
  id,
  title,
  content,
  submitLabel,
  cancelLabel,
  handleSubmit,
  handleCancel = () => modalClose(id),
}) => {
  return (
    <Fragment>
      <div
        className="size-full ti-modal hidden fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        id={id}
      >
        <div className="w-full h-full px-10 flex items-center justify-center opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto">
          <div className="md:min-w-[380px] w-full flex flex-col p-6 gap-4 bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-start">
              <img className="" src={surveyIcon} />
            </div>
            <div className="font-HelveticaNeue font-bold text-light_finance-textbody text-[28px]">
              {title}
            </div>
            <div className="font-HelveticaNeue font-normal text-light_finance-textsub text-base">
              {content}
            </div>
            <div className="w-full flex justify-between items-center gap-5 ">
              {cancelLabel && (
                <CancelBtn
                  label={cancelLabel}
                  type="button"
                  customClass="hs-dropup-toggle rounded-xl flex-1 max-w-full"
                  handleOnClick={handleCancel}
                />
              )}
              {submitLabel && (
                <AuthSubmitBtn
                  name={submitLabel}
                  type="button"
                  customClass=" rounded-xl flex-1 max-w-full"
                  handleSubmit={() => {
                    modalClose(id);
                    if (handleSubmit) handleSubmit();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AlertModal;
