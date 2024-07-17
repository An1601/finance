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
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import BankRecordItem from "./BankRecordItem";
import BankTabHeader from "@components/common/bank-tab-header";
import BankRecordBoard from "./BankRecordBoard";
import Breadcrumb from "@components/common/breadcrumb";

const BankRecordManagement = () => {
  const windowWidth = useWindowWidth();
  const { t } = useTranslation();
  const [loanRecords, setLoanRecords] = useState([]);
  const { isLoading, toggleLoading } = useLoading();

  const handleGetRecords = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/bank/record-management");
      if (response.status === 200) {
        setLoanRecords(response.data.data);
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
    handleGetRecords();
  }, []);

  if (isLoading) return <Loader />;

  return windowWidth < 480 ? (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 py-7">
        <div className="flex justify-between">
          <ProfileHeader />
          <Notification />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <BankTabHeader />
          <LoanFilter />
          <div className="flex flex-col gap-3">
            {loanRecords.map((loanitem, index) => {
              return <BankRecordItem key={index} recordItem={loanitem} />;
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
    <Fragment>
      <Breadcrumb
        primaryText={t("sideBar.record")}
        secondaryText={t("sideBar.applyLoanList")}
      />
      <BankRecordBoard loanRecords={loanRecords} />
    </Fragment>
  );
};
export default BankRecordManagement;
