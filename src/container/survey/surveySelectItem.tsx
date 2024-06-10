const SurveySelectItem = ({
  label,
  onChangeAnswer,
}: {
  label: string;
  onChangeAnswer: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full h-[52px] relative">
      <input
        type="checkbox"
        id={label}
        name={label}
        className="absolute top-4 right-4 w-5 h-5 peer rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary  cursor-pointer"
        onChange={onChangeAnswer}
      />
      <label
        htmlFor={label}
        className="w-full h-[52px] p-4 peer-checked:border-[1px] peer-checked:border-light_finance-primary peer-checked:bg-white bg-light_finance-input_bg rounded-[7px] border justify-between items-center inline-flex cursor-pointer"
      >
        <div className="text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight">
          {label}
        </div>
      </label>
    </div>
  );
};

export default SurveySelectItem;
