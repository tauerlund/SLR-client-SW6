import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import WebcamNew from "./WebcamNew";
import Navbar from "./Navbar";
import Quiz from "./Quiz";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
    <Navbar />
    <div className="container mt-2" style={{ marginTop: 40 }}>
      <Switch>
        <Route exact path="/">
          <h1>hello there!</h1> 
        </Route>
        <Route path="/translation">
          <WebcamNew  frameRate={30} width={1920} height={1080} />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);