import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Messages.scss";

const Messages = ({ messages, scrollRef }) => {
  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={uuidv4()} ref={scrollRef}>
          <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
            <div className="content">
              <p>{msg.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
