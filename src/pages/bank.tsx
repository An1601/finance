import DashboardLayout from "@components/layout/DashboardLayout";
import { useUser } from "@redux/useSelector";
import { UserRole } from "@type/enum";
import { Navigate, Outlet } from "react-router-dom";

const BankDashboard = () => {
  const user = useUser();

  return user.access_token ? (
    user.role === UserRole.BANK ? (
      <DashboardLayout isBank={true}>
        <Outlet />
      </DashboardLayout>
    ) : (
      <Navigate to="/dashboard" />
    )
  ) : (
    <Navigate to="/signin" />
  );
};

export default BankDashboard;
