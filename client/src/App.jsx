import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SetAvatar from "./pages/setAvatar/SetAvatar";

const IsAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  return user ? <Navigate to="/" /> : children;
};

const IsNotAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  return !user ? (
    <Navigate to="/login" />
  ) : user.isAvatar === true ? (
    <Navigate to="/" />
  ) : (
    children
  );
};

const ChatAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  return !user ? <Navigate to="/login" /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ChatAuth>
              <Chat />
            </ChatAuth>
          }
        />
        <Route
          path="/setAvatar"
          element={
            <IsNotAuth>
              <SetAvatar />
            </IsNotAuth>
          }
        />
        <Route
          path="/login"
          element={
            <IsAuth>
              <Login />
            </IsAuth>
          }
        />

        <Route
          path="/register"
          element={
            <IsAuth>
              <Register />
            </IsAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
