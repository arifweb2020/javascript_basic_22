import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState({ h: 1, m: 40, s: 60 });
  const [start, setStart] = useState(false);
  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        const { h, m, s } = time;

        if (s > 0) {
          setTime({ ...time, s: s - 1 });
        } else if (m > 0) {
          setTime({ ...time, m: m - 1, s: 59 });
        } else if (h > 0) {
          setTime({ ...time, h: h - 1, m: 59 });
        } else {
          // timer is finished
          clearInterval(interval); // stop the timer
        }
      }, 1000);
    }

    return () => clearInterval(interval); // clear the interval on unmounting of component
  }, [time, start]);

  return (
    <div className="App">
      <div>
        <div>{`${time.h}:${time.m}:${time.s}`}</div>
        <button onClick={() => setStart(true)}>Start</button>
      </div>
    </div>
  );
}
