import "./styles.css";
import React, { useState } from "react";

const items = [
  { index: 1, name: "Item 1", checked: true },
  { index: 2, name: "Item 2", checked: true },
  { index: 3, name: "Item 3", checked: true }
];

export default function App() {
  const [test,setTest]= useState(false)
  const handleChnage = (e, index) => {
    console.log(e.target.value)
    const activeData = document.getElementById(index).checked
    console.log(activeData,"activeData")
    setTest(activeData)
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <input
            id={i}
            type="checkbox"
            value={item.name}
           // add the 'checked' prop to set the checkboxes initially checked
            onChange={(e) => handleChnage(e, i)}
          />
          <span>{item.name}</span>
        </div>
      ))}
      <br />

      {test ? "good": "bad"}
    </div>
  );
}



//2nd

import "./styles.css";
import React, { useState } from "react";

const items = [
  { index: 1, name: "Item 1", checked: true },
  { index: 2, name: "Item 2", checked: true },
  { index: 3, name: "Item 3", checked: true }
];

export default function App() {
  const [test,setTest]= useState(false)
  //const [selected, setSelected] = useState([]);
  const handleChnage = (e, index) => {
    console.log(e.target.value)
    const activeData = document.getElementById(index).checked
    console.log(activeData,"activeData")
    setTest(activeData)
    // if (activeData === true) {
    //   setSelected((oldData) => [...oldData, e.target.value]);
    // } else {
    //   setSelected(selected.filter((values) => values !== e.target.value));
    // }
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <input
            id={i}
            type="checkbox"
            value={item.name}
           // add the 'checked' prop to set the checkboxes initially checked
            onChange={(e) => handleChnage(e, i)}
          />
          <span>{item.name}</span>
        </div>
      ))}
      <br />
      {/* {selected.map((a, i) => (
        <div key={i}>{a}</div>
      ))} */}
      {test ? "good": "bad"}
    </div>
  );
}
