import React, { useState, useEffect } from "react";
import QuizHandler from "./QuizHandler";
import {Button} from 'react-bootstrap'

const Quiz = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [words, setWords] = useState(null);
  const [signs, setSigns] = useState([]);


  useEffect(() => {
    assignWords()
  }, []);


  const assignWords = async () => {
    const words = ["hej", "er", "spørge"]
    const time = [3, 3, 5] 
    var Signs = []; 
    for (var x = 0; x < words.length; x++) {
      const signsInformation = {name: words[x], status: 0, time: time[x]};
      Signs.push(signsInformation)
    }
    setWords(Signs)
  }



  const addSign = (word) => {
    console.log(word.target.value)
    const newSigns = signs.slice();
    const newSign = words.filter((element) => {
      return element.name === word.target.value;
    })
    newSigns.push(newSign[0]);
    setSigns(newSigns);
} 


  if (words === null) {
    return <>Still loading...</>;
  } 
  else {
    return (      
        <div>
          {startQuiz ? <QuizHandler signs={signs} /> :       
          
          <div>
            <h1>You are about to learn Danish sign language!</h1>
            <br></br><br></br><br></br>
            <h2>List of signs in the quiz:</h2>            
            { words.map((i) => 
              <div class="pretty p-icon p-round p-jelly" >
                  <input type="checkbox" id={i.name} className="checkboxes" onChange={addSign} value={i.name} />
                    <label for={i.name}>
                      <h1>{i.name}</h1>
                    </label>
              </div>
              )}
              <Button onClick={() => setStartQuiz(true)}>Start Quiz</Button>      
            </div>                
         }
        </div>
    );    
  }

};

export default Quiz;