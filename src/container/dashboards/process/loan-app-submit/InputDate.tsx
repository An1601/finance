import DatePicker from "react-datepicker";
import { UseFormRegisterReturn } from "react-hook-form";

interface DatePickerFieldProps {
  label?: string;
  selected?: Date | null;
  onChange?: (date: any) => void;
  error?: any;
  register?: UseFormRegisterReturn;
}

const InputDate: React.FC<DatePickerFieldProps> = ({
  label,
  selected,
  register,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-slate-600 text-sm font-normal font-HelveticaNeue leading-none tracking-tight">
        {label}
      </div>
      <div
        className={`w-full h-12 rounded-lg border ${
          error ? "border-red" : "border-[#C8D0DD]"
        }  flex items-center py-2`}
      >
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="MM/dd/yyyy"
          className="w-full text-light_finance-textbody text-sm font-normal leading-tight border-none outline-none"
          placeholderText="MM/DD/YYYY"
          ref={register?.ref}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    </div>
  );
};

export default InputDate;
