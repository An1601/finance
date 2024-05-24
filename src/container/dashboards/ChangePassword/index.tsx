import { useState } from "react";
import BottomBarCustom from "@components/common/bottomBar";
import Breadcrumb from "@components/common/breadcrumb";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import InputField from "@components/common/input";
import useWindowWidth from "@components/hook/UseWindowWidth";
import BackIcon from "@components/svg/Back";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
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
            primaryText="Account"
            secondaryText="Change password"
            showSecondary
          />

          <div className="p-6 gap-20  bg-white rounded-md">
            <div className="flex flex-row items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                Change Password
              </div>
            </div>
            <form>
              <div className="flex gap-20">
                {/* Cột trái */}
                <div className="w-1/2 flex flex-col space-y-4">
                  <InputField
                    label="Current Password"
                    placeholder="Your current password"
                    showPassword={showPassword1}
                    type={showPassword1 ? "text" : "password"}
                    toggleShowPassword={() => setShowPassword1(!showPassword1)}
                    isPassword
                  />

                  <InputField
                    label="Password"
                    placeholder="Your password"
                    showPassword={showPassword2}
                    type={showPassword2 ? "text" : "password"}
                    toggleShowPassword={() => setShowPassword2(!showPassword2)}
                    isPassword
                  />
                </div>

                {/* Cột phải */}
                <div className="w-1/2 flex flex-col space-y-4">
                  <InputField
                    label="Confirm password"
                    placeholder="Your confirm password"
                    showPassword={showPassword3}
                    type={showPassword3 ? "text" : "password"}
                    toggleShowPassword={() => setShowPassword3(!showPassword3)}
                    isPassword
                  />
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <button type="submit">
                  <AuthSubmitBtn name="Update" />
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
                  Change password
                </div>
              </div>
            </div>

            <div className="bg-[#F5F9FF] mb-20">
              <form className="bg-white p-6 rounded-t-[24px] flex flex-col gap-8 ">
                <InputField
                  label="Current Password"
                  placeholder="Your current password"
                  showPassword={showPassword1}
                  type={showPassword1 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword1(!showPassword1)}
                  isPassword
                />
                <InputField
                  label="Password"
                  placeholder="Your password"
                  showPassword={showPassword2}
                  type={showPassword2 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword2(!showPassword2)}
                  isPassword
                />
                <InputField
                  label="Confirm password"
                  placeholder="Your confirm password"
                  showPassword={showPassword3}
                  type={showPassword3 ? "text" : "password"}
                  toggleShowPassword={() => setShowPassword3(!showPassword3)}
                  isPassword
                />
                <div className="flex justify-center">
                  <button type="submit">
                    <AuthSubmitBtn name="Update" />
                  </button>
                </div>
              </form>
            </div>
            <BottomBarCustom />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
