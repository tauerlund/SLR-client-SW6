import { React, useState, useEffect } from 'react';

const Countdown = ({startTimer, setCapturing, startCapture, Word}) => {
    const [seconds, setSeconds] =  useState();    
    
    useEffect( () => {
        setSeconds(5)
    }, [Word]);
    
    useEffect( () => {
                
            let secondInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(secondInterval)
                setCapturing(true)         
                startCapture()
                setSeconds(false);
            } 
        }, 1000)
        return () => {
            clearInterval(secondInterval);
          };
    });

    return (
        <div>
        { seconds === 0 ? null : <h3> {seconds}</h3> }
        </div>
    )
}
export default Countdown;