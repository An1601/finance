import DashboardLayout from "@components/layout/DashboardLayout";
import { Outlet } from "react-router-dom";

const BankDashboard = () => {
  return (
    <DashboardLayout isBank={true}>
      <Outlet />
    </DashboardLayout>
  );
};

export default BankDashboard;
