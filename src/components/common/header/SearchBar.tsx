import SearchHeader from "../../svg/SearchHeader";

const SearchBar = () => {
  return (
    <div
      className="md:w-[380px] w-56 h-10 flex justify-center items-center border-[1px] border-light_finance-texttitle rounded-xl"
      data-hs-overlay="#search-modal"
    >
      <div className="w-full h-[38px] flex items-center bg-white rounded-l-xl">
        <div className="ml-[10px] text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-tight">
          Search
        </div>
      </div>
      <div className="w-[39px] h-[38px] p-[9.82px] rounded-r-xl bg-light_finance-sub_second justify-start items-center gap-[135px] flex ">
        <SearchHeader />
      </div>
    </div>
  );
};

export default SearchBar;
