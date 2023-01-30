// first scenario
import React, { useState, useEffect } from 'react';
import './Home.scss';


function Home(props) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState(false);

    const getData = async () => {
        const res = await fetch("https://fakestoreapi.com/products");
        return await res.json();
    };

    const getuser = async () => {
        const res = await fetch("https://dummyjson.com/products");
        return await res.json();
    };

    useEffect(() => {
        getData().then((res) => {
            console.log(res)
            setLoading(true)
            setData(res)
            setLoading(false)
            setError(false)
            if (res?.length > 0) {
                getuser().then((res) => {
                    setLoading(true)
                    setUser(res)
                    setLoading(false)
                    setErrors(false)
                }).catch((err) => {
                    setErrors(true)
                });
            }
        }).catch((err) => {
            setError(true)
        });
    }, []);


    return (
        <div className='container home__conatiner'>
            <div>
                {error ? "some error" :
                    loading ? "wait " :
                        data.length === 0 ? "no data found" :
                            <>{data?.slice(0, 2)?.map((ele) => <h1>{ele?.title}</h1>)}</>
                }
            </div>

            <div>
                {errors ? "some error" :
                    loading ? "wait " :
                        user?.products?.length === 0 ? "no data found" :
                            <>{user?.products?.slice(0, 5)?.map((ele) => <h1>{ele.title}</h1>)}</>
                }
            </div>


            {/* {Object?.keys(user?.products)?.length && user?.products?.slice(0,5)?.map((ele) => <h1>{ele.title}</h1>)} */}
        </div>
    );
}

export default Home;


// 2nd way call two api at a time

// api.js

import axios from "axios"

function fetchCar(carId) {
  return axios
    .get('http://first-api', {params: {carId}})
    .then(r => r.data)
}

function fetchDetails(carName) {
  return axios
    .get('http://second-api', {params: {carName}})
    .then(r => r.data)
}

async function fetchCarWithDetails(carId) {
  const car = await fetchCar(carId)
  const details = await fetchDetails(car.carName)
  return { car, details }
}

export { fetchCar, fetchDetails, fetchCarWithDetails }

// MyComponent.js

import { useAsync } from "./hooks"
import { fetchCarWithDetails } from "./api"

function MyComponent({ carId }) {
  const {loading, error, result} =
    useAsync(fetchCarWithDetails, [carId])  // reusable hook

  // loading...
  if (loading)
    return <p>Loading...</p>

  // error...
  if (error)
    return <p>Error: {error.message}</p>

  // result...
  return <pre>
    {JSON.stringify(result, null, 2)}
  </pre>
}
