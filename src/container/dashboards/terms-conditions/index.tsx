import Breadcrumb from "@components/common/breadcrumb";
import PrimarySubmitBtn from "@components/common/button/primary-submit-btn";
import useWindowWidth from "@components/hook/useWindowWidth";
import { TERMS_CONDITIONS } from "./data";
import BackIcon from "@components/svg/Back";
import { useNavigate } from "react-router-dom";

function TermsConditions() {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();

  if (windowWidth >= 480) {
    return (
      <div>
        <Breadcrumb primaryText="Account" secondaryText="Terms & Conditions" />
        <div className="p-6 gap-20  bg-white rounded-md">
          <div className="flex flex-row items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
            <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
              Terms & Conditions
            </div>
          </div>
          {TERMS_CONDITIONS.map((item, index) => (
            <div key={index} className="pb-3">
              <div className="text-slate-900 text-sm font-bold font-['Helvetica Neue'] leading-tight">
                {item.label}
              </div>
              <span className="text-sm leading-tight">{item.description}</span>
            </div>
          ))}
          <div className="w-full flex items-center gap-2">
            <input className="" type="checkbox" />
            <div>I agree with the Terms & Conditions</div>
          </div>
          <form>
            <div className="flex justify-center mt-10">
              <button type="submit">
                <PrimarySubmitBtn name="Accept" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="!mt-0 sm:!mt-[60px] flex flex-row gap-8">
        <div className="w-screen sm:max-w-[480px] bg-[#F5F9FF]">
          <div>
            <div className="flex flex-row items-center gap-3 px-6 py-7">
              <div
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <BackIcon color="#45556E" />
              </div>
              <div className="text-center text-slate-900 text-2xl font-bold font-['Helvetica Neue'] leading-loose">
                Terms & Conditions
              </div>
            </div>
          </div>

          <div className="bg-[#F5F9FF] mb-20">
            <div className="bg-white p-6 rounded-t-[24px] flex flex-col gap-3 ">
              <div className="flex flex-row items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#F57156] rounded-sm" />
                <div className="text-slate-900 text-lg font-bold font-['Helvetica Neue'] leading-7">
                  Terms & Conditions
                </div>
              </div>
              {TERMS_CONDITIONS.map((item, index) => (
                <div key={index} className="pb-3">
                  <div className="text-slate-900 text-sm font-bold font-['Helvetica Neue'] leading-tight">
                    {item.label}
                  </div>
                  <span className="text-sm leading-tight">
                    {item.description}
                  </span>
                </div>
              ))}
              <div className="w-full flex items-center gap-2">
                <input type="checkbox" />
                <div>I agree with the Terms & Conditions</div>
              </div>
              <div className="flex justify-center">
                <button>
                  <PrimarySubmitBtn name="Accept" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsConditions;
