import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from 'react-router-dom';
import openSocket from "socket.io-client";
import './App.css';
import WebcamCapture from "./Screenshot"
import Video from "./Video"
import Blobby from "./Blob"
import mainMenu from "./mainMenu"
import translation from "./translation"


function App() {
  const [response, setResponse] = useState("");
  const socket = openSocket('http://localhost:5000');
  const [mode, setMode] = useState(true); 
  const [lock, setLock] = useState(false);
  const [label, setLabel] = useState("")


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

  useEffect(() => {
    socket.on("label", data => {
      setLabel(data)
    })
  }, [])

  socket.on('disconnect', () => {
    socket.open();
  });

  const changeMode = () => {
    setMode(!mode)
  };

  return (
    <div id="App">
     <div class='maincontainer'>
      <Switch>     
        <Route exact path="/" component={mainMenu}>
        </Route>
        <Route exact path="/translation/" component={translation} />

      </Switch>
      </div>     
    </div>
  );
}

export default App;

/*
      <h1>{response}</h1>
      <h1>{}</h1>
      <button onClick={changeMode}>Switch Mode</button>      
      {mode ?
        <WebcamCapture Lock={lock} changeLock={() => {setLock(true)}} 
        io={socket} response={response.data} label={label.data} />
        :
        <div>
          <Video io={socket} />
          <Blobby props={response.data} />
        </div>
      }
*/