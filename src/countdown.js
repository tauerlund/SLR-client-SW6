import { React, useState, useEffect } from 'react';

const Countdown = ({startTimer, setCapturing, startCapture, Word}) => {
    const [seconds, setSeconds] =  useState();    
    const [animation, setAnimation] =  useState();    
    
    useEffect( () => {
        setSeconds(5)
    }, [Word]);
    
    

    useEffect( () => {                
            let secondInterval = setInterval(() => {
            if (seconds > 0) {
                setAnimation(1)
                setSeconds(seconds - 1);                
            }
            if (seconds === 0) {
                setAnimation(1)
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
        { seconds === 0  ? null : 
            <h3 className="number" 
            animation={animation} 
            onAnimationEnd={() => setAnimation(0)}> 
            {seconds}
            </h3> }
        </div>
    )
}
export default Countdown;