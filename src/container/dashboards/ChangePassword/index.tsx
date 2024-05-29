import { useState } from "react";
import Breadcrumb from "@components/common/breadcrumb";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import InputField from "@components/common/input";
import useWindowWidth from "@components/hook/useWindowWidth";
import BackIcon from "@components/svg/Back";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  return (
    <div>
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
            <form>
              <div className="flex gap-20">
                <div className="w-1/2 flex flex-col space-y-4">
                  <InputField
                    label={t("changePassword.currentPassword")}
                    placeholder={t("changePassword.yourCurrentPassword")}
                    showPassword={showPassword1}
                    type={showPassword1 ? "text" : "password"}
                    toggleShowPassword={() => setShowPassword1(!showPassword1)}
                    isPassword
                  />
                  <InputField
                    label={t("changePassword.password")}
                    placeholder={t("changePassword.yourPassword")}
                    showPassword={showPassword2}
                    type={showPassword2 ? "text" : "password"}
                    toggleShowPassword={() => setShowPassword2(!showPassword2)}
                    isPassword
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
                  />
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <button type="submit">
                  <AuthSubmitBtn name={t("changePassword.update")} />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="!mt-0 sm:!mt-[60px] flex flex-row gap-8">
          <div className="w-screen sm:max-w-[480px] bg-[#F5F9FF]">
            <div>
              <div className="flex flex-row items-center gap-3 px-6 pt-7">
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
            </div>

            <div className="bg-[#F5F9FF] mb-20">
              <form className="bg-white p-6 rounded-t-[24px] flex flex-col gap-8 ">
                <InputField
                  label={t("changePassword.currentPassword")}
                  placeholder={t("changePassword.yourCurrentPassword")}
                  showPassword={showPassword1}
                  type={showPassword1 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword1(!showPassword1)}
                  isPassword
                />
                <InputField
                  label={t("changePassword.password")}
                  placeholder={t("changePassword.yourPassword")}
                  showPassword={showPassword2}
                  type={showPassword2 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword2(!showPassword2)}
                  isPassword
                />
                <InputField
                  label={t("changePassword.confirmPassword")}
                  placeholder={t("changePassword.yourConfirmPassword")}
                  showPassword={showPassword3}
                  type={showPassword3 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword3(!showPassword3)}
                  isPassword
                />
                <div className="flex justify-center">
                  <button type="submit">
                    <AuthSubmitBtn name={t("changePassword.update")} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
