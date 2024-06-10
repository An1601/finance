import { FC, Fragment } from "react";
import Overview from "./Overview";
import AmountDisbursed from "./AmountDisbursed";
import TopBank from "./TopBank";
import StateLoansChart from "./StateLoansChart";
import HomeMobile from "./IndexMobile";
import bg1 from "@assets/images/authentication/1.svg";
import useWindowWidth from "@components/hook/useWindowWidth";
import Projects from "./Projects";
import StatePackageLoans from "./StatePackageLoans";
import { loanRecords } from "../PackageLoan/LoanListData";

interface CrmProps {}

const Home: FC<CrmProps> = () => {
  const windowWidth = useWindowWidth();

  return (
    <div>
      {windowWidth >= 480 ? (
        <Fragment>
          <Overview />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-8 col-span-12">
              <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                <AmountDisbursed />
                <StatePackageLoans loanRecords={loanRecords} />
              </div>
            </div>
            <div className="xl:col-span-4 col-span-12">
              <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                <Projects />
                <TopBank />
                <StateLoansChart />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="w-full min-h-screen relative overflow-hidden">
          <div className="w-full z-10 relative">
            <HomeMobile />
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
