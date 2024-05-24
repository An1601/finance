import LoanFilter from "../PackageLoan/LoanFilter";
import { loanRecords } from "../PackageLoan/LoanListData";
import PackageLoanList from "../PackageLoan/PackageLoanList";
import bg1 from "@assets/images/authentication/1.svg";
import ProfileHeader from "@components/common/header/ProfileHeader";
import Notification from "@components/common/header/Notification";
import BottomBarCustom from "@components/common/bottomBar";
import useWindowWidth from "@components/hook/useWindowWidth";
import StatePackageLoans from "../home/StatePackageLoans";

function RecordIndex() {
  const windowWidth = useWindowWidth();
  return windowWidth < 480 ? (
    <div className="min-h-screen relative overflow-hidden">
      <div className=" z-10 relative mx-6 mt-[75px]">
        <div className="flex justify-between">
          <ProfileHeader />
          <Notification />
        </div>
        <div className="my-8 flex flex-col gap-6">
          <LoanFilter />
          <PackageLoanList loanDetails={loanRecords} />
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
      <StatePackageLoans loanRecords={loanRecords} />
    </div>
  );
}

export default RecordIndex;
