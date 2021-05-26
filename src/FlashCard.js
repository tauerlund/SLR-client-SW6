import React, { useState, useEffect, Fragment } from "react";
import LearningVideo from "./LearningVideo"
import WebcamHandler from "./WebcamHandler"
import {Card, Button} from 'react-bootstrap'


const FlashCard = (props) => {    
  const [Result, SetResult] = useState(null);
  const [isClassifying, setIsClassifying] = React.useState(false);
  const [wobble, setWobble] = React.useState(0)
  const [turn, setTurn] = React.useState(0)

  const nextCard = () => {
     props.updateWord(Result)
     SetResult(null)
     setWobble(1)
  }



  return (
    <Card style={{ width: '39rem', height: '50rem' }} className="text-center" 
      className="cardAnimation" onClick={() => setWobble(1)}
      wobble={wobble}
      turn={turn}> 
    <WebcamHandler frameRate={30} width={1920} height={1080} SetResult={SetResult} Word={props.Word} setTurn={setTurn} setIsClassifying={setIsClassifying} isClassifying={isClassifying} />
    <Card.Body>
    <Card.Text>
          <div className="whiteText">
          {props.Word.status === 0 ? 
            // Display learning video and do the sign                      
            <Fragment>
                {Result == "Sucesss" ? 
                    null
                    : 
                    <div>
                        { isClassifying == false ? 
                          
                          <div> 
                            <h4>Do the sign ({props.Word.name}) according to the below video!</h4> 
                            <LearningVideo />
                          </div>
                          
                          : 
                          <h4>Looking at your answer..</h4> 
                        }
                    </div>
                }
                
                               
                {Result === "Success" ? <div><h1>Success</h1><Button onClick={nextCard}>Next</Button></div> : null}
                {Result === "Wrong" ?  <div><h1>Wrong!</h1><Button variant="dark" onClick={nextCard}>Next</Button></div> : null}
            </Fragment> 
            :
            // Make the sign
            <Fragment>
                {Result == "Wrong" ? 
                    <div>
                        <h1>You signed {props.Word.name} wrong.</h1>
                        <button onClick={nextCard}>Next</button>    
                    </div>
                    : <h1>Perform the sign: {props.Word.name}</h1>
                }
                {Result == "Success" ? <div><h1>Success</h1><Button onClick={nextCard}>Next</Button></div> : null}
                {Result == "Wrong" ? <div><h1>Wrong</h1><Button onClick={nextCard}>Next</Button></div> : null}
            </Fragment>           
          }
    </div>
    </Card.Text>
    </Card.Body>
    </Card>

    
  );
};

export default FlashCard;