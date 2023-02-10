/** 
 * thius is nav compone
 * Author Ariuucff
 */
import "./styles.css";
import {useState,useEffect} from 'react'

export default function App() {
  const [name,setName] = useState("idle")
  const [show,setShow] = useState(false)

  useEffect(()=>{
    if(show){
      let y = Math.ceil(Math.random() * 10)
      setTimeout(()=>{
        if (y > 2){
          setName("success")
        }
        else{
          setName("error")
        }
     
      },1000)
    }

  },[show])

const startHandler = ()=>{
setShow(true)
setName("start")
}

const stopHandler = ()=>{
  setName("idle")
  setShow(false)
}

  return (
    <div className="App">
      {name}<br/>
      <button onClick={startHandler}>start</button>
      <button onClick={stopHandler}>stop</button>
    </div>
  );
}
