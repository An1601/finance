import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "@assets/images/brand-logos/1.png";
import { LoginInfo } from "@type/types";
import { AppDispatch, RootState } from "@redux/store";
import { handle_login } from "@redux/userReducers";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import Loader from "@components/common/loader/loader";
import api from "../../API/axios";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import InputField from "@components/common/input";

const Login = () => {
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInfo>();

  const handleLogin = async (data: LoginInfo) => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.post("/login", data);
      if (response.status === 200) {
        navigate("/dashboard");
        dispatch(handle_login(response.data.data));
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : "An error occurred!";
      toast.error(message);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16" src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Sign In
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              365 people are online
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <InputField
            label="Email"
            placeholder="Your email"
            type="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "This email is incorrect. Please input your email",
              },
            })}
            error={errors.email}
          />
          <InputField
            label="Password"
            placeholder="Your password"
            type={passwordShow ? "text" : "password"}
            isPassword
            showPassword={passwordShow}
            toggleShowPassword={() => setPasswordShow(!passwordShow)}
            register={register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                message:
                  "At least 6 characters, 1 digit, 1 lowercase, 1 uppercase, 1 special character",
              },
            })}
            error={errors.password}
          />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[2px]">
              <input
                className="m-1 border-[1.5px] border-light_finance-textbody checked:hover:bg-light_finance-textbody"
                type="checkbox"
              />
              <div className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight">
                Remember Me
              </div>
            </div>
            <div
              onClick={() => navigate("/forgot-password")}
              className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight cursor-pointer underline"
            >
              Forgot password
            </div>
          </div>
        </div>
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button type="submit">
            <AuthSubmitBtn name="Sign In" />
          </button>
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              Not a account?
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up now
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
