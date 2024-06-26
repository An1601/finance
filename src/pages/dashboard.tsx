import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@redux/useSelector";
import DashboardLayout from "@components/layout/DashboardLayout";
import { UserRole } from "@type/enum";

function Dashboard() {
  const user = useUser();

  return user.access_token ? (
    user.role === UserRole.BUSINESS ? (
      <DashboardLayout isBank={false}>
        <Outlet />
      </DashboardLayout>
    ) : (
      <Navigate to="/bank" />
    )
  ) : (
    <Navigate to="/signin" />
  );
}

export default Dashboard;
