import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "./Auth.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../api";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //My Handle Function

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //Form Validate
  const handleValidation = () => {
    const { username, password } = values;
    if (!username || !password) {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("User", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h2>snappy</h2>
        </div>
        <form action="" onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="auth-input"
            onChange={handleChange}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="auth-input"
            onChange={handleChange}
          />
          <button type="submit" className="auth-button">
            Log In
          </button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
