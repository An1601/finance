const SurveyRadioItem = ({
  label,
  name,
  id,
  onChangeAnswer,
  checked,
}: {
  label?: string;
  name?: string;
  id?: string;
  onChangeAnswer?: () => void;
  checked?: boolean;
}) => {
  return (
    <div className="w-full h-[52px] relative">
      <input
        type="radio"
        className="h-5 w-5 peer absolute top-4 right-4"
        name={name}
        id={id}
        onChange={onChangeAnswer}
        checked={checked}
      />
      <label
        htmlFor={id}
        className={`w-full h-[52px] p-4 peer-checked:border-[1px] peer-checked:border-light_finance-primary peer-checked:bg-white bg-light_finance-input_bg rounded-[7px] border justify-between items-center inline-flex`}
      >
        <div className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight">
          {label}
        </div>
      </label>
    </div>
  );
};

export default SurveyRadioItem;
