import { Outlet } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Fragment, useEffect } from "react";

const Auth = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <Fragment>
      {/* <Provider store={store}> */}
      <div className="grid grid-cols-12 authentication mx-0 text-defaulttextcolor text-defaultsize">
        <div className="xxl:col-span-7 xl:col-span-7 lg:col-span-12 col-span-12">
          <div className="flex justify-center items-center h-full">
            <Outlet />
          </div>
        </div>
        <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-12 xl:block hidden px-0">
          <div className="authentication-cover"></div>
        </div>
      </div>
      {/* </Provider> */}
    </Fragment>
  );
};

export default Auth;
