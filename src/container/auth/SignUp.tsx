import { Fragment } from "react/jsx-runtime";
import logo from "../../assets/images/brand-logos/1.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpInfo } from "../../type/types";
import EyeSlash from "../../components/svg/EyeSlash";
import EyeOpen from "../../components/svg/EyeOpen";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setLoadingFalse, setLoadingTrue } from "../../redux/commonReducer";
import { toast } from "react-toastify";
import Loader from "../../components/common/loader/loader";
import api from "../../API/axios";
import axios from "axios";

const SignUp = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );

  const navigate = useNavigate();
  const {
    handleSubmit: submitSignUp,
    register: signup_data,
    formState: { errors: error_signup },
    getValues,
  } = useForm<SignUpInfo>();

  const handleSubmitSignUp = async (signup_data: SignUpInfo) => {
    try {
      dispatch(setLoadingTrue());
      const response = await api.post("/register", signup_data);
      if (response && response.status === 200) {
        const data = await response?.data;
        navigate(`/verify-code?email=${signup_data.email}&signup=true`);
        toast.success(data.message || "Sign Up unsuccessfully.");
      }
    } catch (error) {
      if (
        axios.isAxiosError<
          {
            message: string;
            data: [];
          },
          Record<string, unknown>
        >(error)
      ) {
        toast.warning(
          error.response?.data.message || "Sign Up unsuccessfully.",
        );
      } else {
        toast.error("An error occurred!");
      }
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      {/* right col */}
      <form
        onSubmit={submitSignUp(handleSubmitSignUp)}
        className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col justify-center items-center gap-12"
      >
        {/* frame logo */}
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Sign Up
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              365 people are online
            </div>
          </div>
        </div>
        {/* frame input */}
        <div className="w-full flex flex-col gap-6">
          {/* input field */}
          <div className="w-full flex flex-col gap-10">
            {/* name field */}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 lef bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.name?.type === "required" ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Your name"
                    {...signup_data("name", { required: "Name is required" })}
                  />
                </div>{" "}
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.name ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Name
                  </div>
                </div>
              </div>
              {error_signup.name &&
                typeof error_signup.name?.message === "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.name?.message}
                  </div>
                )}
            </div>
            {/* phone filed */}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.phone?.type === "required" ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Your phone number"
                    {...signup_data("phone", {
                      required: "Phone number is required",
                    })}
                  />
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.phone ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Phone number
                  </div>
                </div>
              </div>
              {error_signup.phone &&
                typeof error_signup.phone?.message === "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.phone?.message}
                  </div>
                )}
            </div>
            {/* email filed */}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.email?.type === "required" ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Your email"
                    {...signup_data("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message:
                          "This email is incorrect. Please input your email",
                      },
                    })}
                  />
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.email ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Email
                  </div>
                </div>
              </div>
              {error_signup.email &&
                typeof error_signup.email?.message === "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.email.message}
                  </div>
                )}
            </div>
            {/* date_of_birth field */}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.date_of_birth?.type === "required" ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    type="date"
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Your date of birth"
                    {...signup_data("date_of_birth", {
                      required: "Date of Birth is required",
                    })}
                  />
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.date_of_birth ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Date of Birth
                  </div>
                </div>
              </div>
              {error_signup.date_of_birth &&
                typeof error_signup.date_of_birth?.message === "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.date_of_birth?.message}
                  </div>
                )}
            </div>
            {/* Address field */}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.address?.type === "required" ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Your address"
                    {...signup_data("address", {
                      required: "Address is required",
                    })}
                  />
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.address ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Address
                  </div>
                </div>
              </div>
              {error_signup.address &&
                typeof error_signup.address?.message === "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.address?.message}
                  </div>
                )}
            </div>
            {/* Password field*/}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.password ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Your password"
                    type={`${passwordshow1 ? "text" : "password"}`}
                    {...signup_data("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                        message:
                          "At least 6 characters, 1 digit, 1 lowercase, 1 uppercase, 1 special character",
                      },
                    })}
                  />
                  {passwordshow1 ? (
                    <div
                      onClick={() => {
                        setpasswordshow1(!passwordshow1);
                      }}
                    >
                      <EyeSlash />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setpasswordshow1(!passwordshow1);
                      }}
                    >
                      <EyeOpen />
                    </div>
                  )}
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.password ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Password
                  </div>
                </div>
              </div>
              {error_signup.password &&
                typeof error_signup.password?.message === "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.password.message}
                  </div>
                )}
            </div>
            {/* confirm password field */}
            <div className="w-full flex flex-col gap-2 relative">
              <div
                className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${error_signup.password_confirmation ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
              >
                <div className="w-full gap-2 flex items-center justify-between">
                  <input
                    className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                    placeholder="Confirm your password"
                    type={passwordshow2 ? "text" : "password"}
                    {...signup_data("password_confirmation", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords must match",
                    })}
                  />
                  {passwordshow2 ? (
                    <div
                      onClick={() => {
                        setpasswordshow2(!passwordshow2);
                      }}
                    >
                      <EyeSlash />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setpasswordshow2(!passwordshow2);
                      }}
                    >
                      <EyeOpen />
                    </div>
                  )}
                </div>
                <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                  <div
                    className={`${error_signup.password_confirmation ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                  >
                    Confirm password
                  </div>
                </div>
              </div>
              {error_signup.password_confirmation &&
                typeof error_signup.password_confirmation?.message ===
                  "string" && (
                  <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                    {error_signup.password_confirmation.message}
                  </div>
                )}
            </div>
          </div>
          {/* checkbox */}
          <div className="w-full flex items-center gap-[2px]">
            <input
              className={`m-1 border-[1.5px] ${error_signup.policy_agreement ? "border-red" : "border-light_finance-textbody "} checked:hover:bg-light_finance-textbody`}
              type="checkbox"
              {...signup_data("policy_agreement", {
                required: true,
              })}
            />
            <div>I agree with policy and terms</div>
          </div>
        </div>
        {/* frame button */}
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button
            type="submit"
            className="w-[280px] px-3 py-4 bg-light_finance-primary rounded-[28px] shadow border-2 flex justify-center items-center "
          >
            <div className="text-light_finance-textbody text-base font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
              Sign Up
            </div>
          </button>
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              Already have an account
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SignUp;
