import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home(props) {
    const [data, setData] = useState([]);
    const [single, setSingle] = useState({});
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const res1 = await res.json();
            console.log(res1);
            setData(res1);
            setLoading(false);
        })();
    }, []);

    const singleHan = (users) => {
        const singledd = data.find((val) => val.id === users)
        setSingle(singledd)
    }

    return (
        <div>
            {
                Object.keys(single).length === 0 && <div>
                    {loading ? (
                        "plz wait data is fetching"
                    ) : (
                        <>
                            <table>
                                <tr>
                                    <th>id</th>
                                    <th>Title</th>
                                </tr>
                                <tbody>
                                    {
                                        data?.map((ele, index) => {
                                            return <tr key={index}>
                                                <td onClick={() => singleHan(ele.id)} style={{ cursor: 'pointer' }}>{ele.name}</td>
                                                <td onClick={() => navigate(`/pagedetails/${ele.id}`)} style={{ cursor: 'pointer' }}> {ele.email}</td>
                                            </tr>
                                        })
                                    }
                                    <tr>


                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

            }


            {Object.keys(single).length > 0 && <div>
                <h1>Single Dtaa</h1>

                <h1>{single.name}</h1>
            </div>}
        </div>
    );
}

export default Home;
