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
                        <>{data?.slice(0, 2)?.map((ele) => <h1>{ele?.title}</h1>)}</>
                }
            </div>

            <div>
                {errors ? "some error" :
                    loading ? "wait " :
                        <>{user?.products?.slice(0, 5)?.map((ele) => <h1>{ele.title}</h1>)}</>
                }
            </div>


            {/* {Object?.keys(user?.products)?.length && user?.products?.slice(0,5)?.map((ele) => <h1>{ele.title}</h1>)} */}
        </div>
    );
}

export default Home;
