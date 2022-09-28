import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { allUserRoute, host } from "../../api";
import Contacts from "../../components/contacts/Contacts";
import Welcome from "../../components/welcome/Welcome";
import ChatContainer from "../../components/chatContainer/ChatContainer";
import { io } from "socket.io-client";
import "./Chat.scss";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (localStorage.getItem("User")) {
        setCurrentUser(await JSON.parse(localStorage.getItem("User")));
      }
    };
    checkCurrentUser();
  }, []);

  useEffect(() => {
    const checkAvatar = async () => {
      if (currentUser) {
        if (currentUser.isAvatar) {
          const { data } = await axios.get(
            `${allUserRoute}/${currentUser._id}`
          );
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    checkAvatar();

    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          handleChatChange={handleChatChange}
        />
        {!currentChat ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
