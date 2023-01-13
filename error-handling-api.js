import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products1");
      const finalRes = await res.json();
      console.log(finalRes);
      setData(finalRes);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log("error ", error)
      setError(true);
      setLoading(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {error && "some thing went wrong unbale fetch data"}

      {loading ? "plz wait data is fetching"
        :
        <>
          {data?.products?.map((ele, index) => {
            return (
              <h1 key={index}>
                {ele?.title}-{ele?.price}
              </h1>
            );
          })}
        </>

      }
      <h1>Hii React </h1>

    </>
  );
}

export default App;

