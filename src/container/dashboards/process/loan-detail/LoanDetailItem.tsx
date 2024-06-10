const LoanDetailItem = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="flex justify-between">
      <div className="font-HelveticaNeue font-normal text-sm leading-5 text-light_finance-textbody dot-before">
        {label}
      </div>
      <div className="font-bold text-base leading-6 tracking-tight text-light_finance-textbody">
        {value}
      </div>
    </div>
  );
};

export default LoanDetailItem;
