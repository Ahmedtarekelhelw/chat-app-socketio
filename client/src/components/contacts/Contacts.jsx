import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import "./Contacts.scss";

const Contacts = ({ contacts, currentUser, handleChatChange }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.Avatar);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="user-chat">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((c, i) => (
              <div
                className={`contact ${currentSelected === i && "selected"}`}
                key={i}
                onClick={() => changeCurrentChat(i, c)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${c.Avatar}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{c.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
