import React, { useState, useEffect, Fragment } from "react";
import LearningVideo from "./LearningVideo"
import WebcamHandler from "./WebcamHandler"


const FlashCard = (props) => {    
  const [Result, SetResult] = useState(null);

  const nextCard = () => {
     props.updateWord(Result)
     SetResult(null)
  }

  return (
        <div>
           <WebcamHandler frameRate={30} width={1920} height={1080} SetResult={SetResult} Word={props.Word} />
          {props.Word.status == 0 ? 
            // Display learning video and do the sign                      
            <Fragment>
                {Result == "Success" ? null : 
                    <div>
                        <h1>Do the sign ({props.Word.name}) according to the video!</h1>
                        <LearningVideo />
                    </div>
                }               
                {Result == "Success" ? <div> <h1>Success</h1> <button onClick={nextCard}>Next</button> </div> 
                                     : null
                }
                {Result == "Wrong" ? <h1>You signed the sign wrong, try again!</h1> : null}
            </Fragment> 
            :
            // Make the sign
            <Fragment>
                <h1>Second times the charm..</h1>
                {Result == "Wrong" ? 
                    <div>
                        <h1>You signed {props.Word.name} wrong.</h1>
                        <button onClick={nextCard}>Next</button>    
                    </div>
                    : <h1>Perform the sign: {props.Word.name}</h1>
                }
                {Result == "Success" ? <div><h1>Success</h1><button onClick={nextCard}>Next</button></div> : null}
                {Result == "Wrong" ? <div><h1>Wrong</h1><button onClick={nextCard}>Next</button></div> : null}
            </Fragment>           
          }
        </div>
  );
};

export default FlashCard;