const MobileHomeBtn: React.FC<{
  name: string;
  handleSubmit?: () => void;
  isDisable?: boolean;
  className?: string;
}> = ({ name, handleSubmit, isDisable, className }) => {
  return (
    <button
      onClick={handleSubmit}
      className={`w-[86px] h-9 px-4 py-2 ${isDisable ? "bg-light_finance-textsub" : "bg-light_finance-primary items-center"} rounded-lg justify-center gap-1 inline-flex ${className}`}
    >
      <div className="text-center text-white text-sm font-medium font-['Helvetica Neue'] leading-tight">
        {name}
      </div>
    </button>
  );
};

export default MobileHomeBtn;
