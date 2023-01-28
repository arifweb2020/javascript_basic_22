

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stable = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://reqres.in/api/users?page=${page}`);
            console.log(result)
            setData(result.data.data);
        };

        fetchData();
    }, [page]);

    return (
        <div>
              

<button onClick={() => setPage(page - 1)} className='btn btn-md btn-primary'>Previous Page</button>

{data.length === 6 && // Show next button if data length is 10 

<button onClick={() => setPage(page + 1)} >Next Page</button>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} >
                            <td >{item.id}</td>
                            <td >{item.first_name}</td>
                            <td >{item.last_name}</td>
                        </tr>))}

                </tbody>

            </table><br />

            

        </div>
    )
}
export default Stable;
