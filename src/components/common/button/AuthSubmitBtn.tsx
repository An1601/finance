const AuthSubmitBtn: React.FC<{ name: string; handleSubmit?: () => void }> = ({
  name,
}) => {
  return (
    <div className="w-[280px] flex flex-col items-center ">
      <div
        className={
          "w-[280px] px-3 py-4 rounded-[28px] flex justify-center items-center bg-light_finance-primary drop-shadow-[0_6px_6px_rgba(50,215,75,0.35)] text-light_finance-textbody"
        }
      >
        <div className="text-base font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
          {name}
        </div>
      </div>
    </div>
  );
};

export default AuthSubmitBtn;
