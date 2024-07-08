import Loader from "@components/common/loader";
import { useLoading } from "@components/hook/useLoading";
import useWindowWidth from "@components/hook/useWindowWidth";
import { Fragment, useEffect, useState } from "react";
import BankMobileHome from "./indexMobile";
import api from "@api/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const BankHome = () => {
  const windowWidth = useWindowWidth();
  const { t } = useTranslation();
  const [loans, setLoans] = useState([]);
  const [surveyList, setSurveyList] = useState([]);
  const { isLoading, toggleLoading } = useLoading();

  const handleGetSurveys = async () => {
    toggleLoading(true);
    try {
      const response = await api.get("/bank/surveys");
      if (response.status === 200) {
        setSurveyList(response.data.data);
      }
    } catch (error) {
      toast.error(t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };

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

  const fetchData = async () => {};
  const fetchDataMobile = async () => {
    toggleLoading(true);
    try {
      await Promise.all([handleGetLoans(), handleGetSurveys()]);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    if (windowWidth > 480) fetchData();
    else fetchDataMobile();
  }, [windowWidth]);

  if (isLoading) return <Loader />;

  return windowWidth >= 480 ? (
    <Fragment></Fragment>
  ) : (
    <BankMobileHome
      loans={loans?.slice(0, 6)}
      surveyList={surveyList?.slice(0, 6)}
    />
  );
};

export default BankHome;
