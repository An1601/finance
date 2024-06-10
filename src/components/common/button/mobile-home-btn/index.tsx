const MobileHomeBtn: React.FC<{ name: string; handleSubmit?: () => void }> = ({
  name,
  handleSubmit,
}) => {
  return (
    <button
      onClick={handleSubmit}
      className="w-[86px] h-9 px-4 py-2 bg-light_finance-primary rounded-lg justify-center items-center gap-1 inline-flex"
    >
      <div className="text-center text-white text-sm font-medium font-['Helvetica Neue'] leading-tight">
        {name}
      </div>
    </button>
  );
};

export default MobileHomeBtn;
