const CustomAddBtn = ({
  handleOnclick,
  name,
}: {
  handleOnclick?: () => void;
  name: string;
}) => {
  return (
    <button
      className="w-[180px] px-3 py-2 rounded-xl flex justify-evenly items-center bg-light_finance-primary drop-shadow-[0_6px_6px_rgba(50,215,75,0.35)] text-light_finance-textbody "
      onClick={handleOnclick}
    >
      <i className="fa-solid fa-plus text-light_finance-primary fa-xl py-4 px-2 rounded-full bg-white"></i>
      <div className="text-sm text-white font-semibold font-['Helvetica Neue'] leading-normal tracking-tight">
        {name}
      </div>
    </button>
  );
};
export default CustomAddBtn;
