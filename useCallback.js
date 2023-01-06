import React, { useState, useEffect, useMemo , memo, useCallback} from 'react';
import './App.css';

// import { ICON_MAP } from './common/iconsMap';

function App() {

  const [add, setAdd] = useState(0);
  const [count, setCount] = useState(0);
  // now while adddition childA component will not call

  // but if we add some function then child component render again to stop them we use usecallback
  
 const data = useCallback(()=>{
        return count*4
 },[count])


  return (
    <>
  <h1>UseCallback</h1>
  <ChildA mydata={data}/>

  {add} <br/>
  <button onClick={()=> setAdd(add + 1)}> Add</button>
  <br/>
  <button onClick={()=> setCount(count + 1)}> count</button>

  
    </>
  );
}

export default App;


// differnt file

import {React,memo} from react

const ChildA = ({mydata})=>{
  console.log("child a")
  return (
    <h1 >Child A {mydata}</h1>
  )
}

export default memo(ChildA);
