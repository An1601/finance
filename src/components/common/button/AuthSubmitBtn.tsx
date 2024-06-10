interface AuthSubmitBtnProps {
  name: string;
  handleSubmit?: () => void;
  type?: "button" | "submit" | "reset";
  dataHsOverlay?: string;
  customClass?: string;
}
const AuthSubmitBtn: React.FC<AuthSubmitBtnProps> = ({
  name,
  handleSubmit,
  type,
  dataHsOverlay,
  customClass,
}) => {
  return (
    <button
      className={`w-full max-w-[280px] px-3 py-4 rounded-[28px] flex justify-center items-center bg-light_finance-primary drop-shadow-[0_6px_6px_rgba(50,215,75,0.35)] text-light_finance-textbody ${customClass}`}
      type={type}
      onClick={handleSubmit}
      data-hs-overlay={dataHsOverlay}
    >
      <div className="text-base text-light_finance-textbody font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
        {name}
      </div>
    </button>
  );
};

export default AuthSubmitBtn;
