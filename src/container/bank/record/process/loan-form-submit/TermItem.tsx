import { FC } from "react";
import Pdf from "@assets/icon/Pdf.svg";
import { useTranslation } from "react-i18next";

interface TermComponentProps {
  fileName?: string;
  handleDownTerm: () => void;
}
const TermItem: FC<TermComponentProps> = ({ fileName, handleDownTerm }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-between items-center bg-white p-4 rounded-md border-[1px] border-stroke mt-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-danger rounded-sm" />
        <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
          {t("process.loanSubmit.term")}
        </div>
      </div>
      <div className="py-2 bg-white rounded-lg flex items-center gap-8 mt-5 md:mt-0">
        <>
          <div className="flex items-center gap-1">
            <img className="w-6 h-6" src={Pdf} alt="PDF icon" />
            <div className="text-sm md:text-base font-normal font-['Helvetica Neue'] leading-tight">
              {fileName}
            </div>
          </div>
          <div
            className="text-sm md:text-base font-medium font-['Helvetica Neue'] leading-tight text-light_finance-primary cursor-pointer underline"
            onClick={handleDownTerm}
          >
            {t("process.loanSubmit.download")}
          </div>
        </>
      </div>
    </div>
  );
};

export default TermItem;
