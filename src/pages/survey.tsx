import AuthenLayout from "@components/layout/AuthenLayout";
import { useAccessToken } from "@redux/useSelector";
import { Navigate, Outlet } from "react-router-dom";
import authenLeftside2 from "@assets/images/authentication/authen left side 2.svg";

const Survey = () => {
  const accessToken = useAccessToken();
  return accessToken ? (
    <AuthenLayout bgLeft={authenLeftside2}>
      <Outlet />
    </AuthenLayout>
  ) : (
    <Navigate to="signin" />
  );
};
export default Survey;
