import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.scss";
import axios from "axios";
import ChatInput from "../chatInput/ChatInput";

import { addMessageRoute, getMessageRoute } from "../../api";
import Messages from "../messages/Messages";
import ChatHeader from "../chatHeader/ChatHeader";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getAllChat = async () => {
      const { data } = await axios.post(getMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(data);
    };
    getAllChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(addMessageRoute, {
      message: msg,
      from: currentUser._id,
      to: currentChat._id,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <ChatHeader currentChat={currentChat} />
      <Messages messages={messages} scrollRef={scrollRef} />
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
