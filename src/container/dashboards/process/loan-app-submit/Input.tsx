import { InputFieldProps } from "@components/common/input";
import EyeOpen from "@assets/icon/EyeOpen.svg";
import EyeSlash from "@assets/icon/EyeSlash.svg";

const Input: React.FC<InputFieldProps> = ({
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
    <div className="flex flex-col gap-2">
      <div className="font-HelveticaNeue font-bold text-sm text-light_finance-text">
        {label}
      </div>
      <div
        className={`w-full h-12 border-b-[1px] ${
          error ? "border-red" : "border-[#C1C7CD]"
        }  bg-white flex items-center px-4 py-2`}
      >
        <input
          className="w-full text-light_finance-textbody text-sm font-normal leading-tight border-none outline-none p-0 "
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
    </div>
  );
};

export default Input;
