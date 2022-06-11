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
        getData()
    }, [])

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
