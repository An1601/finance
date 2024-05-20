import SearchHeader from "../../svg/SearchHeader";

const SearchBar = () => {
  return (
    <div
      className="sm:w-[380px] w-full h-10 flex justify-center items-center border-[1px] border-light_finance-texttitle rounded-xl"
      data-hs-overlay="#search-modal"
    >
      <div className="sm:w-[340px] w-full h-[39px] flex items-center bg-white rounded-l-xl">
        <div className="ml-[10px] text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-tight">
          Search
        </div>
      </div>
      <div className="w-[39px] h-[39px] p-[9.82px] rounded-r-xl bg-light_finance-sub_second justify-start items-center gap-[135px] flex ">
        <SearchHeader />
      </div>
    </div>
  );
};

export default SearchBar;
