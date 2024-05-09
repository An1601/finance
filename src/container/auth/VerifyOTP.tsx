import { Fragment } from "react/jsx-runtime";
import logo from "../../assets/images/brand-logos/1.png";
import { useEffect, useRef, useState } from "react";

function VerifyOTP() {
  const searchParams = new URLSearchParams(location.search);
  const signup_mode = searchParams.get("signup");
  const email = searchParams.get("email");

  const ref_otp = useRef<HTMLInputElement[]>(Array(5).fill(null));
  const [otp, setOTP] = useState<string[]>(Array(5).fill(""));
  const [time, setTime] = useState<number>();
  let current_time: number;

  useEffect(() => {
    if (time && time >= 0) {
      current_time = setInterval(() => {
        setTime((prevTime) => (prevTime && prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(current_time);
    } else if (time && time < 0) {
      setOTP(Array(5).fill(""));
    }
  }, [time]);

  useEffect(() => {
    setTime(10);
  }, []);

  const focusNextOTPItem = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newotp = [...otp];
    newotp[index] = ref_otp.current[index]?.value || "";
    setOTP(newotp);

    if (event.key === "Backspace") {
      if (index > 0) {
        ref_otp.current[index].value = "";
        ref_otp.current[index - 1].focus();
      }
    } else {
      if (index < ref_otp.current.length - 1 && event.key !== "Tab") {
        if (index === 0 && ref_otp.current[index].value === "") {
        } else {
          ref_otp.current[index + 1].focus();
        }
      }
    }
  };

  return (
    <Fragment>
      {/* right col */}
      <form
        onSubmit={() => {
          console.log("submit");
        }}
        className="w-screen sm:max-w-[480px] z-10 mt-[6.25rem] mb-[3.25rem] px-6 flex flex-col items-center gap-12"
      >
        {/* frame logo */}
        <div className="w-full flex flex-col items-center justify-between gap-3">
          <img className="h-16 w-16 " src={logo} alt="logo" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 font-HelveticaNeue text-light_finance-textsub text-[2.5rem] font-bold leading-12 tracking-[-1.2px]">
              Verification Code
            </div>
            <div className="h-12 font-HelveticaNeue text-base font-normal leading-4 tracking-[-0.12px] text-center">
              {`Please type the verification code sent to ${email}`}
            </div>
          </div>
        </div>
        {/* frame input */}
        {/* input field */}
        <div className="w-full flex justify-center gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              key={index}
              type="text"
              className="h-[3.375rem] w-[3.375rem] bg-light_finance-background border-[1px] border-light_finance-texttitle rounded-lg text-2xl font-HelveticaNeue font-medium leading-7"
              maxLength={1}
              onKeyUp={(event) => focusNextOTPItem(event, index)}
              ref={(el) => {
                if (el) {
                  ref_otp.current[index] = el;
                }
              }} // Chuyển đổi kiểu dữ liệu về undefined để tránh lỗi TypeScript
            />
          ))}
        </div>
        {/* countdown */}
        {time && time >= 0 ? (
          <div className="font-HelveticaNeue font-bold text-[14px] leading-5 text-light_finance-textbody">
            {`${time ?? ""} second`}
          </div>
        ) : (
          <div className="flex gap-[0.625rem] items-center">
            <span className="font-['Be Vietnam'] font-normal text-[14px] leading-5 text-dark_finance-texttitle">
              I don’t recevie a code
            </span>
            <span
              onClick={() => {}}
              className="font-HelveticaNeue font-bold text-[14px] leading-5 text-light_finance-textbody cursor-pointer"
            >
              Resend
            </span>
          </div>
        )}
        {/* frame button */}
        <div className="w-[280px] h-[100px] flex flex-col items-center ">
          <button
            type="submit"
            disabled={time && time > 0 ? false : true}
            className={`w-[280px] px-3 py-4 bg-light_finance-primary rounded-[28px] shadow border-2 flex justify-center items-center`}
          >
            <div className="text-light_finance-textbody text-base font-medium font-['Helvetica Neue'] leading-normal tracking-tight">
              Send
            </div>
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default VerifyOTP;
