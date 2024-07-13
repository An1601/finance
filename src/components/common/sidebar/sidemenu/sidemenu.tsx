import Chat from "@components/svg/Chat";
import Consulting from "@components/svg/Consulting";
import DashboardIcon from "@components/svg/Dashboard";
import LoanList from "@components/svg/LoanList";
import ManagementRecord from "@components/svg/ManageRecord";
import { getTranslated } from "@i18n/index";

export interface MenuItem {
  id: number;
  title: string;
  icon: JSX.Element;
  iconDark: JSX.Element;
  iconStroke: JSX.Element;
  type: "link" | "sub";
  path: string;
  selected: boolean;
  active?: boolean;
  children: MenuItem[];
}
export const MENUITEMS: MenuItem[] = [
  {
    id: 1,
    title: getTranslated("sideBar.dashboard"),
    icon: <DashboardIcon isActive={true} isFocus={false} />,
    iconDark: <DashboardIcon isActive={true} isFocus={true} />,
    iconStroke: <DashboardIcon isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: "/dashboard",
    selected: false,
  },
  {
    id: 2,
    title: getTranslated("sideBar.packageLoanList"),
    icon: <LoanList isActive={true} isFocus={false} />,
    iconDark: <LoanList isActive={true} isFocus={true} />,
    iconStroke: <LoanList isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: "/loan-list",
    selected: false,
  },
  {
    id: 3,
    title: getTranslated("sideBar.consulting"),
    icon: <Consulting isActive={true} isFocus={false} />,
    iconDark: <Consulting isActive={true} isFocus={true} />,
    iconStroke: <Consulting isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: "/meeting",
    selected: false,
  },
  {
    id: 4,
    title: getTranslated("sideBar.recordManagement"),
    icon: <ManagementRecord isActive={true} isFocus={false} />,
    iconDark: <ManagementRecord isActive={true} isFocus={true} />,
    iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: `/records`,
    selected: false,
  },
  {
    id: 5,
    title: getTranslated("sideBar.chat"),
    icon: <Chat isActive={true} isFocus={false} />,
    iconDark: <Chat isActive={true} isFocus={true} />,
    iconStroke: <Chat isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: "/message",
    selected: false,
  },
];
export const BANK_MENUITEMS: MenuItem[] = [
  {
    id: 1,
    title: getTranslated("sideBar.dashboard"),
    icon: <DashboardIcon isActive={true} isFocus={false} />,
    iconDark: <DashboardIcon isActive={true} isFocus={true} />,
    iconStroke: <DashboardIcon isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: "/bank",
    selected: false,
  },
  {
    id: 2,
    title: getTranslated("sideBar.record"),
    icon: <ManagementRecord isActive={true} isFocus={false} />,
    iconDark: <ManagementRecord isActive={true} isFocus={true} />,
    iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
    type: "sub",
    selected: false,
    active: false,
    children: [
      {
        id: 5,
        title: getTranslated("sideBar.applyLoanList"),
        icon: <ManagementRecord isActive={true} isFocus={false} />,
        iconDark: <ManagementRecord isActive={true} isFocus={true} />,
        iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
        type: "link",
        children: [],
        path: `/bank/loan-list`,
        selected: false,
      },
      {
        id: 6,
        title: getTranslated("sideBar.surveyList"),
        icon: <ManagementRecord isActive={true} isFocus={false} />,
        iconDark: <ManagementRecord isActive={true} isFocus={true} />,
        iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
        type: "link",
        children: [],
        path: `/bank/survey-list`,
        selected: false,
      },
      {
        id: 7,
        title: getTranslated("sideBar.applicationForms"),
        icon: <ManagementRecord isActive={true} isFocus={false} />,
        iconDark: <ManagementRecord isActive={true} isFocus={true} />,
        iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
        type: "link",
        children: [],
        path: `/bank/form-list`,
        selected: false,
      },
      {
        id: 8,
        title: getTranslated("sideBar.recordManagement"),
        icon: <ManagementRecord isActive={true} isFocus={false} />,
        iconDark: <ManagementRecord isActive={true} isFocus={true} />,
        iconStroke: <ManagementRecord isActive={false} isFocus={false} />,
        type: "link",
        children: [],
        path: `/bank/records`,
        selected: false,
      },
    ],
    path: `/`,
  },
  {
    id: 3,
    title: getTranslated("sideBar.chat"),
    icon: <Chat isActive={true} isFocus={false} />,
    iconDark: <Chat isActive={true} isFocus={true} />,
    iconStroke: <Chat isActive={false} isFocus={false} />,
    type: "link",
    children: [],
    path: "/message",
    selected: false,
  },
];
