import { FC, ReactNode } from "react";
import ArrowIcon from "../../../components/svg/Arrow";

interface AccountItemProps {
  Icon: FC;
  text?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

const AccountItem: FC<AccountItemProps> = ({
  Icon,
  text,
  onClick,
  children,
  className,
}) => {
  return (
    <div
      className={`px-[24px] py-3 flex flex-row items-center border-b-[1px] bg-white  border-[#e9eaef] cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon />
      <div className="text-slate-900 text-base leading-normal tracking-tight">
        {text}
      </div>
      {children ? children : <ArrowIcon className="ml-auto" />}
    </div>
  );
};

export default AccountItem;
