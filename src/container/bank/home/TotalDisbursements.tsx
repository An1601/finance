import { SourceBankdata } from "@container/dashboards/home/indexData";
import { useTranslation } from "react-i18next";

const TotalDisbursements = () => {
  const { t } = useTranslation();
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box !bg-inherit !mb-0 sm:mb-6">
        <div className="px-0 pb-4 sm:px-5 sm:py-6 am:border-b-[1px] border-stroke flex justify-between items-center">
          <div className="flex items-center gap-2 ">
            <div className="w-1 h-5 bg-danger rounded-sm" />
            <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
              {t("home.statePackageLoans")}
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg">
          <div className="box-body overflow-hidden">
            <div className="leads-source-chart flex items-center justify-center">
              <SourceBankdata />
              <div className="lead-source-value ">
                <span className="block text-[1.5625rem] font-bold">6/2024</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-dashed border-stroke">
            <div className="col !p-0">
              <div className="!pe-4 p-[0.95rem] text-center">
                <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend tablet inline-block">
                  {t("home.totalAmount")}
                </span>
                <div>
                  <span className="text-[1rem]  font-semibold">$6,789,053</span>
                </div>
              </div>
            </div>
            <div className="col !p-0">
              <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">
                  {t("home.inProgress")}
                </span>
                <div>
                  <span className="text-[1rem]  font-semibold">$897,394</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalDisbursements;
