import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from 'react-router-dom';
import openSocket from "socket.io-client";
import './App.css';
import WebcamCapture from "./Screenshot"
import Video from "./Video"
import Blobby from "./Blob"
import mainMenu from "./mainMenu"
import translation from "./translation"
import WebcamNew from "./WebcamNew";


function WebsocketApp() {
  const [response, setResponse] = useState("test");
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
    socket.on("response", response => {
      console.log(response)
      setResponse(response)
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
    <div id="WebsocketApp">
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

export default WebsocketApp;

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