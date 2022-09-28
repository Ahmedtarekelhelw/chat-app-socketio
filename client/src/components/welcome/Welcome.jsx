import React from "react";
import Robot from "../../assets/robot.gif";
import "./Welcome.scss";

const Welcome = ({ currentUser }) => {
  return (
    <div className="welcome">
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
