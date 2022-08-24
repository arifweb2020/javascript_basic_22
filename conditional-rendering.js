import React, { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const res1 = await res.json();
      setData(res1)
    }
    getData()
  }, [])

  

  return (
    <div className="container mt-5">
      <h1>Arif</h1>
      {
        // 1st scenario
        data?.find((ele) => ele.id === 28) ? null :
          <div class="d-flex p-3 bg-secondary text-white">
            {
              data?.map((val) => {
                return <>
                {
                  val.id === 1 ? <div class="p-2 bg-info">{val.name.slice(0,4)}</div> :
                  val.id === 2 ? <div class="p-2 bg-warning">+ {val.name.slice(0,4)}</div> :
                  val.id === 4 ? <div class="p-2 bg-primary">- {val.name.slice(0,4)}</div> :
                  val.id === 6 ? <div class="p-2 bg-primary"><img src="https://icons-for-free.com/iconfiles/png/512/fb+laboratory+tube+tube+icon-1320166642409991916.png" width="70" height="70" alt="sas"/> {val.name.slice(0,4)}</div> :
                  <div class="p-2 bg-info">{val.name.slice(0,4)}</div>
                }
                  
                </>
              })
            }
            
          </div>
      }

    </div>
  );
}

export default App;
