import Chat from "../../../svg/Chat";
import Consulting from "../../../svg/Consulting";
import DashboardIcon from "../../../svg/Dashboard";
import LoanList from "../../../svg/LoanList";
import ManagementRecord from "../../../svg/ManageRecord";
import { store } from "@redux/store";
const userId = store.getState().rootReducer.userReducer.id;
import { getTranslated } from "@i18n/index";

export const MENUITEMS = [
  {
    title: getTranslated("sideBar.dashboard"),
    icon: <DashboardIcon />,
    type: "sub",
    children: [],
    path: "/",
  },
  {
    title: getTranslated("sideBar.packageLoanList"),
    icon: <LoanList />,
    type: "sub",
    children: [],
    path: "/loan-list",
  },
  {
    title: getTranslated("sideBar.consulting"),
    icon: <Consulting />,
    type: "sub",
    children: [],
    path: "/",
  },
  {
    title: getTranslated("sideBar.recordManagement"),
    icon: <ManagementRecord />,
    type: "sub",
    children: [],
    path: `/loan-list/${userId}`,
  },
  {
    title: getTranslated("sideBar.chat"),
    icon: <Chat />,
    type: "sub",
    children: [],
    path: "/message",
  },
];
