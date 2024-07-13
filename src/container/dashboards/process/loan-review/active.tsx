const LoanStatus = ({
  title,
  icon,
  className,
  styleText,
}: {
  title?: string;
  isShowFile?: boolean;
  icon?: string;
  className?: string;
  styleText?: string;
}) => {
  return (
    <div className="flex mb-3">
      <div
        className={`px-3 py-2 bg-cyan-50 rounded-lg flex items-center gap-3 my-5 md:my-0 ${className}`}
      >
        <div className="w-6 h-6">
          <img src={icon} alt="Warning icon" />
        </div>
        <div
          className={`text-[16px] font-normal font-['Helvetica Neue'] leading-tight ${styleText}`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default LoanStatus;
