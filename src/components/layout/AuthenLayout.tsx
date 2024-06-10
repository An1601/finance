import React, { Fragment } from "react";
import bg2 from "@assets/images/authentication/3D payment deadline.svg";
import destopLogo from "@assets/images/brand-logos/desktop-logo.svg";
interface AuthenLayoutProps {
  children?: React.ReactNode;
  bgLeft?: string;
  bgRightMobile?: string;
}
const AuthenLayout: React.FC<AuthenLayoutProps> = ({
  children,
  bgLeft,
  bgRightMobile,
}) => {
  return (
    <Fragment>
      <div className="grid grid-cols-9 min-h-screen mx-0 xl:px-8 xl:py-10 relative overflow-hidden bg-light_finance-background1">
        <div className="relative xl:col-span-5 lg:col-span-4 lg:block hidden bg-light_finance-primary px-0 xl:rounded-l-[24px]">
          <div className="flex items-center gap-4 mt-[92px] ml-[63px] my-[10px]">
            <img src={destopLogo} />
            <div className="font-NunitoSans font-semibold text-4xl xl:font-bold xl:text-5xl leading-[52px] text-white">
              CCB
            </div>
          </div>
          <div className="mx-8 lg:mx-16 mt-8 font-NunitoSans font-medium text-3xl xl:font-bold xl:text-4xl leading-[52px] text-white">
            CCB connects businesses to access the best loans from banks
          </div>
          <img
            className="absolute md:block hidden -top-16 h-full bg-cover bg-center"
            src={bgLeft}
          />
        </div>
        <div className="relative xl:col-span-4 lg:col-span-5 col-span-9 bg-light_finance-background_authen md:bg-light_finance-background xl:rounded-r-[24px]">
          <div className="flex justify-center items-center h-full">
            <img
              className="absolute md:block hidden bottom-[-100px] right-[-150px] w-[473px] h-[473px]"
              src={bg2}
              alt=""
            />
            {children}
          </div>
          <img
            className="absolute md:hidden w-full top-[-1.5rem] bg-cover bg-center"
            src={bgRightMobile}
            alt=""
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AuthenLayout;
