import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard"

const QuizHandler = ({signs}) => {
  const [Words, setWords] = useState(null);
  const [CurrentWord, setCurrentWord] = useState(0);
  const [WordQueue, setWordQueue] = useState(null)

  useEffect(() => {
    // Insert words to learn
    assignWords()
  }, []);

  const updateWord = async (result) => {
    console.log(result)
    
    // If guess was correct we update the status of the card
    if(result == "Success"){
      // Update card status;
      const newWords = [... Words];
      const status = newWords[CurrentWord].status + 1;
      newWords[CurrentWord].status = status;  
      // Remove if learned
      if(newWords[CurrentWord].status == 2) {
        const newWords = Words.filter((word) => word.name !== Words[CurrentWord].name);
        setWords(newWords);
      } else {
        setWords(newWords);
      }
    }

    // Find next card
    if(CurrentWord >= (Object.keys(Words).length - 1)) {
      // Reached the end of the list, start from the beginning
      console.log(0)
      setCurrentWord(0)
    } 
    else {
      // Get next card
      const increment = CurrentWord + 1
      console.log(CurrentWord + 1)
      setCurrentWord(increment)
    }
  }

  const assignWords = async () => {
    setWords(signs);
    setCurrentWord(0);
  }

  if (Words === null) {
      return <>Still loading...</>;
  }else{
    if(Object.keys(Words).length != 0) {
      return <FlashCard Word={Words[CurrentWord]} updateWord={updateWord} />;
    }else{
      return <h1>You finshed the quiz!</h1>
    }
  }

};

export default QuizHandler;