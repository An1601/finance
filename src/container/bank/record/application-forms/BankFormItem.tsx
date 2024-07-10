import { ApplicationForm } from "@type/types";
import calendar from "@assets/icon/CalendarIcon.svg";
import EditIcon from "@components/svg/Edit";
import DeleteIcon from "@components/svg/Delete";
import MobileHomeBtn from "@components/common/button/mobile-home-btn";
import { useTranslation } from "react-i18next";
const BankFormItem = ({ formItem }: { formItem: ApplicationForm }) => {
  const { t } = useTranslation();
  return (
    <div className="px-4 py-[18px] bg-white flex justify-between rounded-xl">
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
      <div className="flex flex-col gap-3 items-end">
        <div className="flex w-fit gap-7">
          <EditIcon color={"#45556E"} />
          <DeleteIcon color={"#45556E"} />
        </div>
        <MobileHomeBtn name={t("surveyBank.view")} />
      </div>
    </div>
  );
};

export default BankFormItem;
