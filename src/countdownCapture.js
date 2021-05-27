import { React, useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const CountdownCapture = ({startTimer, setCapturing, stopCapture, Word, Tries}) => {
    const [seconds, setSeconds] =  useState(startTimer);
    const [saveSeconds, setSaveSeconds] =  useState(startTimer);
    const [bar, setBar] =  useState(0);
    
    useEffect( () => {
        setSaveSeconds(Word.time)
        setSeconds(Word.time)
        setBar(0)
    }, [Tries]);


    useEffect( () => {            
        let secondInterval = setInterval(() => {
        if (seconds > -0.1) {
            const procentage = (1 - (seconds / saveSeconds)) * 100 
            setBar(procentage.toFixed(0))                
            setSeconds(seconds - 0.1);                
        }
        if (seconds <= 0) {
            clearInterval(secondInterval)
            stopCapture()                
        } 
        }, 1) // 1000
        return () => {
            clearInterval(secondInterval);
          };
    });

    return (
        <div>
            <ProgressBar animated variant={bar < 100 ? "warning" : "success" } now={bar} label={`${bar}%`} />            
        </div>
    )
}
export default CountdownCapture;