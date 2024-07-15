import { Fragment } from "react/jsx-runtime";
import logo from "@assets/images/brand-logos/1.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@components/common/loader";
import api from "@api/axios";
import axios from "axios";
import { useLocalStorage } from "@utils/index";
import { useTranslation } from "react-i18next";
import { useLoading } from "@components/hook/useLoading";

function VerifyOTP() {
  const searchParams = new URLSearchParams(location.search);
  const signupMode = searchParams.get("signup") === "true" ? true : false;
  const email = searchParams.get("email");
  const { setItem, getItem, removeItem } = useLocalStorage();
  const { isLoading, toggleLoading } = useLoading();
  const refOTP = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));
  const navigate = useNavigate();
  const [otp, setOTP] = useState<string[]>(Array(5).fill(""));
  const [time, setTime] = useState<number>(60);
  const [isFilled, setIsFilled] = useState(false);
  const { t } = useTranslation();

  const focusNextOTPItem = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      setOTP((prevState) =>
        prevState.map((item, idx) => (idx === index ? "" : item)),
      );
      event.preventDefault();
      if (index > 0) {
        if (refOTP.current[index]?.value !== "") {
          refOTP.current[index]!.value = "";
        }
        const prevInput = refOTP.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      } else refOTP.current[index]!.value = "";
    } else {
      if (index < refOTP.current.length - 1 && event.key !== "Tab") {
        if (refOTP.current[index]?.value && refOTP.current[index + 1]) {
          refOTP.current[index + 1]!.focus();
        }
      }
    }
  };
  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number,
  ) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text/plain").trim();
    const newOTP = [...otp];
    for (
      let i = 0;
      i < pastedText.length && startIndex + i < refOTP.current.length;
      i++
    ) {
      if (refOTP.current[startIndex + i])
        refOTP.current[startIndex + i]!.value = pastedText[i];

      newOTP[startIndex + i] = pastedText[i];
    }
    setOTP(newOTP);
    const nextIndex = startIndex + pastedText.length;
    if (nextIndex < refOTP.current.length && refOTP.current[nextIndex]) {
      refOTP.current[nextIndex].focus();
    } else {
      const submitButton = document.querySelector("button[type='submit']");
      if (submitButton instanceof HTMLElement) {
        submitButton.focus();
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFilled) {
      submitOTP();
    }
  };
  const submitOTP = async () => {
    let requestBody;
    if (signupMode) {
      requestBody = {
        otp: otp.join(""),
        email: email,
      };
    } else {
      requestBody = {
        verified_code: otp.join(""),
        email: email,
      };
    }
    try {
      toggleLoading(true);
      const response = await api.post(
        `${signupMode ? "verify_otp" : "check-otp"}`,
        requestBody,
      );
      if (response && response.status === 200) {
        const data = await response?.data;
        toast.success(data.message || t("verify.messageOPT"));
        removeItem(`${email}_expirationTime`);
        if (!signupMode) {
          if (data?.access_token)
            navigate(`/reset-password?token=${data.access_token}`);
        } else {
          navigate("/signin");
        }
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
          error.response?.data.message || t("verify.messageWarning"),
        );
      } else {
        toast.error(t("verify.messageError"));
      }
    } finally {
      toggleLoading(false);
    }
  };
  const handleResend = async () => {
    try {
      toggleLoading(true);
      const response = await api.post("resend-otp", { email: email });
      if (response && response.status === 200) {
        resetState();
        saveExpireTimeToLocalStorage(60);
        setTime(60);
        toast.info(t("verify.messageResend"));
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
          error.response?.data.message || t("verify.messageResend"),
        );
      } else {
        toast.error(t("verify.messageError"));
      }
    } finally {
      toggleLoading(false);
    }
  };
  const resetState = () => {
    setOTP(Array(5).fill(""));
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input[type='text']");
    inputs.forEach((input) => {
      input.value = "";
    });
    inputs[0]?.focus();
  };
  const saveExpireTimeToLocalStorage = (sec: number) => {
    const today = new Date();
    const expirationTime = new Date(today.getTime() + sec * 1000);
    setItem(
      `${email}_expirationTime`,
      JSON.stringify(expirationTime.getTime()),
    );
  };
  const calculateRemainingTime = (expirationTime: number) => {
    const currentTime = new Date().getTime();
    const timeRemaining = expirationTime - currentTime;
    if (timeRemaining >= 0) {
      const remainingSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      return remainingSeconds;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    let currentTime: NodeJS.Timeout;
    if (time && time >= 0) {
      currentTime = setInterval(() => {
        setTime((prevTime) => (prevTime && prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(currentTime);
    } else {
      resetState();
    }
    return () => {
      clearInterval(currentTime);
    };
  }, [time]);

  useEffect(() => {
    const storedTime = getItem(`${email}_expirationTime`);
    if (storedTime) {
      setTime(calculateRemainingTime(parseInt(storedTime)));
    } else {
      saveExpireTimeToLocalStorage(60);
    }
    refOTP.current[0]?.focus();
  }, []);
  useEffect(() => {
    setIsFilled(otp.every((value) => value !== ""));
  }, [otp]);

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-[480px] z-10 mt-[3.25rem] mb-[3.25rem] sm:m-0 sm:justify-center px-6 flex flex-col items-center gap-12"
      >
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              {t("verify.verifyCode")}
            </div>
            <div className="h-12 font-HelveticaNeue text-base font-normal leading-4 tracking-[-0.12px] text-center">
              {`${t("verify.descriptionVerify")} ${email}`}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              key={index}
              className={`h-[3.375rem] w-[3.375rem] bg-light_finance-background border-[1px] focus:!border-light_finance-textsub focus:outline-none border-light_finance-texttitle rounded-lg text-2xl font-HelveticaNeue font-medium leading-7 text-center animate-blink-horizontal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              type="text"
              maxLength={1}
              onKeyDown={(event) => focusNextOTPItem(event, index)}
              ref={(el) => (refOTP.current[index] = el)}
              onChange={() => {
                setOTP((prevState) =>
                  prevState.map((item, idx) =>
                    idx === index ? refOTP.current[index]?.value ?? "" : item,
                  ),
                );
              }}
              onPaste={(event) => {
                handlePaste(event, index);
              }}
            />
          ))}
        </div>
        {time && time >= 0 ? (
          <div className="font-HelveticaNeue font-bold text-[14px] leading-5 text-light_finance-textbody">
            {`${time ?? ""} second`}
          </div>
        ) : (
          <div className="flex gap-[0.625rem] items-center">
            <span className="font-['Be Vietnam'] font-normal text-[14px] leading-5 text-dark_finance-texttitle">
              {t("verify.recevie")}
            </span>
            <span
              onClick={() => handleResend()}
              className="font-HelveticaNeue font-bold text-[14px] leading-5 text-light_finance-textbody cursor-pointer"
            >
              {t("verify.resend")}
            </span>
          </div>
        )}
        <div className="w-[280px] h-[100px] flex flex-col items-center ">
          <button
            type="submit"
            disabled={!isFilled ? false : time && time > 0 ? false : true}
            className={`w-[280px] px-3 py-4 rounded-[28px] flex justify-center items-center ${
              isFilled && (time && time > 0 ? true : false)
                ? "bg-light_finance-primary drop-shadow-[0_6px_6px_rgba(50,215,75,0.35)] text-light_finance-textbody"
                : "bg-[#BDC2CA] text-light_finance-texttitle"
            }`}
          >
            <div className="text-base font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
              {t("verify.verify")}
            </div>
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default VerifyOTP;
