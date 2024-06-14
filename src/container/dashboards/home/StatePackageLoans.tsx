import { Link } from "react-router-dom";
import LoanFilter from "../package-loan/LoanFilter";
import { LoanStatus } from "../../../type/enum";
import { RecordItemType } from "@type/types";
import { useTranslation } from "react-i18next";

function StatePackageLoans({ loanRecords }: { loanRecords: RecordItemType[] }) {
  const { t } = useTranslation();
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box custom-card">
        <div className="box-header justify-between sm:border-b-[1px] sm:border-stroke">
          <div className="flex items-center gap-2 ">
            <div className="w-1 h-5 bg-danger rounded-sm" />
            <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
              {t("home.statePackageLoans")}
            </div>
          </div>
          <LoanFilter />
        </div>
        <div className="box-body">
          <div className="overflow-x-auto">
            <table className="table min-w-full whitespace-nowrap table-hover border table-bordered">
              <thead>
                <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                  <th scope="col" className="!ps-4 !pe-5">
                    {t("home.no")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.loanName")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.bankName")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.creditLimit")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.submitDate")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.state")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {loanRecords.map((record, index) => (
                  <tr
                    className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light font-HelveticaNeue font-normal text-sm text-light_finance-textsub leading-5"
                    key={index}
                  >
                    <th scope="row" className="!ps-4 !pe-5">
                      {index + 1}
                    </th>
                    <td>{record.loan?.name}</td>
                    <td>{record.loan?.user?.bank?.name}</td>
                    <td>{record.loan?.credit_limit}</td>
                    <td>{new Date(record?.time_submit).toDateString()}</td>
                    <td>
                      <span
                        className={`inline-flex ${record.state === LoanStatus.APPROVED ? "text-success bg-success/10" : record.state === LoanStatus.INPROGRESS ? "text-info bg-info/10" : "text-danger bg-danger/10"} !py-[0.15rem] !px-[0.45rem] rounded-sm !font-semibold !text-[0.75em]`}
                      >
                        {record.state === LoanStatus.APPROVED
                          ? t("home.approval")
                          : record.state === LoanStatus.INPROGRESS
                            ? t("home.inProgress")
                            : t("home.reject")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="box-footer">
          <div className="sm:flex items-center">
            <div className="text-defaulttextcolor dark:text-defaulttextcolor/70">
              {t("home.showing")}
              <i className="bi bi-arrow-right ms-2 font-semibold"></i>
            </div>
            <div className="ms-auto">
              <nav aria-label="Page navigation" className="pagination-style-4">
                <ul className="ti-pagination mb-0">
                  <li className="page-item disabled">
                    <Link className="page-link" to="#">
                      {t("home.prev")}
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link " to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="page-link !text-light_finance-primary"
                      to="#"
                    >
                      {t("home.next")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatePackageLoans;
