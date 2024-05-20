import Chat from "../../../svg/Chat";
import Consulting from "../../../svg/Consulting";
import DashboardIcon from "../../../svg/Dashboard";
import LoanList from "../../../svg/LoanList";
import ManagementRecord from "../../../svg/ManageRecord";

export const MENUITEMS = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    type: "sub",
    children: [],
    path: "/",
  },
  {
    title: "Package loan list",
    icon: <LoanList />,
    type: "sub",
    children: [],
    path: "/loan-list",
  },
  {
    title: "Consulting meeting list",
    icon: <Consulting />,
    type: "sub",
    children: [],
    path: "/",
  },
  {
    title: "Management Record",
    icon: <ManagementRecord />,
    type: "sub",
    children: [],
    path: "/",
  },
  {
    title: "Chat",
    icon: <Chat />,
    type: "sub",
    children: [],
    path: "/",
  },
];
