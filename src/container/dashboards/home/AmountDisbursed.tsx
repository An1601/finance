import { useTranslation } from "react-i18next";
import { Revenueanalytics } from "./indexData";

function AmountDisbursed() {
  const { t } = useTranslation();
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box">
        <div className="box-header !gap-0 !m-0 justify-between">
          <div className="box-title">Revenue Analytics</div>
          <div className="hs-dropdown ti-dropdown">
            <div
              className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
              aria-expanded="false"
            >
              {t("home.viewAll")}
              <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
            </div>
            <ul
              className="hs-dropdown-menu ti-dropdown-menu hidden"
              role="menu"
            >
              <li>
                <div className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block">
                  {t("home.today")}
                </div>
              </li>
              <li>
                <div className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block">
                  {t("home.thisWeek")}
                </div>
              </li>
              <li>
                <div className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block">
                  {t("home.lastWeek")}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="box-body !py-5">
          <div id="crm-revenue-analytics">
            <Revenueanalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmountDisbursed;
