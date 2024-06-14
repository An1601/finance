import { FC, Fragment, useEffect, useState } from "react";
import Overview from "./Overview";
import AmountDisbursed from "./AmountDisbursed";
import TopBank from "./TopBank";
import StateLoansChart from "./StateLoansChart";
import HomeMobile from "./IndexMobile";
import bg1 from "@assets/images/authentication/1.svg";
import useWindowWidth from "@components/hook/useWindowWidth";
import StatePackageLoans from "./StatePackageLoans";
import api from "@api/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Loader from "@components/common/loader";
import HomeProject from "../project/HomeProject";

interface CrmProps {}

const Home: FC<CrmProps> = () => {
  const windowWidth = useWindowWidth();
  const [loanRecords, setLoanRecords] = useState([]);
  const [projects, setProjects] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);

  const handleGetRecords = async () => {
    setLoading(true);
    try {
      const response = await api.get("/list-loans-submit");
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
      setLoading(false);
    }
  };
  const handleGetTopProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get("/list-project");
      if (response.status === 200) {
        setProjects(response.data.data?.slice(0, 6));
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRecords();
    handleGetTopProjects();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      {windowWidth >= 480 ? (
        <Fragment>
          <Overview records={loanRecords} />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-8 col-span-12">
              <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                <AmountDisbursed />
                <StatePackageLoans loanRecords={loanRecords} />
              </div>
            </div>
            <div className="xl:col-span-4 col-span-12">
              <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                <HomeProject projects={projects} />
                <TopBank />
                <StateLoansChart />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="w-full min-h-screen relative overflow-hidden">
          <div className="w-full z-10 relative">
            <HomeMobile records={loanRecords} userProjects={projects} />
          </div>
          <div className="absolute w-full sm:hidden top-[-1.5rem]">
            {[...Array(Math.ceil(window.innerHeight / 987) + 1)].map(
              (_, index) => (
                <img
                  key={index}
                  className="w-full bg-cover bg-center"
                  src={bg1}
                  alt=""
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
