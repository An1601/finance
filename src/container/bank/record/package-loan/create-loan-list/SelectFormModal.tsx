import { handleSelectForm } from "@redux/createLoanReducer";
import { AppDispatch } from "@redux/store";
import { useCreateLoan } from "@redux/useSelector";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const SelectFormModal = () => {
  const { t } = useTranslation();
  const loanData = useCreateLoan();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div id="select-form-modal" className="hs-overlay ti-modal hidden">
      <div className="w-full h-full px-6 ti-modal-box flex justify-center items-center">
        <div className="w-full ti-modal-content h-auto min-h-[50vh] max-h-[95vh] p-6 overflow-scroll !border !border-defaultborder dark:!border-defaultborder/10 !rounded-[0.5rem]">
          <div className="w-full pb-4 flex gap-2 justify-between items-center">
            <div className="text-center text-xl font-HelveticaNeue font-semibold">
              {t("createLoanForm.selectForm")}
            </div>
            <i
              className="fa-solid fa-x fa-lg cursor-pointer"
              data-hs-overlay="#select-form-modal"
            ></i>
          </div>
          <div className="flex flex-col">
            {loanData.formList.map((form) => (
              <label
                key={form.id}
                className="w-fit px-4 py-2 max-w-full flex gap-2 items-center"
                htmlFor={`form_${form.id}`}
              >
                <input
                  type="checkbox"
                  id={`form_${form.id}`}
                  checked={form.id === loanData.selectedForm}
                  className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary cursor-pointer"
                  onClick={() => {
                    if (form.id === loanData.selectedForm) {
                      dispatch(handleSelectForm(undefined));
                    } else dispatch(handleSelectForm(form.id));
                  }}
                />
                <span className="text-base font-HelveticaNeue font-normal text-light_finance-textbody">
                  {form.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFormModal;
