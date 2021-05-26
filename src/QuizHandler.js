import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

const QuizHandler = ({signs}) => {
  const [Words, setWords] = useState(null);
  const [CurrentWord, setCurrentWord] = useState(0);
  const [WordQueue, setWordQueue] = useState(null)

  useEffect(() => {
    // Insert words to learn
    assignWords()
  }, []);

  const updateWord = async (result) => {
    console.log("Updating the word")
    
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
        console.log("Removed a word...")
      } else {
        console.log("Updating words..")
        setWords(newWords);
        increment()
      }
    }else{
        increment()
    }

    // If last card
    if(CurrentWord >= (Object.keys(Words).length - 1)) {
      // Reached the end of the list, start from the beginning
      console.log("Go the back")
      setCurrentWord(0)
    } 

  }

  const increment = () => {
      // Get next card
      const increment = CurrentWord + 1
      console.log("Increment: ", CurrentWord + 1)
      setCurrentWord(increment)
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