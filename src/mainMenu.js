import {Fragment} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

function mainMenu() {
    return (
        <div>       
            <Fragment>
                <h1>Real-time Sign Language Recognition</h1>
            
                <Link to="/translation">
                    <button type="button">translation</button>
                </Link>
                <Link to="/quiz">
                    <button type="button">quiz</button>
                </Link>

            </Fragment>
        </div>
    )
} 

export default mainMenu;