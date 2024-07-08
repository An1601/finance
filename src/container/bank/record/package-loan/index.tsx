import BankLoanBoard from "./BankLoanBoard";
import api from "@api/axios";
import bg1 from "@assets/images/authentication/1.svg";
import BottomBarCustom from "@components/common/bottom-bar";
import Notification from "@components/common/header/Notification";
import ProfileHeader from "@components/common/header/ProfileHeader";
import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import useWindowWidth from "@components/hook/useWindowWidth";
import LoanFilter from "@container/dashboards/package-loan/LoanFilter";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import BankTabHeader from "@components/common/bank-tab-header";
import BankLoanItem from "../record-management/BankLoanItem";

const BankLoanList = () => {
  const windowWidth = useWindowWidth();
  const { t } = useTranslation();
  const [loans, setLoans] = useState([]);
  const { isLoading, toggleLoading } = useLoading();

  const handleGetLoans = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/loans");
      if (response.status === 200) {
        setLoans(response.data.data);
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
    handleGetLoans();
  }, []);

  if (isLoading) return <Loader />;

  return windowWidth < 480 ? (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 py-7">
        <div className="flex justify-between">
          <ProfileHeader />
          <Notification />
        </div>
        <div className="my-8 flex flex-col gap-6">
          <BankTabHeader />
          <LoanFilter />
          <div className="flex flex-col gap-3">
            {loans.map((loanitem, index) => {
              return <BankLoanItem key={index} loanItem={loanitem} />;
            })}
          </div>
        </div>
        <BottomBarCustom />
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
  ) : (
    <div className="mt-8">
      <BankLoanBoard loans={loans} />
    </div>
  );
};

export default BankLoanList;
