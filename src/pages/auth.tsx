import { Outlet } from "react-router-dom";
import { Fragment, useEffect } from "react";
import bg1 from "../assets/images/authentication/1.svg";

const Auth = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <Fragment>
      <div className="grid grid-cols-12 authentication mx-0 text-defaulttextcolor text-defaultsize relative overflow-hidden">
        <div className="xxl:col-span-7 xl:col-span-7 lg:col-span-12 col-span-12 bg-light_finance-background1 relative">
          <div className="flex justify-center h-full">
            <img
              className="absolute w-screen sm:max-w-[480px] top-[-1.5rem] bg-cover bg-center"
              src={bg1}
              alt=""
            />
            <Outlet />
          </div>
        </div>
        <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-12 xl:block hidden px-0">
          <div className="authentication-cover"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
