import React, { useEffect, useState } from "react";
import "./SetAvatar.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../../api";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      //get the user from localStorage
      const user = await JSON.parse(localStorage.getItem("User"));

      //make a post request to set the avater
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatar: avatars[selectedAvatar],
      });

      if (data.isAvatar) {
        user.isAvatar = data.isAvatar;
        user.Avatar = data.Avatar;
        localStorage.setItem("User", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const setAvatar = async () => {
      const data = [];
      for (let i = 0; i < 2; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`,
          { params: { apikey: process.env.REACT_APP_API_KEY } }
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    setAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <img src={Loader} alt="Loading" />
        </div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, i) => (
              <div
                className={`avatar ${selectedAvatar === i ? "selected" : ""}`}
                key={i}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(i)}
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="setAvatar-button">
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
