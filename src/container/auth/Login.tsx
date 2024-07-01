import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "@assets/images/brand-logos/1.png";
import { LoginInfo } from "@type/types";
import { AppDispatch } from "@redux/store";
import { handleCheckSubmit, handleReduxLogin } from "@redux/userReducers";
import Loader from "@components/common/loader";
import api from "../../API/axios";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import InputField from "@components/common/input";
import { useTranslation } from "react-i18next";
import { fetchProfileData } from "@redux/userThunks";
import { UserRole } from "@type/enum";
import { useLoading } from "@components/hook/useLoading";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, toggleLoading } = useLoading();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInfo>();

  const handleCheckSubmitSurvey = async () => {
    try {
      toggleLoading(true);
      const response = await api.get("/survey/check-survey");
      if (response.status === 200) {
        dispatch(handleCheckSubmit(true));
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === 400) {
        dispatch(handleCheckSubmit(false));
        navigate("/survey");
      } else toast.error(!axios.isAxiosError(error) && t("login.messageError"));
    } finally {
      toggleLoading(false);
    }
  };
  const handleLogin = async (data: LoginInfo) => {
    toggleLoading(true);
    try {
      const response = await api.post("/login", data);
      if (response.status === 200) {
        dispatch(handleReduxLogin(response.data.data));
        if (response.data.data.type === UserRole.BUSINESS)
          handleCheckSubmitSurvey();
        dispatch(fetchProfileData());
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("login.messageError");
      toast.error(message);
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-screen sm:max-w-[480px] z-10 mt-[3.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16" src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              {t("login.signIn")}
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              {t("login.descriptionSignIn")}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <InputField
            label={t("login.email")}
            placeholder={t("login.yourEmail")}
            type="email"
            register={register("email", {
              required: t("login.requireEmail"),
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: t("login.messageEmail"),
              },
            })}
            error={errors.email}
          />
          <InputField
            label={t("login.password")}
            placeholder={t("login.yourPassword")}
            type={passwordShow ? "text" : "password"}
            isPassword
            showPassword={passwordShow}
            toggleShowPassword={() => setPasswordShow(!passwordShow)}
            register={register("password", {
              required: t("login.requirePassword"),
              pattern: {
                value:
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                message: t("login.messagePassword"),
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
                {t("login.remember")}
              </div>
            </div>
            <div
              onClick={() => navigate("/forgot-password")}
              className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue leading-tight cursor-pointer underline"
            >
              {t("login.forgotPassword")}
            </div>
          </div>
        </div>
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <PrimarySubmitBtn name={t("login.signIn")} />
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              {t("login.notAccount")}
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              {t("login.upNow")}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
