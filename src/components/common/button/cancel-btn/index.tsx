import React from "react";
interface cancelBtnProps {
  label: string;
  handleOnClick?: () => void;
  type?: "button" | "submit" | "reset";
  dataHsOverlay?: string;
  customClass?: string;
}
const CancelBtn: React.FC<cancelBtnProps> = ({
  label,
  handleOnClick,
  type,
  dataHsOverlay,
  customClass,
}) => {
  return (
    <button
      className={`w-full max-w-[280px] h-14 px-3 py-4 rounded-[28px] border-2 border-light_finance-primary justify-center items-center inline-flex hs-dropup-toggle ${customClass}`}
      onClick={handleOnClick}
      type={type}
      data-hs-overlay={dataHsOverlay}
    >
      <div className="text-light_finance-primary text-base font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
        {label}
      </div>
    </button>
  );
};

export default CancelBtn;
