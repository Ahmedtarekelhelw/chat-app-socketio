import React from "react";
import "./Logout.scss";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button onClick={handleClick} className="logout">
      <BiPowerOff />
    </button>
  );
};

export default Logout;
