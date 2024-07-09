import { getTranslated } from "@i18n/index";
import LoanApprovalIcon from "@components/svg/process/LoanApprovalIcon";
import LoanAssessmentIcon from "@components/svg/process/LoanAssessmentIcon";
import ReceiveIcon from "@components/svg/process/ReceiveIcon";

export const PROCESS_BANK = [
  {
    id: 1,
    name: getTranslated("process.header.receiveCheckIcon"),
    icon: <ReceiveIcon isActive={false} />,
    iconActive: <ReceiveIcon isActive={true} />,
  },
  {
    id: 2,
    name: getTranslated("process.header.assessmentIcon"),
    icon: <LoanAssessmentIcon isActive={false} />,
    iconActive: <LoanAssessmentIcon isActive={true} />,
  },
  {
    id: 3,
    name: getTranslated("process.header.finalIcon"),
    icon: <LoanApprovalIcon isActive={false} />,
    iconActive: <LoanApprovalIcon isActive={true} />,
  },
];
