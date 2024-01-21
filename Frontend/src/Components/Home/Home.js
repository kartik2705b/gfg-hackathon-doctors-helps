import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import "./Home.css";
import homeIcon from "../../assets/video-call.png";
import homeIcon1 from "../../assets/home.png";
import noteIcon from "../../assets/note2.png";
import ChatIcon from "@material-ui/icons/Chat";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SurroundSoundIcon from "@material-ui/icons/SurroundSound";
import DuoIcon from "@material-ui/icons/Duo";
import { Link } from "react-router-dom";
import { message } from "antd";

const Home = (props) => {
  const paramsCode = props.location.search;

  const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);

  useEffect(() => {
    if (paramsCode.length) {
      if (paramsCode.substring(0, 5) == "?ref=") return; // for product hunt ref
      setMeetingCode(paramsCode.substring(1));
    }
    setNewMeet(null);
  }, []);

  return (
    <div className="home">
      <div>
        <div>
          <div>
            <div className="contents">
              <h1>
                <b>Welcome Friends</b>
              </h1>
              <h3>
                <b>Its Free and Open to all</b>
              </h3>
              <div className="start-meet">
                <Link
                  to="join"
                  onClick={() => {
                    setNewMeet(true);
                  }}
                >
                  Start Meeting
                </Link>
              </div>
              <div className="join-meet">
                <input
                  type="text"
                  placeholder="Enter meeting code"
                  value={meetingCode || ""}
                  onChange={(e) => {
                    setMeetingCode(e.target.value);
                  }}
                />
                <button
                  className="home-btn"
                  onClick={() => {
                    if (!meetingCode || meetingCode.trim().length === 0) {
                      message.error("Please enter the meeting code");
                      return;
                    }
                    props.history.push("join");
                  }}
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </div>
          {/* <div className="right-div">
            <img src={homeIcon} alt='' />
            <video
              src={homeVideo}
              id="video"
              alt="video"
              autoPlay
              muted
              loop
            ></video>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
