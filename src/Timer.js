import React, { useEffect, useState } from 'react';

export default function Timer(props) {
    const [secs, setSecs] = useState(0);

    const [timerID, setTimerID] = useState(0);

    useEffect(()=>{
        //console.log(props.isGameOver);
        if(props.isGameOver) {
            clearInterval(timerID);
        }
        else if (props.reset){ 
            setSecs(0);
            setTimerID(()=>{
                return setInterval(()=>{
                    setSecs(oldSecs => oldSecs+1);
                }, 1000);     //Must have "return" here otherwise the timerID can't get the value
            });
            props.resetOff();    //Change the "reset" state back to false
        }
        else {
            setTimerID(()=>{
                return setInterval(()=>{
                    setSecs(oldSecs => oldSecs+1);
                }, 1000);     //Must have "return" here otherwise the timerID can't get the value
            });          
        }
    },[props.isGameOver]);

    //console.log(props.isGameOver);

    return <p>Time: {secs}s</p>
}