import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "./Auth.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../api";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { username, email, password, confirmPassword } = values;
    if (!username && !email && !password && !confirmPassword) {
      toast.error("Please Filled The Fields", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (!email) {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("User", JSON.stringify(data.newUser));
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
            className="auth-input"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit" className="auth-button">
            Create User
          </button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
