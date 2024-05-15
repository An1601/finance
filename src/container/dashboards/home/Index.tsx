import { FC, Fragment } from "react";
import Overview from "./Overview";
import AmountDisbursed from "./AmountDisbursed";
import TopBank from "./TopBank";
import StateLoansChart from "./StateLoansChart";

interface CrmProps {}

const Home: FC<CrmProps> = () => {
  return (
    <Fragment>
      <Overview />
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-8 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <AmountDisbursed />
          </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <TopBank />
            <StateLoansChart />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
