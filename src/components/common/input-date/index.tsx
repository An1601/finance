import React from "react";
import DatePicker from "react-datepicker";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFieldProps {
  label: string;
  selected: Date | null;
  onChange: (date: any) => void;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  selected,
  onChange,
  error,
  register,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <div
        className={`w-full h-[52px] px-1 py-2 bg-light_finance-background rounded-[0.5rem] border-[1px] ${
          error ? "border-red" : "border-light_finance-texttitle"
        } flex justify-between items-center`}
      >
        <div className="w-full flex items-center justify-between">
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
        <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
          <div
            className={`${
              error ? "text-red" : "text-light_finance-textsub"
            } text-xs font-normal leading-none`}
          >
            {label}
          </div>
        </div>
      </div>
      {error && typeof error.message === "string" && (
        <div className="text-red text-[12px] font-normal leading-4 tracking-tight">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
