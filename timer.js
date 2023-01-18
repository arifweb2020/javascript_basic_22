https://github.com/codingWithElias/react-stopwatch/blob/master/src/App.js
https://www.youtube.com/watch?v=HB9rKo3glTU
https://www.youtube.com/watch?v=a_jESu-puQ8

// working code

import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let timeInterval = null;
    if (startTimer) {
      timeInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setTimer(timeInterval);
    } else {
      clearInterval(timer);
    }
  }, [startTimer]);
  
  const resetBtn = ()=>{
    setStartTimer(false)
    setTime(0)
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox- {time}</h1>
      <button onClick={() => setStartTimer(true)}>Start</button>
      <button onClick={() => setStartTimer(false)}>Stop</button>
       <button onClick={resetBtn}>Reset</button>
    </div>
  );
}


import "./styles.css";
import React from "react";

export default function App() {
  const [timer, setTimer] = React.useState(15);

  const startFn = () => {
    if(timer === 0){
      setTimer(0)
    }
    setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  };

  return (
    <div className="App">
      <p>{timer}</p>
      <button onClick={startFn}>Start</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  );
}


//

  const [counter, setCounter] = React.useState(60);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

setCounter(60);
 <span style={{ cursor: "pointer" }} onClick={resendOtp}>
