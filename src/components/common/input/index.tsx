import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import EyeOpen from "@assets/icon/EyeOpen.svg";
import EyeSlash from "@assets/icon/EyeSlash.svg";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  isPassword?: boolean;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  register,
  error,
  isPassword,
  showPassword,
  toggleShowPassword,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <div
        className={`w-full h-[52px] px-4 py-2 bg-light_finance-background rounded-[0.5rem] border-[1px] ${
          error ? "border-red" : "border-light_finance-texttitle"
        } flex justify-between items-center`}
      >
        <div className="w-full gap-2 flex items-center justify-between">
          <input
            className="w-full text-light_finance-textbody text-sm font-normal leading-tight border-none outline-none"
            placeholder={placeholder}
            type={isPassword && !showPassword ? "password" : type}
            value={value}
            onChange={onChange}
            {...register}
          />
          {isPassword && (
            <div onClick={toggleShowPassword}>
              {showPassword ? <img src={EyeOpen} /> : <img src={EyeSlash} />}
            </div>
          )}
        </div>
        <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
          <div
            className={`${error ? "text-red" : "text-light_finance-textsub"} text-xs font-normal leading-none`}
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

export default InputField;
