import Chat from "@components/svg/Chat";
import Consulting from "@components/svg/Consulting";
import DashboardIcon from "@components/svg/Dashboard";
import LoanList from "@components/svg/LoanList";
import ManagementRecord from "@components/svg/ManageRecord";
import { getTranslated } from "@i18n/index";

export const MENUITEMS = [
  {
    title: getTranslated("sideBar.dashboard"),
    icon: <DashboardIcon isActive={true} isFocus={false} />,
    iconDark: <DashboardIcon isActive={true} isFocus={true} />,
    iconStroke: <DashboardIcon isActive={false} isFocus={false} />,
    type: "sub",
    children: [],
    path: "/dashboard",
  },
  {
    title: getTranslated("sideBar.packageLoanList"),
    icon: <LoanList isActive={true} isFocus={false} />,
    iconDark: <LoanList isActive={true} isFocus={true} />,
    iconStroke: <LoanList isActive={false} isFocus={false} />,
    type: "sub",
    children: [],
    path: "/loan-list",
  },
  {
    title: getTranslated("sideBar.consulting"),
    icon: <Consulting isActive={true} isFocus={false} />,
    iconDark: <Consulting isActive={true} isFocus={true} />,
    iconStroke: <Consulting isActive={false} isFocus={false} />,
    type: "sub",
    children: [],
    path: "/meeting",
  },
  {
    title: getTranslated("sideBar.recordManagement"),
    icon: <ManagementRecord isActive={true} isFocus={false} />,
    iconDark: <ManagementRecord isActive={true} isFocus={true} />,
    iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
    type: "sub",
    children: [],
    path: `/records`,
  },
  {
    title: getTranslated("sideBar.chat"),
    icon: <Chat isActive={true} isFocus={false} />,
    iconDark: <Chat isActive={true} isFocus={true} />,
    iconStroke: <Chat isActive={false} isFocus={false} />,
    type: "sub",
    children: [],
    path: "/message",
  },
];
