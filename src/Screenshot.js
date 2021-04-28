import React, { useEffect } from 'react';
import Webcam from "react-webcam";

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
  };
  
  const WebcamCapture = (props) => {

    

    useEffect(() => {
      const interval = setInterval(() => {
          capture()      
      }, 1000);
      return () => clearInterval(interval);
    }, [])
    
    const webcamRef = React.useRef(null);  
   
    const capture = (() => {
      //console.log(props.Lock)
      //console.log(props.Lock)
      //if (props.Lock === false) {
        const imageSrc = webcamRef.current.getScreenshot({width: 1920, height: 1080});
        if(imageSrc){
          console.log("Sending frame.")
          props.io.emit("getFrame", imageSrc)
          props.changeLock()
        }
      //}

    });

    return (
      <>
        <Webcam className
          audio={false}
          width={600}
          //height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />

        <button onClick={capture}>Capture photo</button>
      </>
    )
  };
  export default WebcamCapture;