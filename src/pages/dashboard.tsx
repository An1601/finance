import { Outlet } from "react-router-dom";
import DashboardLayout from "@components/layout/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout isBank={false}>
      <Outlet />
    </DashboardLayout>
  );
}

export default Dashboard;
