import React, {useEffect, useState, createRef} from 'react';

const WebcamNew2 = () => {

  const [capturing, setCapturing] = React.useState(false);
  const [buffer, setBuffer] = React.useState([]);
  const canvasRef = React.useRef(null)
  const videoRef = React.useRef(null)

  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.


  const [video, setVideo] = React.useState(null)
  const [canvas, setCanvas] = React.useState(null)

  //var video = null;
  //var canvas = null;
  //var photo = null;
  //var startbutton = null;

  //const canvas = canvasRef.current;
  //const context = canvas.getContext('2d');

  const startup = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    //setVideo(document.getElementById('video'));
    //setCanvas(document.getElementById('canvas'));
    //photo = document.getElementById('photo');
    //startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);


    //clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  /*const clearphoto = () => {
    //var context = canvas.getContext('2d');
    canvasRef.fillStyle = "#AAA";
    canvasRef.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }*/


  setInterval(function () {
    if(capturing) {
      takepicture();
    }

  }, 1000 / 30) // adjust this for your desired FPS


  const captureVideo = (video) => {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
  }

  const takepicture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    if (capturing) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');

      setBuffer([...data])
      console.log(data)
    }
  }

  useEffect(() => {
    startup()
  },[])


  const startCapturing = () => {
    setBuffer([]);
    setCapturing(true);
  }

  const stopCapturing = () => {
    setCapturing(false)
    console.log(buffer)
  }

return (
    <div>
      <div className="camera">
        <video id="video" ref={videoRef}>Video stream not available.</video>
        <button id="startbutton">Take photo</button>
        {capturing ?
          <button onClick={() => stopCapturing()}>Stop Capture</button>
         :
          <button onClick={() => startCapturing()}>Start Capture</button>
        }
      </div>
      <canvas id="canvas" ref={canvasRef}>
      </canvas>
      <div className="output">
        <img id="photo" alt="The screen capture will appear in this box." />
      </div>
    </div>
   )
 }

export default WebcamNew2;