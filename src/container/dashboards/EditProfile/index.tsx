import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@redux/store";
import BottomBarCustom from "@components/common/bottomBar";
import Breadcrumb from "@components/common/breadcrumb";
import AuthSubmitBtn from "@components/common/button/AuthSubmitBtn";
import InputField from "@components/common/input";
import useWindowWidth from "@components/hook/useWindowWidth";
import HeaderItem from "../profile/Header";

function EditProfile() {
  const navigate = useNavigate();
  const { name, email, phone, address, date_of_birth } = useSelector(
    (state: RootState) => state.rootReducer.userReducer,
  );
  const windowWidth = useWindowWidth();

  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, serUserPhone] = useState(phone);
  const [userAddress, setUserAddress] = useState(address);
  const [userDateOfBirth, setUserDateOfBirth] = useState(date_of_birth);

  return (
    <div>
      {windowWidth >= 480 ? (
        <div>
          <Breadcrumb
            primaryText="Account"
            secondaryText="Edit Profile"
            showSecondary
          />

          <div className="p-6 gap-20  bg-white rounded-md">
            <div className="flex flex-row items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
              <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                Edit Profile
              </div>
            </div>
            <form>
              <div className="flex gap-20">
                {/* Cột trái */}
                <div className="w-1/2 flex flex-col space-y-4">
                  <InputField
                    label="Name"
                    value={userName}
                    onChange={(e: any) => setUserName(e.target.value)}
                  />

                  <InputField
                    label="Phone number"
                    value={userPhone}
                    onChange={(e: any) => serUserPhone(e.target.value)}
                  />

                  <InputField
                    label="Email"
                    type="email"
                    value={userEmail}
                    onChange={(e: any) => setUserEmail(e.target.value)}
                  />
                </div>

                {/* Cột phải */}
                <div className="w-1/2 flex flex-col space-y-4">
                  <InputField
                    label="Date of Birth"
                    type="date"
                    value={userDateOfBirth}
                    onChange={(e: any) => setUserDateOfBirth(e.target.value)}
                  />

                  <InputField
                    label="Address"
                    value={userAddress}
                    onChange={(e: any) => setUserAddress(e.target.value)}
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
          <div className="w-screen sm:max-w-[480px] bg-white">
            <HeaderItem
              className="pt-[10px] pb-[28px]"
              showIconImage={true}
              userName={name}
              email={email}
              onClick={() => {
                navigate("/profile");
              }}
              showBack={true}
            />
            <div className="bg-[#01D2B4] mb-20">
              <form className="bg-white p-6 rounded-t-[24px] flex flex-col gap-8 ">
                <InputField
                  label="Name"
                  value={userName}
                  onChange={(e: any) => setUserName(e.target.value)}
                />

                <InputField
                  label="Phone number"
                  value={userPhone}
                  onChange={(e: any) => serUserPhone(e.target.value)}
                />

                <InputField
                  label="Email"
                  type="email"
                  value={userEmail}
                  onChange={(e: any) => setUserEmail(e.target.value)}
                />
                <InputField
                  label="Date of Birth"
                  type="date"
                  value={userDateOfBirth}
                  onChange={(e: any) => setUserDateOfBirth(e.target.value)}
                />
                <InputField
                  label="Address"
                  value={userAddress}
                  onChange={(e: any) => setUserAddress(e.target.value)}
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

export default EditProfile;
