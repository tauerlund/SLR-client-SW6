import {Fragment} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import WebCamHandler from './WebcamHandler'



function translation() {
    return (
        <div>       
            <Fragment>
                <h1>Translation</h1>         
                <Link to="/">
                    <button type="button">Back</button>
                </Link>
                <WebCamHandler />
            </Fragment>
        </div>
    )
} 

export default translation;