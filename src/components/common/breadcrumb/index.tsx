import React from "react";
import ChevronsRight from "@assets/icon/ChevronsRight.svg";

interface BreadcrumbProp {
  primaryText?: string;
  secondaryText?: string;
  thirdText?: string;
}
const Breadcrumb: React.FC<BreadcrumbProp> = ({
  primaryText,
  secondaryText,
  thirdText,
}) => {
  return (
    <div className="flex flex-row items-center gap-2 mt-[32px] mb-[20px]">
      <div className=" justify-start items-center gap-5 inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
          <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
            {primaryText}
          </div>
          {secondaryText && (
            <>
              <img className="w-5 h-5 relative" src={ChevronsRight} />
              <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-tight">
                {secondaryText}
              </div>
            </>
          )}
          {thirdText && (
            <>
              <i className="fa-solid fa-chevron-right fa-sm"></i>
              <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-tight">
                {thirdText}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
