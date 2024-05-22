import { useState } from "react";
import { filterLoanOpt } from "./FilterOption";
import MobileHomeBtn from "@components/common/button/MobileHomeBtn";
import { FilterOption } from "@type/enum";
import filterIcon from "@assets/icon/FilterIcon.svg";
import arrow from "@assets/icon/ArrowIcon.svg";

const LoanFilter = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [selectedLoanOpt, setSelectedLoanOpt] = useState([-1, -1, -1, -1]);

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value === selectedCheckbox ? null : value);
  };
  const updateSelectedLoanOpt = (index: number, value: number) => {
    if (selectedLoanOpt[index] === value) {
      setSelectedLoanOpt((prevState) => {
        const newState = [...prevState];
        newState[index] = -1;
        return newState;
      });
    } else
      setSelectedLoanOpt((prevState) => {
        const newState = [...prevState];
        newState[index] = value;
        return newState;
      });
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
        <div className="absolute peer-checked:flex hidden top-14 right-0 w-[226px] max-h-[60vh] overflow-scroll rounded-lg bg-light_finance-background1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)]  flex-col ">
          {filterLoanOpt.map((filterOpt, index) => {
            return (
              <div className="relative" key={index}>
                <input
                  className="w-full h-7 peer z-10 opacity-0 absolute top-0"
                  type="checkbox"
                />
                <div className="py-2 px-4 font-HelveticaNeue font-bold text-sm leading-5 text-light_finance-textsub">
                  {filterOpt.name}
                </div>
                <i className="fa-solid fa-chevron-up fa-lg transition-all duration-100 absolute top-4 right-4 text-light_finance-textsub peer-checked:rotate-180"></i>
                <div className="w-full hidden peer-checked:flex bg-white flex-col ">
                  {filterOpt.child.map((option, sub_index) => {
                    return (
                      <div
                        key={sub_index}
                        className="self-stretch px-4 py-2 justify-start items-start gap-2 inline-flex"
                      >
                        <input
                          checked={option.id === selectedLoanOpt[index]}
                          className="w-4 h-4 rounded-[2px] border border-light_finance-textsub checked:!bg-light_finance-primary"
                          type="checkbox"
                          onChange={() => {
                            updateSelectedLoanOpt(index, option.id);
                          }}
                        />
                        <label className="text-light_finance-textsub text-sm font-normal font-['Helvetica Neue'] leading-5">
                          {option.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="inline-flex justify-end px-4 py-2">
            <MobileHomeBtn name="Filter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanFilter;
