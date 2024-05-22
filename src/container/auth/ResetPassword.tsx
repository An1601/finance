import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import logo from "@assets/images/brand-logos/1.png";
import { useState } from "react";
import EyeSlash from "@components/svg/EyeSlash";
import EyeOpen from "@components/svg/EyeOpen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import { toast } from "react-toastify";
import Loader from "@components/common/loader/loader";
import axios from "axios";
import { BASE_URL } from "@api/axios";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";

const ResetPassword = () => {
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);
  const {
    handleSubmit: SubmitResetPassword,
    register: passwordData,
    formState: { errors },
    getValues,
  } = useForm();

  const HandleSubmitResetPassword = async (passwordData: any) => {
    try {
      dispatch(setLoadingTrue());
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/set-new-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: passwordData.password,
          password_confirmation: passwordData.confirmPassword,
        },
      });
      if (response && response.status === 200) {
        const data = await response.data;
        toast.success(data.message);
        navigate("/signin");
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
          error.response?.data.message || "Reset Password unsuccessfully.",
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
        onSubmit={SubmitResetPassword(HandleSubmitResetPassword)}
        className="w-full sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] sm:m-0 sm: justify-center px-6 flex flex-col items-center gap-12"
      >
        {/* frame logo */}
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Reset Password
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              You reset your password here
            </div>
          </div>
        </div>
        {/* frame input */}
        {/* input field */}
        <div className="w-full flex flex-col gap-8">
          {/* Password field*/}
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.password ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full gap-2 flex items-center justify-between">
                <input
                  className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Your new password"
                  type={passwordshow1 ? "text" : "password"}
                  {...passwordData("password", {
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
                  className={`${errors.password ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                >
                  New Password
                </div>
              </div>
            </div>
            {errors.password &&
              typeof errors.password?.message === "string" && (
                <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                  {errors.password.message}
                </div>
              )}
          </div>
          {/* confirm password field */}
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.confirmPassword ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full gap-2 flex items-center justify-between">
                <input
                  className="w-full text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Confirm your password"
                  type={passwordshow2 ? "text" : "password"}
                  {...passwordData("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") || "Passwords must match",
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
                  className={`${errors.confirmPassword ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                >
                  Confirm password
                </div>
              </div>
            </div>
            {errors.confirmPassword &&
              typeof errors.confirmPassword?.message === "string" && (
                <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                  {errors.confirmPassword.message}
                </div>
              )}
          </div>
        </div>
        {/* frame button */}
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button type="submit">
            <AuthSubmitBtn name="Create" />
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

export default ResetPassword;
