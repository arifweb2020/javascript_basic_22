import React, { useState, useEffect } from "react";

const Tmr: React.FC = () => {
  const [days, setDays] = useState(6);
  const [hours, setHours] = useState(23);
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(59);

  // Update the timer every second
  useEffect(() => {
    let interval: number;

    interval = window.setInterval(() => {
      let totalSeconds =
        days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

      if (totalSeconds > 0) {
        totalSeconds--;

        setDays(Math.floor(totalSeconds / (24 * 60 * 60)));
        setHours(Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)));
        setMinutes(Math.floor((totalSeconds % (60 * 60)) / 60));
        setSeconds(Math.floor(totalSeconds % 60));
      } else {
        // Reset the timer when it reaches 0 seconds

        window.clearInterval(interval);

        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);

    return () => window.clearInterval(interval); // Clean up the interval when component unmounts to avoid memory leaks
  }, [days, hours, minutes, seconds]); // Only run the effect if one of these values changes

  return (
    <div>
      {" "}
      <h1>Timer</h1> <div>{days > 9 ? days : `0${days}`} Days</div> <div>{hours> 9 ? hours : `0${hours}`} Hours</div>{" "}
      <div>{minutes} Minutes</div> <div>{seconds > 9 ? seconds : `0${seconds}`} Seconds</div>{" "}
    </div>
  );
};
export default Tmr;


//

import React from 'react'

export const UpTmr = () => {
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
  
    const deadline = "December, 31, 2022";
  
    const getTime = () => {
      const time = Date.parse(deadline) - Date.now();    
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    React.useEffect(() => {
      const interval = setInterval(() => getTime(deadline), 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="timer" role="timer">
        <div className="col-4">
          <div className="box">
            <p id="day">{days < 10 ? "0" + days : days}</p>
            <span className="text">Days</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
            <span className="text">Hours</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
            <span className="text">Minutes</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
            <span className="text">Seconds</span>
          </div>
        </div>
      </div>
    )
}

export default UpTmr;
