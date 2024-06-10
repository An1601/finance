import { getTranslated } from "@i18n/index";
import MeetBookingIcon from "@components/svg/process/MeetBookingIcon";
import AdminConsultIcon from "@components/svg/process/AdminConsultIcon";
import BankReviewIcon from "@components/svg/process/BankReviewIcon";
import LoanApprovalIcon from "@components/svg/process/LoanApprovalIcon";
import LoanAssessmentIcon from "@components/svg/process/LoanAssessmentIcon";
import LoanSubmitIcon from "@components/svg/process/LoanSubmitIcon";

export const MENU_PROCESS = [
  {
    id: 1,
    name: getTranslated("process.header.meetBookingIcon"),
    icon: <MeetBookingIcon isActive={false} />,
    iconActive: <MeetBookingIcon isActive={true} />,
  },
  {
    id: 2,
    name: getTranslated("process.header.adminConsultIcon"),
    icon: <AdminConsultIcon isActive={false} />,
    iconActive: <AdminConsultIcon isActive={true} />,
  },
  {
    id: 3,
    name: getTranslated("process.header.loanSubmitIcon"),
    icon: <LoanSubmitIcon isActive={false} />,
    iconActive: <LoanSubmitIcon isActive={true} />,
  },
  {
    id: 4,
    name: getTranslated("process.header.bankReviewIcon"),
    icon: <BankReviewIcon isActive={false} />,
    iconActive: <BankReviewIcon isActive={true} />,
  },
  {
    id: 5,
    name: getTranslated("process.header.loanAssessmentIcon"),
    icon: <LoanAssessmentIcon isActive={false} />,
    iconActive: <LoanAssessmentIcon isActive={true} />,
  },
  {
    id: 6,
    name: getTranslated("process.header.loanApprovalIcon"),
    icon: <LoanApprovalIcon isActive={false} />,
    iconActive: <LoanApprovalIcon isActive={true} />,
  },
];
