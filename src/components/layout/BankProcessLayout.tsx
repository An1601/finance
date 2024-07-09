import ProcessHeaderBank from "@container/bank/record/process/header";

const BankProcessLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full flex flex-col my-7">
      <ProcessHeaderBank />
      {children}
    </div>
  );
};

export default BankProcessLayout;
