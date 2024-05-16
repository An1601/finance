import loanCategory from "../../../assets/icon/LoanCategoryIcon.svg";

function TopLoans() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 sm:hidden">
        <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
        <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
          Top Loans
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-5 my-0 sm:my-[1.5rem] page-header-breadcrumb">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="col-span-4 flex flex-col gap-1 items-center"
          >
            <img src={loanCategory} />
            <div className="font-HelveticaNeue font-normal text-xs leading-4 text-light_finance-textbody">
              Merchant cash
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopLoans;
