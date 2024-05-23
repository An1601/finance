import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import MobileHomeBtn from "../../../components/common/button/MobileHomeBtn";
import { faqQuestion } from "./FAQData";

const FAQ = () => {
  const navigate = useNavigate();
  const {
    handleSubmit: submitFAQ,
    register: faqData,
    formState: { errors },
  } = useForm();
  return (
    <div className="min-h-screen md:min-h- relative mt-[75px] md:m-0 flex flex-col gap-7 bg-light_finance-background1">
      <div className="md:hidden flex items-center justify-between">
        <div className="flex gap-3 items-center mx-6">
          <i
            className=" fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
            FAQ's
          </div>
        </div>
      </div>
      <div className="w-full flex-1 bg-light_finance-background p-6 mt-6 md:mt-8 rounded-t-[1.5rem] flex flex-col gap-10 lg:flex-col-reverse lg:justify-end">
        {/* question */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-center text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                Still have question ?
              </div>
            </div>
            <div className="text-light_finance-textbody text-sm font-normal font-HelveticaNeue">
              You can post your questions here, our support team is always
              active
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full h-[52px] px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.name ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full justify-start items-start gap-2 flex">
                <input
                  className="w-full p-0 text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Enter your name"
                  {...faqData("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                <div
                  className={`${errors.name ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                >
                  Your name
                </div>
              </div>
            </div>
            {errors.name && typeof errors.name?.message === "string" && (
              <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <div
              className={`w-full px-4 py-2 left-0 top-0 bg-light_finance-background rounded-[0.5rem] border-[1px] ${errors.name ? "border-red" : "border-light_finance-texttitle"}  flex justify-between items-center `}
            >
              <div className="w-full h-[136px]  justify-start items-start gap-2 flex">
                <textarea
                  className="w-full p-0 text-light_finance-textbody text-sm font-normal font-['Helvetica Neue'] leading-tight border-none outline-none"
                  placeholder="Enter your question here"
                  {...faqData("question", {
                    required: "Question is required",
                  })}
                />
              </div>
              <div className="px-1 left-[12px] top-[-0.5rem] h-4 absolute bg-light_finance-background rounded-[0.25rem] flex items-center">
                <div
                  className={`${errors.question ? "text-red" : "text-light_finance-textsub"} text-xs font-normal font-HelveticaNeue leading-none tracking-tight`}
                >
                  Textarea
                </div>
              </div>
            </div>
            {errors.question &&
              typeof errors.question?.message === "string" && (
                <div className="font-HelveticaNeue text-red text-[12px] font-normal leading-4 tracking-tight">
                  {errors.question.message}
                </div>
              )}
          </div>
          <div className="flex justify-end">
            <MobileHomeBtn name="Send" />
          </div>
        </div>
        {/* q&a */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* general topic */}
          <div className="w-full">
            <div className="flex gap-3 items-center">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-center text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                General Topics ?
              </div>
            </div>
            <div className="mt-4">
              {faqQuestion.map((question, index) => {
                return (
                  <div
                    className={`relative border-[1px] border-stroke ${index === 0 && "rounded-t-lg"}`}
                    key={index}
                  >
                    <input
                      id={`toggle_${index}`}
                      className="w-full absolute h-16 top-0 opacity-0 peer"
                      type="checkbox"
                    />
                    <div
                      className={`h-16 py-3 pl-4 pr-8 ${index === 0 ? "rounded-t-lg" : ""} peer-checked:bg-light_finance-textbody font-HelveticaNeue font-bold text-sm leading-5 text-light_finance-textbody peer-checked:text-white overflow-hidden text-ellipsis line-clamp-2`}
                    >
                      {question.title}
                    </div>
                    <i className="fa-solid fa-chevron-down fa-lg absolute top-8 right-4 transition-all duration-500 text-light_finance-textsub peer-checked:text-white peer-checked:rotate-180"></i>
                    <div className="w-full px-4 py-3 hidden peer-checked:block transition-all duration-500 font-HelveticaNeue font-normal text-sm leading-5 text-light_finance-textbody">
                      {question.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* customer support */}
          <div className="w-full">
            <div className="flex gap-3 items-center">
              <div className="w-1 h-5 bg-danger rounded-sm" />
              <div className="text-center text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
                Customer Support ?
              </div>
            </div>
            <div className="mt-4">
              {faqQuestion.map((question, index) => {
                return (
                  <div
                    className={`relative border-[1px] border-stroke ${index === 0 && "rounded-t-lg"}`}
                    key={index}
                  >
                    <input
                      className="w-full absolute h-16 top-0 opacity-0 peer"
                      type="checkbox"
                    />
                    <div
                      className={`h-16 py-3 pl-4 pr-8 ${index === 0 ? "rounded-t-lg" : ""} peer-checked:bg-light_finance-textbody font-HelveticaNeue font-bold text-sm leading-5 text-light_finance-textbody peer-checked:text-white overflow-hidden text-ellipsis line-clamp-2`}
                    >
                      {question.title}
                    </div>
                    <i className="fa-solid fa-chevron-down fa-lg absolute top-8 right-4 transition-all duration-200 text-light_finance-textsub peer-checked:text-white peer-checked:rotate-180"></i>
                    <div className="w-full px-4 py-3 hidden peer-checked:block transition-all duration-500 font-HelveticaNeue font-normal text-sm leading-5 text-light_finance-textbody">
                      {question.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
