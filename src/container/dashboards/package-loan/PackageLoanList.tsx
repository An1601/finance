import { LoanListItemType } from "@type/types";
import LoanItem from "./LoanItem";
import { useUser } from "@redux/useSelector";
const PackageLoanList = ({
  loanDetails,
}: {
  loanDetails: LoanListItemType[];
}) => {
  const user = useUser();
  return (
    <div className="flex flex-col gap-3 my-0 sm:my-[1.5rem]">
      {user.check_submit &&
        loanDetails.map((loanitem, index) => {
          return <LoanItem key={index} loan={loanitem} />;
        })}
    </div>
  );
};

export default PackageLoanList;
