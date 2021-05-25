import React, { useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { SyncLoader, BarLoader, MoonLoader } from "react-spinners";


const WebcamTimed = ({ frameRate, width, height }) => {
  const webcamRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [buffer, setBuffer] = React.useState([]);

  const [intervalId, setIntervalId] = React.useState(0);

  const [label, setLabel] = React.useState("");
  const [classifying, setClassifying] = React.useState(false);

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user",
  };

  const startCapture = () => {
    console.log(buffer);

    setCapturing(true);
    const interval = setInterval(() => {
      const frame = webcamRef.current.getScreenshot({
        width: width,
        height: height,
      });
      let tempBuffer = buffer;
      tempBuffer.push(frame);
      setBuffer(tempBuffer);
      console.log("Saving frame.");
    }, 1000 / frameRate);
    setIntervalId(interval);
  };

  const stopCapture = async () => {
    clearInterval(intervalId);
    setCapturing(false);

    // Send frames to backend
    setClassifying(true);
    axios.post("http://localhost:5000/classify", buffer).then((res) => {
      console.log(res.data);
      setClassifying(false);
      setLabel(res.data);
      setBuffer([]);
    });
  };

  const getButton = () => {
    if (classifying) {
      return (
        <button className="btn btn-secondary" disabled={true}>
          Classifying
        </button>
      );
    }

    return capturing ? (
      <button onClick={stopCapture} className="btn btn-danger">
        Stop capturing
      </button>
    ) : (
      <button onClick={startCapture} className="btn btn-success">
        Start capturing
      </button>
    );
  };

  const webcamStyle = () => {
    return capturing ? {} : {};
  };

  return (
    <div className="container align-content-center">
      <Webcam
        className="card mt-3"
        audio={false}
        width={600}
        //height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div className="mt-3 mb-3">{getButton()}</div>
      <div>
        {classifying ? <SyncLoader loading={true} /> : <h1>{label}</h1>}
      </div>
    </div>
  );
};

export default WebcamTimed;
