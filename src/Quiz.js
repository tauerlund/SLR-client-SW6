import React, { useState, useEffect } from "react";
import Introduction from "./introduction";
import QuizHandler from "./QuizHandler";


const Quiz = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [signs, setSigns] = useState(null);
  
  useEffect(() => {
    assignSigns()
  }, []);


  const assignSigns = async () => {
    const words = ["hej", "er", "spørge"]
    const time = [3, 3, 5] 
    var Signs = []; 
    for (var x = 0; x < words.length; x++) {
      const signsInformation = {name: words[x], status: 0, time: time[x]};
      Signs.push(signsInformation)
    }
    setSigns(Signs)
  }

  
  if (signs === null) {
    return <>Still loading...</>;
  } 
  else {
    return (
        <div>
          <h1>Quiz</h1>
          {startQuiz ? <QuizHandler signs={signs} /> : <Introduction signs={signs} setStartQuiz={setStartQuiz} />}
        </div>
    );    
  }

};

export default Quiz;