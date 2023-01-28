// App.js
<Route path="/search/:searchKey" element={<MainContainer><PrivateRoutes Component={Products} /></MainContainer>} />
  
  // Navbar.js
  import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
       
        if(search.trim().length === 0) {
            setSearch("")
            alert("enter products") 
            return
        } 
        navigate(`/search/${search.trim()}`);
        setSearch("")
    }

    return (
        <div className='navbar__conatiner'>

            <nav className="navbar navbar-expand-sm bg-dark navbar-dark main__nav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                  
                </ul>
                <span className="navbar-text">

                    <form onSubmit={formHandler}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for products ..." />
                    </form>
                </span>
            </nav>
        </div>
    );
}

export default Navbar;

// Products.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Products(props) {
    const [data, setData] = useState([])
    const params = useParams();
    const searchText = params.searchKey;


    useEffect(() => {

        (async () => {
            const res = await fetch(`https://dummyjson.com/products/search?q=${searchText}`)
            const res1 = await res.json();
            console.log(res1)
            setData(res1.products)
        })()

    }, [searchText])


    return (
        <div className="container">
            <div className='row'>
                {
                    data?.length > 0 ?
                        <>
                            {
                                data?.map((ele,index) => {
                                    return <div className='col-md-4' key={index}>
                                         <img src={ele.images[0]} alt="prod" style={{width:"100%"}}/>
                                         <p>{ele.title}</p>
                                         <p>Rs {ele.price}</p>
                                    </div>
                                })
                            }

                        </> : <h1>No data found</h1>
                }

            </div>

        </div>
    );
}

export default Products;
  
