import AuthenLayout from "@components/layout/AuthenLayout";
import { Outlet } from "react-router-dom";
import authenLeftside2 from "@assets/images/authentication/authen left side 2.svg";

const Survey = () => {
  return (
    <AuthenLayout bgLeft={authenLeftside2}>
      <Outlet />
    </AuthenLayout>
  );
};
export default Survey;
