import React, { useContext, useEffect, useRef, useParams } from "react";
import { SocketContext } from "../../SocketContext";
import "./Join.css";
import homeIcon from "../../assets/video-call.png";
import { message } from "antd";
import Spinner from "../../common/Spinner";
import { setMappingAPI, updateStatus } from "../../API/apis";

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
        .then(() => {
          updateStatus()
            .then((res1) => console.log("updated status"))
            .catch((err1) => console.log(err1));
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
      <div className="flex item-center justify-center h-screen bg-[#F2F4EA]">
        <div>
          <div className="w-[350px] md:w-[700px] border-2 rounded border-green-700">
            {stream ? (
              <video
                width="700"
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
                className="bg-gray-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 mt-6"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="flex item-center justify-between mt-6">
                {newMeet ? (
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
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
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
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
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
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
