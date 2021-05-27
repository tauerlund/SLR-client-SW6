import React, { useState, useEffect } from "react";
import QuizHandler from "./QuizHandler";
import {Button, Alert} from 'react-bootstrap'

const Quiz = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [words, setWords] = useState(null);
  const [signs, setSigns] = useState([]);
  const [validateAlert, SetValidateAlert] = useState(false);

  useEffect(() => {
    assignWords()
  }, []);


  const assignWords = async () => {
    const words = ["hej", "er", "spørge", "farvel", "hvorfor", "du", "træt", "jeg"]
    const url = ["https://www.youtube.com/watch?v=-_T3-k8yJzw",
                 "https://www.youtube.com/watch?v=30_5jivy-38",
                 "https://www.youtube.com/watch?v=B03FgHt5iR0",
                 "https://www.youtube.com/watch?v=w5naJVF5Chc",
                 "https://www.youtube.com/watch?v=GRFV0I34Oac",
                 "https://www.youtube.com/watch?v=MDhHjQDOgB0",
                 "https://www.youtube.com/watch?v=q-8eu36nTmQ",
                 "https://www.youtube.com/watch?v=RfQRvGEAxxI"]
    const time = [4, 4, 4, 4, 4, 4, 4, 4]
    var Signs = []; 
    for (var x = 0; x < words.length; x++) {
      const signsInformation = {name: words[x], status: 0, time: time[x], URL: url[x]};
      Signs.push(signsInformation)
    }
    setWords(Signs)
  }

  const addSign = (word) => {
    const newSigns = signs.slice();
    const newSign = words.filter((element) => {
      return element.name === word.target.value;
    })
    newSigns.push(newSign[0]);
    setSigns(newSigns);
  } 

  const validateQuiz = () => {
    if(Object.keys(signs).length >= 2){
      setStartQuiz(true)
    } else {
      SetValidateAlert(true)
    }
  }
  

  if (words === null) {
    return <>Still loading...</>;
  } 
  else {
    return (      
        <div>
          {startQuiz ? <QuizHandler signs={signs} /> :       
          
          <div>
            <h1>You are about to learn Danish Sign Language!</h1>
            <br></br><br></br><br></br>
            <h2>Choose the signs to include in the quiz:</h2>
            { words.map((i) => 
              <div class="pretty p-icon p-round p-jelly" >
                  <input type="checkbox" id={i.name} className="checkboxes" onChange={addSign} value={i.name} />
                    <label for={i.name}>
                      <h1>{i.name}</h1>
                    </label>
              </div>
              )}

              { validateAlert == true ?
                  <Alert variant="danger" >
                    <Alert.Heading>You have to select two signs to start the quiz!</Alert.Heading>
                  </Alert> 
                : null
              }
              <Button onClick={() => validateQuiz()}>Start Quiz</Button>      
            </div>                
         }
        </div>
    );    
  }
};

export default Quiz;