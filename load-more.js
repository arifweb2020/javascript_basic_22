 const [users,setUsers]=useState([])
    const total = 4;
    const [next , setNext] = useState(total)
    const [compl,setCompl]= useState(false)

    useEffect(()=>{
   (async ()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const res1 = await res.json();
    setUsers(res1)
   })()
    },[])

const moreData = ()=>{
    setNext((prev) => prev + 4)

    if (next >= users.length) {
        setCompl(true)
      } else {
        setCompl(false)
      }
}

const lessData=()=>{
    setNext(4)
}

<div className='load'>
                {
                    users?.slice(0,next)?.map((ele)=>{
                        return <h1>{ele.name}</h1>
                    })
                }
               {
                compl ?  <button className='btn btn-md btn-primary' onClick={lessData}>show less</button>
                 : <button className='btn btn-md btn-primary' onClick={moreData}>load more</button> 
               }
                
            </div>




// 2nd way

import "./styles.css";
import { useState } from "react";
export default function App() {
  const [visibleBlogs, setVisibleBlogs] = useState(2);
  const [seeMe, setSeeMe] = useState(false);
  const [blogs, setBlog] = useState([
    {
      name: "pavan",
      age: 22,
      id: 1
    },
    {
      name: "pavu",
      age: 22,
      id: 2
    },
    {
      name: "johan",
      age: 22,
      id: 3
    },
    {
      name: "Deepu",
      age: 22
    },
    {
      name: "kareya",
      age: 22,
      id: 4
    },
    {
      name: "killer",
      age: 22,
      id: 5
    },
    {
      name: "miller",
      age: 22,
      id: 6
    },
    {
      name: "vivek",
      age: 22,
      id: 7
    },
    {
      name: "shashank",
      age: 22,
      id: 8
    },
    {
      name: "facebook",
      age: 22,
      id: 9
    }
  ]);

  const laodMe = () => {
    setSeeMe(!seeMe);
  };
  const cardComponent = blogs.slice(0, visibleBlogs).map((blog, i) => {
    return <p key={i}>{blog.name}</p>;
  });

  return (
    <div>
      {cardComponent}
      <button
        disabled={blogs.length === cardComponent.length}
        type="button"
        onClick={() => setVisibleBlogs((prev) => prev + 2)}
      >
        See more
      </button>

      <br />
      <br />
      <br />
      <button type="button" onClick={laodMe}>
        view name All
      </button>
      {seeMe && cardComponent}
    </div>
  );
}
