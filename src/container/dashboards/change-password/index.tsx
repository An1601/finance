import { useContext, useState } from "react";
import Breadcrumb from "@components/common/breadcrumb";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import InputField from "@components/common/input";
import useWindowWidth from "@components/hook/useWindowWidth";
import BackIcon from "@components/svg/Back";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { ChangePasswordInfo } from "@type/types";
import axios from "axios";
import { toast } from "react-toastify";
import api from "@api/axios";
import Loader from "@components/common/loader";
import { LoadingContext } from "@components/hook/useLoading";

function ChangePassword() {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInfo>();
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const newPassword = watch("new_password");
  const handleChangePassword = async (data: ChangePasswordInfo) => {
    toggleLoading(true);
    try {
      const response = await api.post("/me/change-password", data);
      if (response.status === 200) {
        toast.success(t("changePassword.messSuccess"));
        navigate("/profile");
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
    <form onSubmit={handleSubmit(handleChangePassword)}>
      {windowWidth >= 480 ? (
        <div>
          <Breadcrumb
            primaryText={t("changePassword.account")}
            secondaryText={t("changePassword.changePassword")}
            showSecondary
          />
          <div className="p-6 gap-20  bg-white rounded-md">
            <div className="flex flex-row items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                {t("changePassword.changePassword")}
              </div>
            </div>
            <div className="flex gap-20">
              <div className="w-1/2 flex flex-col space-y-4">
                <InputField
                  label={t("changePassword.currentPassword")}
                  placeholder={t("changePassword.yourCurrentPassword")}
                  showPassword={showPassword1}
                  type={showPassword1 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword1(!showPassword1)}
                  isPassword
                  register={register("current_password", {
                    required: t("login.requirePassword"),
                    pattern: {
                      value:
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                      message: t("login.messagePassword"),
                    },
                  })}
                  error={errors.current_password}
                />
                <InputField
                  label={t("changePassword.password")}
                  placeholder={t("changePassword.yourPassword")}
                  showPassword={showPassword2}
                  type={showPassword2 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword2(!showPassword2)}
                  isPassword
                  register={register("new_password", {
                    required: t("login.requirePassword"),
                    pattern: {
                      value:
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                      message: t("login.messagePassword"),
                    },
                  })}
                  error={errors.new_password}
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-4">
                <InputField
                  label={t("changePassword.confirmPassword")}
                  placeholder={t("changePassword.yourConfirmPassword")}
                  showPassword={showPassword3}
                  type={showPassword3 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword3(!showPassword3)}
                  isPassword
                  register={register("new_password_confirmation", {
                    required: t("login.requirePassword"),
                    validate: (value) =>
                      value === newPassword ||
                      t("changePassword.matchPassword"),
                  })}
                  error={errors.new_password_confirmation}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <PrimarySubmitBtn
                name={t("changePassword.update")}
                type="submit"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="!mt-0 sm:!mt-[60px] flex flex-row gap-8">
          <div className="w-screen sm:max-w-[480px] bg-[#F5F9FF]">
            <div className="flex flex-row items-center gap-3 px-6 py-7">
              <div
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <BackIcon color="#45556E" />
              </div>
              <div className="text-center text-slate-900 text-2xl font-bold font-['Helvetica Neue'] leading-loose">
                {t("changePassword.changePassword")}
              </div>
            </div>
            <div className="bg-[#F5F9FF] mb-20">
              <div className="bg-white p-6 rounded-t-[24px] flex flex-col gap-8 ">
                <InputField
                  label={t("changePassword.currentPassword")}
                  placeholder={t("changePassword.yourCurrentPassword")}
                  showPassword={showPassword1}
                  type={showPassword1 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword1(!showPassword1)}
                  isPassword
                  register={register("current_password", {
                    required: t("login.requirePassword"),
                    pattern: {
                      value:
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                      message: t("login.messagePassword"),
                    },
                  })}
                  error={errors.current_password}
                />
                <InputField
                  label={t("changePassword.password")}
                  placeholder={t("changePassword.yourPassword")}
                  showPassword={showPassword2}
                  type={showPassword2 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword2(!showPassword2)}
                  isPassword
                  register={register("new_password", {
                    required: t("login.requirePassword"),
                    pattern: {
                      value:
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
                      message: t("login.messagePassword"),
                    },
                  })}
                  error={errors.new_password}
                />
                <InputField
                  label={t("changePassword.confirmPassword")}
                  placeholder={t("changePassword.yourConfirmPassword")}
                  showPassword={showPassword3}
                  type={showPassword3 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword3(!showPassword3)}
                  isPassword
                  register={register("new_password_confirmation", {
                    required: t("login.requirePassword"),
                    validate: (value) =>
                      value === newPassword ||
                      t("changePassword.matchPassword"),
                  })}
                  error={errors.new_password_confirmation}
                />
                <div className="w-full flex justify-center">
                  <PrimarySubmitBtn
                    name={t("changePassword.update")}
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default ChangePassword;
