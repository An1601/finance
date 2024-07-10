import { Outlet } from "react-router-dom";
import DashboardLayout from "@components/layout/DashboardLayout";
import { useUser } from "@redux/useSelector";
import { UserRole } from "@type/enum";

const Dashboard = () => {
  const user = useUser();
  return (
    <DashboardLayout isBank={user.role === UserRole.BANK}>
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
