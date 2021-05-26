import React, { useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { SyncLoader, ScaleLoader } from "react-spinners";
import Countdown from "./countdown";
import CountdownCapture from "./countdownCapture"
import { ProgressBar } from 'react-bootstrap';
import "flip-card-wc";


const WebcamHandler = ({ frameRate, width, height, SetResult, Word, setTurn, setIsClassifying }) => {
  const webcamRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [buffer, setBuffer] = React.useState([]);
  const [intervalId, setIntervalId] = React.useState(0);
  const [label, setLabel] = React.useState("");
  const [classifying, setClassifying] = React.useState(false);

  useEffect( () => {
    setClassifying(false)
  }, [Word]);

  console.log(Word)

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
    // Reset states   
    clearInterval(intervalId);    
    setClassifying(true);
    setCapturing(false);
    setIsClassifying(true)
    // Send frames to backend
    axios.post("http://localhost:5000/recognize", buffer).then((res) => {
      setClassifying(false);
      console.log(res.data);
      console.log(Word.name)
      setLabel(res.data);
      setBuffer([]);
      // Is the word correct?
      if(res.data == Word.name){
        SetResult("Success")
        setTurn(1)  
      } else {
        SetResult("Wrong")
        setTurn(2)
    }
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
      
      <br></br>      
      <Countdown setCapturing={setCapturing} startCapture={startCapture} Word={Word} />         
        {capturing ? 
          <div>
            <CountdownCapture startTimer={10} setCapturing={setCapturing} capturing={capturing} stopCapture={stopCapture} Word={Word} /> 
            <h1 className="whiteText">Recording</h1><ScaleLoader color="white" />
          </div>        
        : 
        <div>
          <ProgressBar animated  />
        </div>
        }   
      
      
      <div className="whiteText">
        <br></br>
        {classifying ? <h3>You signed: {label}</h3> : null}
        <SyncLoader loading={classifying} color="white" /> 
      </div>
    </div>
  );
};

export default WebcamHandler;