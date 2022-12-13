import React from 'react';
import Confetti from 'react-confetti';
import Dice from './Dice';
import Timer from './Timer';
import "./App.css";

function App() {
  //Helper function for generate the dice array
  function initDiceList() {
    const diceList = [];
    for(let i=0; i<10; i++) {
      diceList.push({
        id: i+1,
        value: Math.floor(Math.random() * 6) + 1,
        locked: false
      });
    }
    return diceList;
  }

  //Initialize the dices state
  const [dices, setDices] = React.useState(initDiceList());

  //Initialize the game status
  const [isGameOver, setIsGameOver] = React.useState(false);

  //The status of reset button (if it's just clicked)
  const [reset, setReset] = React.useState(false);

  //Change the lock status of the dice when it is clicked
  function switchLock(targetId) {
    setDices(oldDices => oldDices.map(dice => dice.id === targetId ? {...dice, locked: !dice.locked} : dice));
  }

  //Check if the game is over
  React.useEffect(()=>{
    //***Declarative way */
    setIsGameOver(() => dices.every((dice) => dice.value === dices[0].value && dice.locked === true));
    //The every() method is a method of Array Prototype, it will assess every item in the array to see if every item meets the condition in the callback function.
    //It will return true only if every item fulfills the condition
  },[dices]);

  //Turn off reset state
  function resetOff() {
    setReset(false);
  }

  //Roll the unlocked dices
  function handleClick() {
    if(isGameOver){
      setReset(true);  //Let the "reset" state being true and pass it to Timer component, so the timer will reset
      setDices(initDiceList());
    }
    else {
      setDices(oldDices => oldDices.map(dice => dice.locked ? dice : {...dice, value: Math.floor(Math.random() * 6) + 1}));
    }
  }

  return (
    <main>
      {isGameOver ? <Confetti /> : null }
      <h1>{isGameOver ? "Congratulation!" : "Tenzies Game" }</h1>
      <Timer isGameOver={isGameOver} reset={reset} resetOff={resetOff}/>
      <div className='container'>
        {dices.map((item) => {
          return <Dice key={item.id} id={item.id} value={item.value} locked={item.locked} switchLock={switchLock}/>
        })}
      </div>
      <button onClick={handleClick}>{isGameOver ? "Restart" : "Roll" }</button>
    </main>
  );
}

export default App;
