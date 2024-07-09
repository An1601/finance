import { useTranslation } from "react-i18next";

const RequestItem = ({
  description,
}: {
  description: string | null | undefined;
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-danger rounded-sm" />
        <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
          {t("process.loanSubmit.requestDoc")}
        </div>
      </div>
      <div className="w-full border border-[#C8D0DD] text-sm p-3 rounded-sm my-3 font-normal">
        {description}
      </div>
    </div>
  );
};

export default RequestItem;
