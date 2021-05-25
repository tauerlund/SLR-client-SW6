import React, { useState } from "react";


const Introduction = (props) => {
  console.log(props)
  return (
        <div>
            <h1>You are about to learn Danish sign language!</h1>
            <p>List of signs in the quiz:</p>
            {props.signs.map((i) => <p>{i.name}</p>)}
            <button onClick={() => props.setStartQuiz(true)}>Start Quiz</button>
        </div>
  );
};

export default Introduction;