import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import AuthenLayout from "@components/layout/AuthenLayout";
import authenLeftside from "@assets/images/authentication/authen left side.svg";
import authenLeftside2 from "@assets/images/authentication/authen left side 2.svg";
import authenRightside from "@assets/images/authentication/1.svg";

const Auth = () => {
  const path = window.location.pathname;
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <AuthenLayout
      bgLeft={path === "/signup" ? authenLeftside2 : authenLeftside}
      bgRightMobile={authenRightside}
    >
      <Outlet />
    </AuthenLayout>
  );
};

export default Auth;
