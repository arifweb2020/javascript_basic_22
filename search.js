1>

import React, { useEffect, useState } from 'react';

function Search(props) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")


    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/albums")
            const res1 = await res.json()
            
            setData(res1)
        }
         if (query.length === 0 || query.length >2){
            getData()
        }
    }, [query])

    console.log(query)
    console.log(data.filter((val) => val.title.toLowerCase().includes("quidem")))


    return (
        <div style={{ margin: "0 auto", maxWidth: "70%", marginTop: "30px" }}>
            <h1>Search</h1>
            <input type="text" placeholder='search...' onChange={(e) => setQuery(e.target.value)} />
            {
                data.filter((ele) =>
                    ele.title.toLowerCase().includes(query)).map((ele, i) => {
                        return <p key={i}>
                            {ele.title}
                        </p>
                    })
            }
        </div>
    );
}

export default Search;


2> 
    
    import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';

function Search(props) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/albums")
            const res1 = await res.json()
            setData(res1)
        }
        getData()
    }, [])

    console.log(query)
    console.log(data.filter((val) => val.title.toLowerCase().includes("quidem")))

    const keys = ["title", "id", "userId"]

    // console.log(data[0]["title"])
    const search = (mydata) => {
        return mydata.filter((item) =>
            //item.title.toString().toLowerCase().includes(query) || item.id.toString().toLowerCase().includes(query) || item.userId.toString().toLowerCase().includes(query)
            keys.some((key) => item[key].toString().toLowerCase().includes(query))
        )
    }
    return (
        <div style={{ margin: "0 auto", maxWidth: "70%", marginTop: "30px" }}>
            <h1>Search</h1>
            <input type="text" placeholder='search...' onChange={(e) => setQuery(e.target.value)} />

            <Table list={search(data)} />
        </div>
    );
}

export default Search;


import React from 'react';

function Table({ list }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Title</th>
                        <th>userId</th>
                    </tr>

                </thead>
                <tbody>
                    {list.map((ele, i) => {
                        return <tr key={i}>
                            <td >{ele.id}</td>
                            <td >{ele.title}</td>
                            <td >{ele.userId}</td>
                        </tr>
                    })}

                </tbody>
            </table>


            <td>

            </td>
        </div>
    );
}

export default Table;


3> 0 to 10 search

import React, { useEffect, useState } from 'react';


function Search(props) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/albums")
            const res1 = await res.json()
            setData(res1)
            // setPageCount(Math.ceil(setData.length / perPage))
        }
        if (query.length === 0 || query.length > 2) {
            getData()

        }

    }, [query])

    return (
        <div style={{ margin: "0 auto", maxWidth: "70%", marginTop: "30px" }}>
            <h1>Search</h1>
            <input type="text" placeholder='search..' onChange={(e)=>setQuery(e.target.value)}/>

            {
                data.filter((ss)=>ss.title.toLowerCase().includes(query)).slice(0, 10).map((ele,i)=>{
                    return <p key={i}>{ele.title}</p>
                })
            }
        </div>
    );
}

export default Search;



4> dropdown search

import { useState } from "react";
import "./styles.css";
var data = require("./MOCK_DATA.json");

export default function App() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="App">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.full_name)}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}



5 > final one search with pagination


import React, { useEffect, useState } from 'react';
import ReactPaginate  from 'react-paginate';


function Search(props) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    const [pageCount, setPageCount] = useState(0)
    const [perPage] = useState(10);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/albums")
            const res1 = await res.json()
            setData(res1)
            setPageCount(Math.ceil(res1.length / perPage))
        }
        if (query.length === 0 || query.length > 2) {
            getData()

        }

    }, [perPage, query])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <div style={{ margin: "0 auto", maxWidth: "70%", marginTop: "30px" }}>
            <h1>Search</h1>
            <input type="text" placeholder='search..' onChange={(e) => setQuery(e.target.value)} />

            {
                data.filter((ss) => ss.title.toLowerCase().includes(query)).slice(offset, offset + perPage).map((ele, i) => {
                    return <p key={i}>{ele.title}</p>
                })
            }

            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                // breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Search;


7> search pagination

import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import ReactPaginate from 'react-paginate';

function Search(props) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/albums")
            const res1 = await res.json()
            setData(res1)
            setPageCount(Math.ceil(res1.length / perPage))
        }
        if (query.length === 0 || query.length > 2) {
            getData()

        }

    }, [query, perPage])

    console.log(query)
    console.log(data.filter((val) => val.title.toLowerCase().includes("quidem")))

    const keys = ["title", "id", "userId"]

    // console.log(data[0]["title"])
    const search = (mydata) => {
        return mydata.filter((item) =>
            //item.title.toString().toLowerCase().includes(query) || item.id.toString().toLowerCase().includes(query) || item.userId.toString().toLowerCase().includes(query)
            keys.some((key) => item[key].toString().toLowerCase().includes(query))
        ).slice(offset, offset + perPage)
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <div style={{ margin: "0 auto", maxWidth: "70%", marginTop: "30px" }}>
            <h1>Search</h1>
            <input type="text" placeholder='search...' onChange={(e) => setQuery(e.target.value)} />

            <Table list={search(data)} />

            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                //  breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Search;

import React from 'react';

function Table({ list }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Title</th>
                        <th>userId</th>
                    </tr>

                </thead>
                <tbody>
                    {list.map((ele, i) => {
                        return <tr key={i}>
                            <td >{ele.id}</td>
                            <td >{ele.title}</td>
                            <td >{ele.userId}</td>
                        </tr>
                    })}

                </tbody>
            </table>


            <td>

            </td>
        </div>
    );
}

export default Table;
