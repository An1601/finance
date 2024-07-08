import { Link, useNavigate } from "react-router-dom";
import { BankLoanItemType } from "@type/types";
import { useTranslation } from "react-i18next";
import { US_CURRENTCY } from "@constant/Constant";
import LoanFilter from "@container/dashboards/package-loan/LoanFilter";
import eyeOpen from "@assets/icon/EyeOpen.svg";
import { useLoading } from "@components/hook/useLoading";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";

const BankLoanBoard = ({ loans }: { loans: BankLoanItemType[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useLoading();

  const handleSaveFile = async (loanId: number, fileName: string) => {
    toggleLoading(true);
    try {
      const response = await api.get(`/loans/download-term/${loanId}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName ?? "term");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      toggleLoading(false);
    }
  };
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box custom-card">
        <div className="box-header justify-between sm:border-b-[1px] sm:border-stroke">
          <div className="flex items-center gap-2 ">
            <div className="w-1 h-5 bg-danger rounded-sm" />
            <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
              {t("packageLoanList.packageLoanList")}
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
                    {t("home.creditLimit")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("consulting.rate")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("consulting.originationFee")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.createDate")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("createLoanForm.term")}
                  </th>
                  <th
                    scope="col"
                    className="font-Roboto font-medium text-sm text-light_finance-textbody leading-[15.4px]"
                  >
                    {t("home.action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, index) => (
                  <tr
                    className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light font-HelveticaNeue font-normal text-sm text-light_finance-textsub leading-5"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="!ps-4 !pe-5 font-HelveticaNeue leading-5 text-sm text-light_finance-textsub"
                    >
                      {index + 1}
                    </th>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">
                      {loan?.name}
                    </td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">
                      {US_CURRENTCY.format(loan?.credit_limit)}
                    </td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">{`$${loan.interest_rate}`}</td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">{`$${loan.origination_fee}`}</td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">
                      {loan?.time_began}
                    </td>
                    <td
                      className=" font-HelveticaNeue leading-5 text-sm underline text-light_finance-primary"
                      onClick={() => {
                        handleSaveFile(loan.id, loan.term_name);
                      }}
                    >
                      {loan.term_name}
                    </td>
                    <td>
                      <div className="w-full flex justify-center items-center cursor-pointer">
                        <img
                          src={eyeOpen}
                          onClick={() => {
                            navigate(`/bank/loan-detail?loanId=${loan.id}`);
                          }}
                        />
                      </div>
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
};

export default BankLoanBoard;
