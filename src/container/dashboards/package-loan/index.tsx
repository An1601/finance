import PackageLoanList from "./PackageLoanList";
import bg1 from "@assets/images/authentication/1.svg";
import { useNavigate, useParams } from "react-router-dom";
import LoanFilter from "./LoanFilter";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
function PackageLoanIndex() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loanList, setLoanList] = useState([]);
  const { projectId } = useParams();
  const { isLoading, toggleLoading } = useLoading();

  const handleGetUserLoans = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/business/package-loan-list");
      if (response.status === 200) {
        setLoanList(response.data.data);
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
  const handleGeProjectLoans = async () => {
    toggleLoading(true);
    try {
      const response = await api.get(`/project/loan-list/${projectId}`);
      if (response.status === 200) {
        setLoanList(response.data.data);
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

  useEffect(() => {
    if (projectId) handleGeProjectLoans();
    else handleGetUserLoans();
  }, [projectId]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 pt-7">
        <div className="flex md:hidden items-center justify-between">
          <div className="flex gap-3 md:gap-2 items-center">
            <i
              className="fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
              onClick={() => {
                navigate("/");
              }}
            ></i>
            <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
              {t("packageLoanList.packageLoanList")}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 my-7">
          <div className="w-full flex items-center justify-between">
            <div className="md:flex items-center gap-2 hidden">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                {t("packageLoanList.packageLoanList")}
              </div>
            </div>
            <LoanFilter />
          </div>
          <PackageLoanList loanDetails={loanList} />
        </div>
      </div>
      <div className="absolute w-full sm:hidden top-[-1.5rem]">
        {[...Array(Math.ceil(window.innerHeight / 987) + 1)].map((_, index) => (
          <img
            key={index}
            className="w-full bg-cover bg-center"
            src={bg1}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

export default PackageLoanIndex;
