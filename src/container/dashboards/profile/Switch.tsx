interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  className: string;
}

const Switch: React.FC<SwitchProps> = ({
  isOn,
  handleToggle,
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="hidden"
        id="react-switch"
        type="checkbox"
      />
      <label
        className={`${
          isOn ? "bg-[#02d2b4]" : "bg-[#c8d0dd]"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out cursor-pointer`}
        htmlFor="react-switch"
      >
        <span
          className={`${
            isOn ? "translate-x-6 bg-white" : "translate-x-1 bg-[#7d8592]"
          } inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out`}
        />
      </label>
    </div>
  );
};

export default Switch;
