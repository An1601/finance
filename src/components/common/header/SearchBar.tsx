import React from "react";
import SearchHeader from "../../svg/SearchHeader";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "@components/hook/UseWindowWidth";

const SearchBar: React.FC<{ isEnable: boolean }> = ({ isEnable }) => {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  return (
    <div
      className="w-full flex justify-center items-center border-[1px] border-light_finance-texttitle rounded-xl"
      data-hs-overlay={!isEnable ? "#search-modal" : undefined}
      onClick={() => {
        if (windowWidth < 480) {
          navigate("/search");
        }
      }}
    >
      <div className="w-full h-[38px] flex items-center bg-white rounded-l-xl">
        {isEnable ? (
          <input
            className="w-full ml-[10px] text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
            placeholder="Search"
          />
        ) : (
          <div className="ml-[10px] text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight cursor-pointer">
            Search
          </div>
        )}
      </div>
      <div className="w-[39px] h-[38px] p-[9.82px] rounded-r-xl bg-light_finance-sub_second justify-start items-center gap-[135px] flex cursor-pointer">
        <SearchHeader />
      </div>
    </div>
  );
};

export default SearchBar;
