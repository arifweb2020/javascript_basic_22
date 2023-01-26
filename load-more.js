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
