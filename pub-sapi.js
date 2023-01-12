import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const finalRes = await res.json();
      console.log(finalRes);
      setData(finalRes);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {error && "some thing went wrong unbale fetch data"}

      {loading ? (
        "plz wait data is fetching"
      ) : (
        <>
          {data?.products?.map((ele, index) => {
            return (
              <h1 key={index}>
                {ele?.title}-{ele?.price}
              </h1>
            );
          })}
        </>
      )}

      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
