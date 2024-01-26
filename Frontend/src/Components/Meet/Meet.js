import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import Editor from "../Editor/Editor";
import Options from "../Options/Options";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import "./Meet.css";
import homeIcon1 from "../../assets/video-call.png";
import noteIcon from "../../assets/note2.png";
import Spinner from "../../common/Spinner";
import saveAs from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { message } from "antd";
import GetAppIcon from "@material-ui/icons/GetApp";

const Meet = (props) => {
  const {
    me,
    call,
    callAccepted,
    callEnded,
    name,
    myVideo,
    userVideo,
    stream,
    setStream,
    myVideoStatus,
    myMicStatus,
    userVideoStatus,
    userMicStatus,
    showEditor,
    otherUserStream,
    otherUser,
    otherUserName,
    quill,
    setQuill,
  } = useContext(SocketContext);

  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(true);

  const resize = () => {
    setMobileView(window.innerWidth <= 600);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
  }, []);
  // console.log(me,otherUser)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (stream) {
      myVideo.current.srcObject = stream;
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myVideo.current.srcObject = res;
      });
  }, [loading]);

  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [myVideoStatus]);

  useEffect(() => {
    if (userVideo.current) userVideo.current.srcObject = otherUserStream;
    // console.log(otherUserStream)
  }, [otherUserStream, userVideoStatus, loading]);

  const downloadPdf = async () => {
    const delta = quill.getContents();
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    message.success("Downloading your prescription");
    saveAs(pdfAsBlob, `Merge-prescription.pdf`);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <Spinner starting />
      </div>
    );
  }
  return (
    <div>
      <div className={showEditor ? "flex-div" : "flex-div hide-editor"}>
        <div className="left">
          <div className="video-div">
            <div
              className={callAccepted ? "video-frames " : "video-frames v-size"}
            >
              <div className="w-[350px] md:w-[700px] border-2 rounded border-green-700 mt-6">
                {stream ? (
                  <>
                    {myVideoStatus ? (
                      <video
                        width="700"
                        height="140"
                        className="video-ref"
                        src=""
                        ref={myVideo}
                        autoPlay
                        muted
                      ></video>
                    ) : (
                      <div className="video-ref img-bg">
                        <img src={homeIcon1} />
                      </div>
                    )}
                    <div className="name text-center">{name}</div>
                  </>
                ) : (
                  <Spinner />
                )}
              </div>

              {callAccepted && (
                <div className="video-frame">
                  {userMicStatus ? <MicIcon /> : <MicOffIcon />}
                  {userVideoStatus ? (
                    <video
                      width="250"
                      height="140"
                      src=""
                      className="video-ref"
                      ref={userVideo}
                      autoPlay
                      // muted
                    ></video>
                  ) : (
                    <div className="video-ref img-bg">
                      <img src={homeIcon1} />
                    </div>
                  )}
                  <div className="name">{otherUserName}</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <Options history={props.history} />
          </div>
        </div>
        {!mobileView && showEditor && (
          <div className="right">
            <div className="editor-div">
              <div className="head">
                <div className="head-title">
                  <img src={noteIcon} alt="" />
                  <h3>Prescription</h3>
                </div>
                <button
                  className="download"
                  onClick={() => downloadPdf()}
                  title="Download prescription"
                >
                  <GetAppIcon />
                </button>
              </div>
              <Editor />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meet;
