import { useState } from "react";
import { chats } from "./data";
import ChatListItem from "./ChatList";
import ChatSearch from "./ChatSearch";
import ChatHeader from "./ChatHeader";
import Breadcrumb from "@components/common/breadcrumb";
import ChatWindow from "./ChatWindow";
import BottomBarCustom from "@components/common/bottom-bar";
import useWindowWidth from "@components/hook/useWindowWidth";
import { useTranslation } from "react-i18next";

function Message() {
  const [detailChat, setDetailChat] = useState(chats[0]);
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();

  return (
    <div>
      {windowWidth > 900 && <Breadcrumb primaryText="Chat" />}
      <div className="main-chart-wrapper gap-4 flex px-6 ">
        <div className="chat-info border ">
          <ChatHeader />
          <ChatSearch />
          <div className="mt-2 px-6 ">
            <div className="text-[#8c9097] text-[0.6875rem] font-semibold mb-2 opacity-[0.7] ">
              {t("message.allChat")}
            </div>
          </div>
          <div className="chat-users-tab px-6">
            {chats.map((chat, index) => (
              <ChatListItem
                key={index}
                chat={chat}
                onClick={() => {
                  setDetailChat(chats[index]);
                }}
              />
            ))}
          </div>
        </div>
        <ChatWindow data={detailChat} />
        <BottomBarCustom />
      </div>
    </div>
  );
}

export default Message;
