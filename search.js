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
