import { FilterOption } from "@type/enum";
import { useState } from "react";
import arrow from "@assets/icon/ArrowIcon.svg";
import filterIcon from "@assets/icon/FilterIcon.svg";
import { MEETING_FILTER_OPT } from "@constant/Constant";

const MeetingFilter = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [selectedLoanOpt, setSelectedLoanOpt] = useState(-1);

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value === selectedCheckbox ? null : value);
  };
  const updateSelectedLoanOpt = (value: number) => {
    if (selectedLoanOpt === value) setSelectedLoanOpt(-1);
    else setSelectedLoanOpt(value);
  };
  return (
    <div className="w-full md:w-fit flex items-center justify-between sm:justify-end sm:gap-6">
      {/* filter data */}
      <div className="relative">
        {/* filter btn */}
        <div className="w-[168px] h-12 flex justify-between px-4 py-3 bg-white rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)]">
          <div className="text-sm font-HelveticaNeue font-normal text-light_finance-textsub leading-5">
            {selectedCheckbox}
          </div>
          <img className="rotate-90" src={arrow} />
        </div>
        <input
          className="h-12 w-[168px] absolute top-0 opacity-0 peer"
          type="checkbox"
        />
        {/* filter option */}
        <div className="absolute peer-checked:flex hidden top-14 w-[168px] bg-white rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)] flex-col ">
          <div className="self-stretch px-3 py-2 justify-start items-start gap-2 inline-flex">
            <input
              className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary"
              type="checkbox"
              value={FilterOption.LATEST}
              checked={selectedCheckbox === FilterOption.LATEST}
              onChange={() => handleCheckboxChange(FilterOption.LATEST)}
            />
            <div className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5">
              {FilterOption.LATEST}
            </div>
          </div>
          <div className="self-stretch px-3 py-2 justify-start items-start gap-2 inline-flex">
            <input
              className="w-4 h-4 rounded-sm border border-light_finance-textsub checked:!bg-light_finance-primary"
              type="checkbox"
              value={FilterOption.DATE_LAST_OPEN}
              checked={selectedCheckbox === FilterOption.DATE_LAST_OPEN}
              onChange={() => handleCheckboxChange(FilterOption.DATE_LAST_OPEN)}
            />
            <div className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5">
              {FilterOption.DATE_LAST_OPEN}
            </div>
          </div>
        </div>
      </div>
      {/* filter data */}
      <div className="relative">
        {/* filter btn */}
        <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
          <img className="h-6 w-6" src={filterIcon} />
        </div>
        <input
          className="h-12 w-12 absolute top-0 opacity-0 peer"
          type="checkbox"
        />
        {/* filter option */}
        <div className="absolute peer-checked:flex hidden top-14 right-0 w-[226px] max-h-[60vh] overflow-scroll rounded-lg bg-light_finance-background drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)]  flex-col ">
          {MEETING_FILTER_OPT.map((filterOpt, index) => {
            return (
              <div
                key={index}
                className="self-stretch px-4 py-2 justify-start items-start gap-2 inline-flex"
              >
                <input
                  checked={filterOpt.id === selectedLoanOpt}
                  className="w-4 h-4 rounded-[2px] border border-light_finance-textsub checked:!bg-light_finance-primary"
                  type="checkbox"
                  onChange={() => {
                    updateSelectedLoanOpt(filterOpt.id);
                  }}
                />
                <label className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5">
                  {filterOpt.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MeetingFilter;
