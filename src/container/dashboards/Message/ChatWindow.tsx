import avatar from "@assets/images/profile/avatar.jpeg";
import Sticker from "@assets/icon/Sticker.svg";
import Send from "@assets/icon/Send.svg";
import ActiveMessage from "@components/svg/ActiveMessage";
import { ChatData, Message } from "@type/types";

const ChatWindow = ({ data }: { data: ChatData }) => {
  return (
    <div className="main-chat-area border">
      <div className="sm:flex items-center border-b">
        <div className="justify-start items-center gap-3 flex px-6 py-4 ">
          <div className="w-11 h-11 relative rounded-[44px]">
            <img
              className="w-[44px] h-[44px] rounded-full "
              src={data.avatar}
            />
            <div className=" absolute left-[32px] top-[32px]">
              <ActiveMessage
                className="w-[10px] h-[10px] absolute left-[32px] top-[32px] "
                color={data.lastMessageStatus}
              />
            </div>
          </div>
          <div className="flex-col justify-start items-start inline-flex">
            <div className="text-slate-900 text-sm font-bold font-['Helvetica Neue'] leading-tight">
              {data.name}
            </div>
            <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-tight">
              {data.status}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 mt-1 h-full overflow-y-auto px-6 pb-[180px] overflow-scroll ">
        {data.messages.map((message: Message, index: any) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              message.type === "sent" ? "justify-end" : ""
            }`}
          >
            {message.type === "received" && (
              <img
                className="size-8 rounded-full object-cover"
                src={message.avatar}
                alt="avatar"
              />
            )}
            <div
              className={`${
                message.type === "sent"
                  ? "ml-auto rounded-l-xl rounded-tr-xl bg-[#16202F] text-white"
                  : "mr-auto rounded-r-xl rounded-tl-xl bg-[#F5F9FF] text-slate-700"
              } flex max-w-[70%] flex-col gap-2 p-4 text-sm md:max-w-[60%]`}
            >
              {message.content}
              <span className="ml-auto text-xs">{message.time}</span>
            </div>
            {message.type === "sent" && (
              <img
                className="size-8 rounded-full object-cover"
                src={avatar}
                alt="avatar"
              />
            )}
          </div>
        ))}
      </div>
      <div className="chat-footer flex-row">
        <input
          className="form-control w-full !rounded-md"
          placeholder="Type your message here..."
          type="text"
        />
        <button className="ml-2">
          <img src={Sticker} alt="Sticker" />
        </button>
        <button className="ml-2">
          <img src={Send} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
