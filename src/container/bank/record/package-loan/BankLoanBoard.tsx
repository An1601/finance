import { Link, useNavigate } from "react-router-dom";
import { BankLoanItemType } from "@type/types";
import { useTranslation } from "react-i18next";
import { US_CURRENTCY } from "@constant/Constant";
import LoanFilter from "@container/dashboards/package-loan/LoanFilter";
import eyeOpen from "@assets/icon/YellowEyeIcon.svg";
import { useLoading } from "@components/hook/useLoading";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";
import { LoanFormState } from "@type/enum";
import EditIcon from "@components/svg/Edit";
import { showSweetAlert } from "@components/sweet-alert/Alert";
import DeleteIcon from "@components/svg/Delete";
import CustomAddBtn from "@components/common/button/custom-add-btn";

const BankLoanBoard = ({
  loans,
  refetchLoans,
}: {
  loans: BankLoanItemType[];
  refetchLoans: () => Promise<void>;
}) => {
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
  const hanldeChangeState = async (state: number, loanId: number) => {
    toggleLoading(true);
    try {
      const response = await api.post(
        `/loans/${loanId}/update-loan-visibility`,
        {
          visibility: state,
        },
      );
      if (response.status === 200) {
        refetchLoans();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };
  const hanldeDeleteLoan = async (loanId: number) => {
    toggleLoading(true);
    try {
      const response = await api.delete(`/loans/${loanId}/delete`);
      if (response.status === 200) {
        refetchLoans();
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box custom-card">
        <div className="w-full px-6 py-5 flex flex-col gap-5 md:flex-row justify-between md:gap-0 sm:border-b-[1px] sm:border-stroke">
          <div className="flex items-center gap-2 ">
            <div className="w-1 h-5 bg-danger rounded-sm" />
            <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
              {t("sideBar.applyLoanList")}
            </div>
          </div>
          <div className="w-full md:w-fit flex items-center gap-5 justify-between">
            <div className="w-fit">
              <LoanFilter />
            </div>
            <CustomAddBtn
              name={t("createLoanForm.addLoan")}
              handleOnclick={() => navigate("/bank/loan-create")}
            />
          </div>
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
                    {t("home.state")}
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
                    <td className="max-w-60 text-truncate font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">
                      {loan?.name}
                    </td>
                    <td className="max-w-60 text-truncate font-HelveticaNeue leading-5 texw-1/6t-sm text-light_finance-textsub">
                      {US_CURRENTCY.format(loan?.credit_limit)}
                    </td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">{`${loan.interest_rate}%`}</td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">{`${loan.origination_fee}%`}</td>
                    <td className=" font-HelveticaNeue leading-5 text-sm text-light_finance-textsub">
                      {loan?.time_began}
                    </td>
                    <td
                      className="max-w-60 text-truncate font-HelveticaNeue leading-5 text-sm text-light_finance-textsub"
                      onClick={() => {
                        handleSaveFile(loan.id, loan.term_name);
                      }}
                    >
                      {loan.term_name}
                    </td>
                    <td>
                      {loan.visibility === LoanFormState.PUBLIC ? (
                        <div className="min-w-[64px] bg-[#CCFFF1] rounded-sm inline-flex items-center justify-center">
                          <div className="text-cent er font-HelveticaNeue font-medium text-[#00D097] text-[10px] leading-4 px-2 py-[2px] whitespace-nowrap">
                            {t("bankForm.published")}
                          </div>
                        </div>
                      ) : loan.visibility === LoanFormState.CLOSE ? (
                        <div className="min-w-[64px] bg-[#FFD4D8] rounded-sm inline-flex items-center justify-center">
                          <div className="text-center font-HelveticaNeue font-medium text-[#F65160] text-[10px] leading-4 px-2 py-[2px] whitespace-nowrap">
                            {t("bankForm.closed")}
                          </div>
                        </div>
                      ) : (
                        <div className="min-w-[64px] bg-[#D9E8FF] rounded-sm inline-flex items-center justify-center">
                          <div className="text-center font-HelveticaNeue font-medium text-[#408CFF] text-[10px] leading-4 px-2 py-[2px] whitespace-nowrap">
                            {t("bankForm.draft")}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="w-fit px-3 flex justify-center items-center cursor-pointer gap-4">
                        <img
                          src={eyeOpen}
                          onClick={() => {
                            navigate(`/bank/loan-detail?loanId=${loan.id}`);
                          }}
                        />
                        {loan.visibility === LoanFormState.DRAFT ? (
                          <i
                            className="fa-solid fa-arrow-up-from-bracket fa-lg text-primary"
                            onClick={() =>
                              showSweetAlert(
                                () =>
                                  hanldeChangeState(
                                    LoanFormState.PUBLIC,
                                    loan.id,
                                  ),
                                t("warning.title"),
                                t("warning.content"),
                                t("bankForm.public"),
                                t("survey.submit_modal_close"),
                              )
                            }
                          ></i>
                        ) : loan.visibility === LoanFormState.PUBLIC ? (
                          <i
                            className="fa-regular fa-circle-xmark fa-lg text-[#F65160]"
                            onClick={() =>
                              hanldeChangeState(LoanFormState.CLOSE, loan.id)
                            }
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-rotate-left fa-lg text-[#1271FF]"
                            onClick={() =>
                              hanldeChangeState(LoanFormState.PUBLIC, loan.id)
                            }
                          ></i>
                        )}
                        <button
                          className="w-5 h-5"
                          disabled={loan.visibility !== LoanFormState.DRAFT}
                          onClick={() => navigate(`/bank/loan/${loan.id}`)}
                        >
                          <EditIcon
                            color={
                              loan.visibility === LoanFormState.DRAFT
                                ? "#45556E"
                                : "#C7CCD4"
                            }
                          />
                        </button>
                        <button
                          className="w-5 h-5"
                          disabled={loan.visibility !== LoanFormState.DRAFT}
                          onClick={() =>
                            showSweetAlert(
                              () => hanldeDeleteLoan(loan.id),
                              t("warning.title"),
                              t("warning.content"),
                              t("consulting.delete"),
                              t("survey.submit_modal_close"),
                            )
                          }
                        >
                          <DeleteIcon
                            color={
                              loan.visibility === LoanFormState.DRAFT
                                ? "#F65160"
                                : "#F6516033"
                            }
                          />
                        </button>
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
