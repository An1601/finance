import React, { Fragment } from "react";
import bg1 from "@assets/images/authentication/1.svg";
import bg2 from "@assets/images/authentication/3D payment deadline.svg";
import destopLogo from "@assets/images/brand-logos/desktop-logo.svg";
interface AuthenLayoutProps {
  children?: React.ReactNode;
  bg: string;
}
const AuthenLayout: React.FC<AuthenLayoutProps> = ({ children, bg }) => {
  return (
    <Fragment>
      <div className="grid grid-cols-9 min-h-screen mx-0 2xl:px-8 2xl:py-10 relative overflow-hidden">
        <div className="relative xl:col-span-5 lg:col-span-4 lg:block hidden bg-light_finance-primary px-0">
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
            className="absolute md:block hidden top-0 h-full bg-cover bg-center"
            src={bg}
          />
        </div>
        <div className="relative xl:col-span-4 lg:col-span-5 col-span-9 bg-light_finance-background_authen md:bg-light_finance-background">
          <div className="flex justify-center items-center h-full xl:my-5">
            <img
              className="absolute md:block hidden bottom-[-100px] right-[-150px] w-[473px] h-[473px]"
              src={bg2}
              alt=""
            />
            {children}
          </div>
          <img
            className="absolute md:hidden w-full top-[-1.5rem] bg-cover bg-center"
            src={bg1}
            alt=""
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AuthenLayout;
