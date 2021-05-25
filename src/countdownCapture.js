import { React, useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const CountdownCapture = ({startTimer, setCapturing, stopCapture, Word}) => {
    const [seconds, setSeconds] =  useState(startTimer);
    const [saveSeconds, setSaveSeconds] =  useState(startTimer);
    const [bar, setBar] =  useState(0);
    
    useEffect( () => {
        setSaveSeconds(Word.time)
        setSeconds(Word.time)
        setBar(0)
    }, [Word]);


    useEffect( () => {            
        let secondInterval = setInterval(() => {
        if (seconds > -0.1) {
            const procentage = (1 - (seconds / saveSeconds)) * 100 
            setBar(procentage)                
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
            <ProgressBar animated now={bar} label={`${bar}%`} />
        </div>
    )
}
export default CountdownCapture;