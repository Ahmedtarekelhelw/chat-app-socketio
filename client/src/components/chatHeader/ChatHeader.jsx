import React from "react";
import Logout from "../logout/Logout";
import "./ChatHeader.scss";

const ChatHeader = ({ currentChat }) => {
  return (
    <div className="chat-header">
      <div className="user-details">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentChat?.Avatar}`}
            alt=""
          />
        </div>
        <div className="username">
          <h3>{currentChat?.username}</h3>
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default ChatHeader;
