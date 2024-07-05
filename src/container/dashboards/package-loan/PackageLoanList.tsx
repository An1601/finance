import { LoanItemType, RecordItemType } from "@type/types";
import LoanItem from "./LoanItem";
import { useUser } from "@redux/useSelector";
const PackageLoanList = ({
  loanDetails,
}: {
  loanDetails: LoanItemType[] | RecordItemType[];
}) => {
  const user = useUser();
  return (
    <div className="flex flex-col gap-3">
      {user.check_submit &&
        loanDetails.map((loanitem, index) => {
          return <LoanItem key={index} loanItem={loanitem} />;
        })}
    </div>
  );
};

export default PackageLoanList;
