import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "@assets/images/brand-logos/1.png";
import { AppDispatch } from "@redux/store";
import { setLoadingFalse, setLoadingTrue } from "@redux/commonReducer";
import Loader from "@components/common/loader/loader";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import { BASE_URL } from "@api/axios";
import { ResetPasswordInfo } from "@type/types";
import InputField from "@components/common/input";
import { useTranslation } from "react-i18next";
import { useLoading } from "@redux/useSelector";

const ResetPassword = () => {
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useLoading();
  const [passwordShow1, setPasswordShow1] = useState(false);
  const [passwordShow2, setPasswordShow2] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<ResetPasswordInfo>();

  const handleResetPassword = async (data: ResetPasswordInfo) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.post(
        `${BASE_URL}/set-new-password`,
        {
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : t("resetPassword.resetUnsuccessful");
      toast.warning(message);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="w-screen sm:max-w-[480px] z-10 mt-[3.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16" src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-1">
            <div className="font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              {t("resetPassword.resetPassword")}
            </div>
            <div className="font-HelveticaNeue text-light_finance-textsub text-xs font-light leading-4 tracking-[-0.12px]">
              {t("resetPassword.descriptionResetPassword")}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <InputField
            label={t("resetPassword.password")}
            placeholder={t("resetPassword.yourPassword")}
            type={passwordShow1 ? "text" : "password"}
            isPassword
            showPassword={passwordShow1}
            toggleShowPassword={() => setPasswordShow1(!passwordShow1)}
            register={register("password", {
              required: t("resetPassword.requirePassword"),
              pattern: {
                value:
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                message: t("resetPassword.messagePassword"),
              },
            })}
            error={errors.password}
          />
          <InputField
            label={t("resetPassword.confirmPassword")}
            placeholder={t("resetPassword.yourConfirmPassword")}
            type={passwordShow2 ? "text" : "password"}
            isPassword
            showPassword={passwordShow2}
            toggleShowPassword={() => setPasswordShow2(!passwordShow2)}
            register={register("confirmPassword", {
              required: t("resetPassword.requireComfirm"),
              validate: (value) =>
                value === getValues("password") ||
                t("resetPassword.matchPassword"),
            })}
            error={errors.confirmPassword}
          />
        </div>
        <div className="w-[280px] h-[100px] flex flex-col items-center gap-6">
          <button type="submit">
            <AuthSubmitBtn name={t("resetPassword.create")} />
          </button>
          <AuthSubmitBtn type="submit" name="Create" />
          <div className="flex items-center gap-[0.615rem]">
            <div className="text-light_finance-textbody text-sm font-normal font-['Be Vietnam'] leading-tight">
              {t("resetPassword.already")}
            </div>
            <div
              className="text-light_finance-textbody text-sm font-semibold font-['Be Vietnam'] underline leading-tight cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              {t("resetPassword.signIn")}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ResetPassword;
