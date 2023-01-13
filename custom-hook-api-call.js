import React from 'react';
import './App.css';
import useApi from './custom-hook/useApi';


function App() {
  const url = "https://fakestoreapi.com/products"
  const { data, loading, error } = useApi(url);

  return (
    <>
      

      {
      error ? "some thing went wrong unbale fetch data" :
      loading ? "plz wait data is fetching"
        :
        <>
          {data?.map((ele, index) => {
            return (
              <h1 key={index}>
                {ele?.title}
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


// custom hook


import { useState, useEffect } from 'react';

function useApi(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const getData = async () => {
      try {
        const res = await fetch(url);
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
    
    return {
        data,
        loading,
        error
    }
}

export default useApi;
