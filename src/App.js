import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import './App.css';
import WebcamCapture from "./Screenshot"
import Video from "./Video"
import Blobby from "./Blob"

function App() {
  const [response, setResponse] = useState("");
  const socket = openSocket('http://localhost:5000');
  const [mode, setMode] = useState(true); 
  const [lock, setLock] = useState(false); 


  useEffect(() => {
    socket.on("disconnect", (reason) => {
      console.log(reason)
    });
  }, [socket]);



  useEffect(() => {
    socket.on("connect", () => {
      console.log("I am connected!")
    });
  }, []);

  useEffect(() => {
    socket.on("response", data => {
      console.log(data)
      setResponse(data)
      if(response === "Confidence score too low."){
        console.log("Confidence score too low!")
      }else{
      }
      //setLock(false)
      //const newData = {...response, data}
      //setResponse(newData)
    })
  }, []); // socket
  
  socket.on('disconnect', () => {
    socket.open();
  });

  const changeMode = () => {
    setMode(!mode)
  };

  return (
    <div id="App">
      <h1>{response}</h1>
      <h1>{}</h1>
      <button onClick={changeMode}>Switch Mode</button>      
      {mode ?
        <WebcamCapture Lock={lock} changeLock={() => {setLock(true)}} 
        io={socket} />
        :
        <div>
          <Video io={socket} />
          <Blobby props={response.data} />
        </div>
      }
    </div>

  );
}

export default App;
