// input button search

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {


  const [data, setData] = useState([]);
  const [fdata, setFdata] = useState([])
  const [search, setSearch] = useState("")



  useEffect(() => {

    (async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const res1 = await res.json();
      setData(res1)
    })()
  }, [])

  const searchHandler = (text) => {
    setSearch(text)
    console.log(text)
    if (text !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
      })
      setFdata(filteredData)
    }
    else{
      setFdata(data)
    }
  }

  return (
    <div className="App">

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => searchHandler(search)}>search</button>

      <br />

      {fdata.map((ele) => {
        return <>{search && (<h1>{ele.name} - {ele.username}</h1>)}</>
      })

      }


    </div>
  );
}
export default App;

// input button test

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {


  const [data, setData] = useState([]);

  const [search, setSearch] = useState("")

  useEffect(() => {

    (async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const res1 = await res.json();
      setData(res1)
    })()
  }, [])

  const handleSub = (val) => {
    setSearch(val)
    console.log(val)
  }



  return (
    <div className="App">

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => handleSub(search)}>search</button>
      <br />

      {data?.filter((val) => val.name.toLowerCase().includes(search) || val.username.toLowerCase().includes(search)).map((ele) => {
        return <div onClick={() => handleSub(ele.name)}>{search && (<h1>{ele.name} - {ele.username}</h1>)}</div>
      })

      }


    </div>
  );
}
export default App;



// input search

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {


const [data,setData]= useState([]);

const [search,setSearch]= useState("")
 


  useEffect(()=>{

    (async ()=>{
     const res = await fetch('https://jsonplaceholder.typicode.com/users')
     const res1 = await res.json();
     setData(res1)
    })()
  },[])



  return (
    <div className="App">

      <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} />
      
      <br/>

      {data?.filter((val)=> val.name.toLowerCase().includes(search) || val.username.toLowerCase().includes(search)).map((ele)=>{
        return <>{search && (<h1>{ele.name} - {ele.username}</h1>)}</>
      })
      
      }

      
    </div>
  );
}
export default App;
