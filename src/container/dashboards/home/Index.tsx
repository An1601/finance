import { FC, Fragment } from "react";
import Overview from "./Overview";
import AmountDisbursed from "./AmountDisbursed";
import TopBank from "./TopBank";
import StateLoansChart from "./StateLoansChart";
import HomeMobile from "./IndexMobile";
import bg1 from "@assets/images/authentication/1.svg";
import useWindowWidth from "@components/hook/UseWindowWidth";
import TopLoans from "./TopLoans";
import StatePackageLoans from "./StatePackageLoans";

interface CrmProps {}

const Home: FC<CrmProps> = () => {
  const windowWidth = useWindowWidth();
  if (windowWidth > 480)
    return (
      <Fragment>
        <Overview />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xl:col-span-8 col-span-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-5">
              <AmountDisbursed />
              <StatePackageLoans />
            </div>
          </div>
          <div className="xl:col-span-4 col-span-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-5">
              <TopLoans />
              <TopBank />
              <StateLoansChart />
            </div>
          </div>
        </div>
      </Fragment>
    );
  else
    return (
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
    );
};

export default Home;
