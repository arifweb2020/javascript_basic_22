import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// import { ICON_MAP } from './common/iconsMap';

function App() {

  const [add, setAdd] = useState(0);
  const [sub,setSub] = useState (10)
 
  const multiply = useMemo(()=>{
    console.log("hit only addition to better performance")
    return add * 10
  },[add])


  return (
    <>
  <h1>UseMemo</h1>
{multiply}
  {add} - {sub}<br/>
  <button onClick={()=> setAdd(add + 1)}> Add</button>

  <button onClick={()=> setSub(sub - 1)}> minus</button>
    </>
  );
}

export default App;

