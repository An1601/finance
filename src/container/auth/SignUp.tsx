import { Fragment } from "react/jsx-runtime";
import bg1 from "../../assets/images/authentication/1.svg";
import logo from "../../assets/images/brand-logos/1.png";
import { useState } from "react";

const SignUp = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);

  return (
    <Fragment>
      {/* right col */}
      <div className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col justify-center items-center gap-12">
        {/* frame logo */}
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-[2.5rem] font-bold leading-12 tracking-[-1px]">
              Sign Up
            </div>
            <div className="font-HelveticaNeue text-xs font-light leading-4 tracking-[-0.12px]">
              365 people are online
            </div>
          </div>
        </div>
        {/* frame input */}
        <div className="w-full flex flex-col gap-6">
          {/* input field */}
          <div className="w-full flex flex-col gap-10">
            {/* name field */}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Name
                  </div>
                </div>
              </div>
            </div>
            {/* phone filed */}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Phone number
                  </div>
                </div>
              </div>
            </div>
            {/* email filed */}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Email
                  </div>
                </div>
              </div>
            </div>
            {/* DoB field */}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Your date of birth"
                    />
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Date of Birth
                  </div>
                </div>
              </div>
            </div>
            {/* Address field */}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Your address"
                    />
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Address
                  </div>
                </div>
              </div>
            </div>
            {/* Password field*/}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Your password"
                      type={`${passwordshow1 ? "text" : "password"}`}
                    />
                    {passwordshow1 ? (
                      <svg
                        onClick={() => {
                          setpasswordshow1(!passwordshow1);
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2339 14.8197C17.7715 13.5924 18.939 11.9211 19.5424 9.99996C18.2681 5.94288 14.4778 3 10.0002 3C8.37665 3 6.84344 3.38692 5.48779 4.07358L3.70711 2.29289ZM7.96813 6.55391L9.48201 8.0678C9.6473 8.02358 9.82102 8 10.0003 8C11.1048 8 12.0003 8.89543 12.0003 10C12.0003 10.1792 11.9767 10.353 11.9325 10.5182L13.4463 12.0321C13.7983 11.4366 14.0003 10.7419 14.0003 10C14.0003 7.79086 12.2094 6 10.0003 6C9.25838 6 8.56367 6.20197 7.96813 6.55391Z"
                          fill="#45556E"
                        />
                        <path
                          d="M12.4541 16.6967L9.74965 13.9923C7.74013 13.8681 6.1322 12.2601 6.00798 10.2506L2.33492 6.57754C1.50063 7.57223 0.856368 8.73169 0.458008 10C1.73228 14.0571 5.52257 17 10.0002 17C10.8469 17 11.6689 16.8948 12.4541 16.6967Z"
                          fill="#45556E"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          setpasswordshow1(!passwordshow1);
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89544 8 8.00001 8.89543 8.00001 10C8.00001 11.1046 8.89544 12 10 12Z"
                          fill="#45556E"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.457764 10C1.73202 5.94291 5.52232 3 9.99997 3C14.4776 3 18.2679 5.94288 19.5422 9.99996C18.2679 14.0571 14.4776 17 9.99995 17C5.52232 17 1.73204 14.0571 0.457764 10ZM14 10C14 12.2091 12.2091 14 10 14C7.79087 14 6.00001 12.2091 6.00001 10C6.00001 7.79086 7.79087 6 10 6C12.2091 6 14 7.79086 14 10Z"
                          fill="#45556E"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Password
                  </div>
                </div>
              </div>
            </div>
            {/* confirm password field */}
            <div className="w-full flex flex-col gap-10  h-[52px] relative">
              <div className="w-full h-[52px] left-0 top-0 absolute">
                <div className="w-full h-[52px] px-4 py-2 left-0 top-0 absolute bg-light_finance-background rounded-[0.5rem] border-[1px] border-light_finance-texttitle justify-between items-center inline-flex">
                  <div className="w-full gap-2 flex items-center justify-between">
                    <input
                      className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-transparent focus:outline-none focus:ring-0"
                      placeholder="Confirm your password"
                      type={passwordshow2 ? "text" : "password"}
                    />
                    {passwordshow2 ? (
                      <svg
                        onClick={() => {
                          setpasswordshow2(!passwordshow2);
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2339 14.8197C17.7715 13.5924 18.939 11.9211 19.5424 9.99996C18.2681 5.94288 14.4778 3 10.0002 3C8.37665 3 6.84344 3.38692 5.48779 4.07358L3.70711 2.29289ZM7.96813 6.55391L9.48201 8.0678C9.6473 8.02358 9.82102 8 10.0003 8C11.1048 8 12.0003 8.89543 12.0003 10C12.0003 10.1792 11.9767 10.353 11.9325 10.5182L13.4463 12.0321C13.7983 11.4366 14.0003 10.7419 14.0003 10C14.0003 7.79086 12.2094 6 10.0003 6C9.25838 6 8.56367 6.20197 7.96813 6.55391Z"
                          fill="#45556E"
                        />
                        <path
                          d="M12.4541 16.6967L9.74965 13.9923C7.74013 13.8681 6.1322 12.2601 6.00798 10.2506L2.33492 6.57754C1.50063 7.57223 0.856368 8.73169 0.458008 10C1.73228 14.0571 5.52257 17 10.0002 17C10.8469 17 11.6689 16.8948 12.4541 16.6967Z"
                          fill="#45556E"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          setpasswordshow2(!passwordshow2);
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89544 8 8.00001 8.89543 8.00001 10C8.00001 11.1046 8.89544 12 10 12Z"
                          fill="#45556E"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.457764 10C1.73202 5.94291 5.52232 3 9.99997 3C14.4776 3 18.2679 5.94288 19.5422 9.99996C18.2679 14.0571 14.4776 17 9.99995 17C5.52232 17 1.73204 14.0571 0.457764 10ZM14 10C14 12.2091 12.2091 14 10 14C7.79087 14 6.00001 12.2091 6.00001 10C6.00001 7.79086 7.79087 6 10 6C12.2091 6 14 7.79086 14 10Z"
                          fill="#45556E"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] absolute bg-light_finance-background rounded-[0.25rem] justify-start items-start gap-2 inline-flex">
                  <div className="text-light_finance-textsub text-xs font-normal font-['Helvetica Neue'] leading-none tracking-tight">
                    Confirm password
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* checkbox */}
          <div className="w-full flex items-center gap-[2px]">
            <input
              className="m-1 border-[1.5px] border-light_finance-textbody checked:hover:bg-light_finance-textbody"
              type="checkbox"
            />
            <div>I agree with policy and terms</div>
          </div>
        </div>
        {/* frame button */}
        <div className="w-[280px] h-14 px-3 py-4 bg-light_finance-primary rounded-[28px] shadow border-2 justify-center items-center inline-flex">
          <div className="text-light_finance-textbody text-base font-medium font-HelveticaNeue leading-normal tracking-tight">
            Sign up
          </div>
        </div>
        <img
          className="absolute w-screen sm:max-w-[480px] z-[-1] top-[-1.5rem] bg-cover bg-center"
          src={bg1}
          alt=""
        />
      </div>
    </Fragment>
  );
};

export default SignUp;
