import React, { useContext, useEffect, useRef, useParams } from "react";
import { SocketContext } from "../../SocketContext";
import "./Join.css";
import homeIcon from "../../assets/video-call.png";
import { message } from "antd";
import Spinner from "../../common/Spinner";
import { setMappingAPI } from "../../API/apis";

const Join = (props) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    stream,
    setStream,
    callUser,
    meetingCode,
    setMeetingCode,
    newMeet,
    whoAccessing,
    setWhoAccessing,
  } = useContext(SocketContext);

  const myPreviewVideo = useRef();

  useEffect(() => {
    if (!newMeet && meetingCode.length === 0) {
      props.history.push("/");
      window.location.reload();
      return;
    }
    // if (stream) return;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myPreviewVideo.current.srcObject = res;
      });

    if (whoAccessing === "doctor") {
      setMappingAPI(me)
        .then((res) => {
          console.log("set mapping");
        })
        .catch((err) => console.log(err));
    }
    console.log("my id", me, whoAccessing);
  }, []);

  useEffect(() => {
    if (callAccepted) props.history.push("meet");
  }, [callAccepted]);

  return (
    <>
      <div className="join-page">
        <div>
          <div className="video-div">
            {stream ? (
              <video
                width="250"
                height="140"
                src=""
                ref={myPreviewVideo}
                autoPlay
                muted
              ></video>
            ) : (
              <Spinner />
            )}
          </div>
          {stream && (
            <>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="join-btns-div">
                {newMeet ? (
                  <button
                    className="btn"
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Please enter your name");
                        return;
                      }
                      props.history.push("meet");
                    }}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="btn"
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Please enter your name");
                        return;
                      }

                      callUser(meetingCode);
                    }}
                  >
                    Join now
                  </button>
                )}
                <button
                  className="btn"
                  onClick={() => {
                    setMeetingCode("");
                    props.history.push("/");
                    window.location.reload();
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Join;
