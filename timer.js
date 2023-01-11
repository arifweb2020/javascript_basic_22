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
