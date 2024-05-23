import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "@assets/images/brand-logos/1.png";
import { SignUpInfo } from "@type/types";
import { AppDispatch, RootState } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import Loader from "@components/common/loader/loader";
import api from "@api/axios";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import InputField from "@components/common/input";

const SignUp = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.rootReducer.commonReducer.isloading,
  );
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<SignUpInfo>();

  const handleSignUp = async (data: SignUpInfo) => {
    dispatch(setLoadingTrue());
    try {
      const response = await api.post("/register", data);
      if (response.status === 200) {
        navigate(`/verify-code?email=${data.email}&signup=true`);
        toast.success(response.data.message || "Sign Up successfully.");
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
        onSubmit={handleSubmit(handleSignUp)}
        className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col justify-center items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16" src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Sign Up
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              365 people are online
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-10">
            <InputField
              label="Name"
              placeholder="Your name"
              register={register("name", { required: "Name is required" })}
              error={errors.name}
            />
            <InputField
              label="Phone number"
              placeholder="Your phone number"
              register={register("phone", {
                required: "Phone number is required",
              })}
              error={errors.phone}
            />
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
              label="Date of Birth"
              placeholder="Your date of birth"
              type="date"
              register={register("date_of_birth", {
                required: "Date of Birth is required",
              })}
              error={errors.date_of_birth}
            />
            <InputField
              label="Address"
              placeholder="Your address"
              register={register("address", {
                required: "Address is required",
              })}
              error={errors.address}
            />
            <InputField
              label="Password"
              placeholder="Your password"
              type={showPassword1 ? "text" : "password"}
              isPassword
              showPassword={showPassword1}
              toggleShowPassword={() => setShowPassword1(!showPassword1)}
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
            <InputField
              label="Confirm password"
              placeholder="Confirm your password"
              type={showPassword2 ? "text" : "password"}
              isPassword
              showPassword={showPassword2}
              toggleShowPassword={() => setShowPassword2(!showPassword2)}
              register={register("password_confirmation", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords must match",
              })}
              error={errors.password_confirmation}
            />
          </div>
          <div className="w-full flex items-center gap-[2px]">
            <input
              className={`m-1 border-[1.5px] ${errors.policy_agreement ? "border-red" : "border-light_finance-textbody"} checked:hover:bg-light_finance-textbody`}
              type="checkbox"
              {...register("policy_agreement", { required: true })}
            />
            <div>I agree with policy and terms</div>
          </div>
        </div>
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button type="submit">
            <AuthSubmitBtn name="Sign Up" />
          </button>
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              Already have an account
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => navigate("/signin")}
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
