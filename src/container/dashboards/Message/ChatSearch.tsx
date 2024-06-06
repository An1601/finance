import SeacrchIcon from "@assets/icon/SearchIcon.svg";

const ChatSearch = () => (
  <div className="chat-search p-4 border-b">
    <div className="input-group">
      <input
        type="text"
        className="form-control !bg-light border-0 !rounded-s-md"
        placeholder="Search Chat"
      />
      <button
        className="ti-btn ti-btn-light !rounded-s-none !mb-0"
        type="button"
      >
        <img src={SeacrchIcon} />
      </button>
    </div>
  </div>
);

export default ChatSearch;
