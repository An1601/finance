import { useTranslation } from "react-i18next";
import { bankListData } from "../PackageLoan/LoanListData";

function TopBank() {
  const { t } = useTranslation();
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12 flex flex-col gap-3 sm:gap-0 sm:bg-white rounded-lg">
      <div className="sm:px-5 sm:py-6 sm:border-b-[1px] sm:border-stroke flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <div className="w-1 h-5 bg-danger rounded-sm" />
          <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
            {t("home.topBanks")}
          </div>
        </div>
        <i className="fa-solid fa-chevron-up hidden sm:block rotate-90 fa-xl"></i>
      </div>
      <div className="sm:p-5 flex flex-col">
        {bankListData.map((bank, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-6 sm:border-[1px] sm:border-stroke"
          >
            <div className="flex gap-2 items-center">
              <img
                src={bank.thumbnail}
                className="h-11 w-11 rounded-full overflow-hidden"
              />
              <div className="font-HelveticaNeue font-normal text-xs leading-4 text-light_finance-textbody">
                {t("home.merchantCash")}
              </div>
            </div>
            <div className="font-HelveticaNeue font-medium text-xs leading-4 text-light_finance-primary text-right">
              $
              {bank.loan_portfolio
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBank;
