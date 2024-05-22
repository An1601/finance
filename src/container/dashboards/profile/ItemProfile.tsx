import React from "react";
import Switch from "./Switch";
import ArrowIcon from "@assets/icon/ArrowIcon.svg";

type MenuItem = {
  icon: string;
  text: string;
  onClick?: () => void;
};

type MenuItemComponentProps = {
  item: MenuItem;
  index: number;
  totalItems: number;
  isOn: boolean;
  handleToggle: () => void;
  className?: string;
};

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  index,
  totalItems,
  isOn,
  handleToggle,
  className,
}) => (
  <div
    onClick={item.onClick}
    className={`px-[24px] py-3 flex flex-row items-center border-[1px] bg-white border-[#e9eaef] cursor-pointer hover:bg-[#E7FFFC] ${className}
        ${index === 0 ? "rounded-t-[12px]" : ""}
        ${index === totalItems - 1 ? "rounded-b-[12px]" : ""}
      `}
  >
    <img src={item.icon} alt={item.text} />
    <div className="text-slate-900 text-base leading-normal tracking-tight">
      {item.text}
    </div>
    {item.text === "Notifications" ? (
      <Switch isOn={isOn} handleToggle={handleToggle} className="ml-auto" />
    ) : (
      <img src={ArrowIcon} alt="arrow icon" className="ml-auto" />
    )}
  </div>
);

export default MenuItemComponent;
