const LoanConfirmItem = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="font-HelveticaNeue font-normal text-sm leading-5 text-light_finance-textsub dot-before">
        {label}
      </div>
      <div className="font-medium text-sm leading-5 tracking-tight text-light_finance-textbody">
        {value}
      </div>
    </div>
  );
};

export default LoanConfirmItem;
