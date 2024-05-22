import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthenLayout from "../components/layout/AuthenLayout";
import authenLeftside from "../assets/images/authentication/authen left side.svg";
import authenLeftside2 from "../assets/images/authentication/authen left side 2.svg";

const Auth = () => {
  const path = window.location.pathname;
  const accessToken: string = useSelector(
    (state: RootState) => state.rootReducer.userReducer.access_token,
  );
  useEffect(() => {
    import("preline");
  }, []);
  console.log(path);
  return !accessToken ? (
    <AuthenLayout bg={path === "/signup" ? authenLeftside2 : authenLeftside}>
      <Outlet />
    </AuthenLayout>
  ) : (
    <Navigate to="dashboard" />
  );
};

export default Auth;
