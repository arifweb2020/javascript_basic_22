import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [time, setTime] = useState(1);
  const [timer, setTimer] = useState(false);
  const [timercount, setTimercount] = useState(0);

  useEffect(() => {
    let timeCount = null;
    if (timer) {
      timeCount = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setTimercount(timeCount);
    } else {
      clearInterval(timercount);
    }
  }, [timer]);

  const resetTime = () => {
    setTimer(false);
    setTime(1);
  };

  const mycounter = time * 5
  return (
    <div className="App">
      {/* <div style={{ width: time + "0%", background: "green",height:'10px' }}>ss</div> */}
      <div style={{ height: "10px", width: "100%", border: "1px solid black" }}>
        
        <div
          style={{
            width: mycounter + "%",
            background: "red",
            height: "10px",
            position: "relative",
            top: "0px"
          }}
        ></div>
      </div>
      <h1>{time}</h1>
      <button onClick={() => setTimer(true)}>Play</button>
      <button onClick={() => setTimer(false)}>Pause</button>
      <button onClick={resetTime}>reset</button>
    </div>
  );
}
