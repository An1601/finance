import { getTranslated } from "@i18n/index";
import MeetBookingIcon from "@components/svg/process/MeetBookingIcon";
import BankReviewIcon from "@components/svg/process/BankReviewIcon";
import LoanApprovalIcon from "@components/svg/process/LoanApprovalIcon";
import LoanAssessmentIcon from "@components/svg/process/LoanAssessmentIcon";

export const MENU_PROCESS = [
  {
    id: 1,
    name: getTranslated("process.header.meetBookingIcon"),
    icon: <MeetBookingIcon isActive={true} />,
    iconActive: <MeetBookingIcon isActive={true} />,
  },
  {
    id: 2,
    name: getTranslated("process.header.bankReviewIcon"),
    icon: <BankReviewIcon isActive={false} />,
    iconActive: <BankReviewIcon isActive={true} />,
  },
  {
    id: 3,
    name: getTranslated("process.header.loanAssessmentIcon"),
    icon: <LoanAssessmentIcon isActive={false} />,
    iconActive: <LoanAssessmentIcon isActive={true} />,
  },
  {
    id: 4,
    name: getTranslated("process.header.loanApprovalIcon"),
    icon: <LoanApprovalIcon isActive={false} />,
    iconActive: <LoanApprovalIcon isActive={true} />,
  },
];
