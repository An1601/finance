import ActiveMessage from "@components/svg/ActiveMessage";
import React from "react";

interface Chat {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  isOnline: boolean;
  lastMessageStatus: string;
}

interface ChatProps {
  chat: Chat;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ChatListItem: React.FC<ChatProps> = ({ chat, onClick }) => {
  return (
    <div className="flex items-start py-3 cursor-pointer" onClick={onClick}>
      <div className="me-1 leading-none">
        <div className="w-11 h-11 relative rounded-[44px]">
          <img className="w-[44px] h-[44px] rounded-full " src={chat?.avatar} />
          <div className=" absolute left-[32px] top-[32px]">
            <ActiveMessage
              className="w-[10px] h-[10px] absolute left-[32px] top-[32px] "
              color={chat.lastMessageStatus}
            />
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-slate-900 text-sm font-bold font-['Helvetica Neue'] leading-tight">
          {chat.name}
          <span className="ltr:float-right rtl:float-left text-slate-600 font-normal text-xs leading-none tracking-tight">
            {chat.lastMessageTime}
          </span>
        </p>
        <p className="text-[0.75rem] mb-0">
          <span className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-tight">
            {chat.lastMessage}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
