const SurveyRadioItem = ({
  label,
  name,
  onChangeAnswer,
}: {
  label: string;
  name: string;
  onChangeAnswer: () => void;
}) => {
  return (
    <div className="w-full h-[52px] relative">
      <input
        type="radio"
        className="h-5 w-5 peer absolute top-4 right-4"
        name={name}
        onChange={onChangeAnswer}
      />
      <div
        className={`w-full h-[52px] p-4 peer-checked:border-[1px] peer-checked:border-light_finance-primary peer-checked:bg-white bg-light_finance-input_bg rounded-[7px] border justify-between items-center inline-flex`}
      >
        <div className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight">
          {label}
        </div>
      </div>
    </div>
  );
};

export default SurveyRadioItem;
