import React from "react";
import "./Dice.css";

export default function Dice(props) {

    return (
        <div className={props.locked ? "dice locked" : "dice"} onClick={() => props.switchLock(props.id)}>{props.value}</div>
    );
}