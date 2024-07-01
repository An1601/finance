import { Fragment } from "react/jsx-runtime";
import logo from "../../assets/images/brand-logos/1.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";
import api from "@api/axios";
import axios from "axios";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import InputField from "@components/common/input";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { LoadingContext } from "@components/hook/useLoading";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, toggleLoading } = useContext(LoadingContext);
  const {
    handleSubmit: SubmitForgotPassword,
    register: changePwdData,
    formState: { errors },
  } = useForm<{ email: string }>();

  const HandleForgotPassword = async (changePwdData: { email: string }) => {
    try {
      toggleLoading(true);
      const response = await api.post("/forgot", changePwdData);
      if (response && response.status === 200) {
        const data = await response?.data;
        navigate(`/verify-code?email=${changePwdData.email}&signup=false`);
        toast.success(data.message);
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
          error.response?.data.message || t("forgotPassword.messageWarning"),
        );
      } else {
        toast.error(t("forgotPassword.messageError"));
      }
    } finally {
      toggleLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <form
        onSubmit={SubmitForgotPassword(HandleForgotPassword)}
        className="w-screen sm:max-w-[480px] z-10 mt-[3.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              {t("forgotPassword.forgotPassword")}
            </div>
            <div className="h-12 font-HelveticaNeue text-base font-normal leading-4 tracking-[-0.12px] text-center">
              {t("forgotPassword.descriptionForgotPassword")}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputField
            label={t("forgotPassword.email")}
            placeholder={t("forgotPassword.yourEmail")}
            type="email"
            register={changePwdData("email", {
              required: t("forgotPassword.requireEmail"),
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: t("forgotPassword.messageEmail"),
              },
            })}
            error={errors.email}
          />
        </div>
        <div className="w-[280px] h-[100px] flex flex-col items-center ">
          <PrimarySubmitBtn type="submit" name={t("forgotPassword.send")} />
        </div>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
