import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div>
        <h1>
          {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
        </h1>
      </div>
    </div>
  );
}


import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState(100);

  const hours = Math.floor(time / 60);
  const minutes = Math.floor((time % 60));
  const seconds = Math.floor(time % 60 /60);
  return (
    <div className="App">
      <h1>{hours} hr {minutes} min {seconds} sec</h1>
    </div>
  );
}


import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  const hr = Math.floor(time / 60);
  const min = Math.floor(time % 60);
  const sec = time % 60;

  return (
    <div className="App">
      <div>
        {hr} hr : {min} min : {sec} sec
      </div>
    </div>
  );
}
