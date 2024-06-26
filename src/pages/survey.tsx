import AuthenLayout from "@components/layout/AuthenLayout";
import { useUser } from "@redux/useSelector";
import { Navigate, Outlet } from "react-router-dom";
import authenLeftside2 from "@assets/images/authentication/authen left side 2.svg";
import { UserRole } from "@type/enum";

const Survey = () => {
  const user = useUser();

  return user.access_token ? (
    user.role === UserRole.BUSINESS ? (
      <AuthenLayout bgLeft={authenLeftside2}>
        <Outlet />
      </AuthenLayout>
    ) : (
      <Navigate to="/bank" />
    )
  ) : (
    <Navigate to="/signin" />
  );
};
export default Survey;
