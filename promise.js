

const reg = ()=>{
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("reg done")
              res();
          },100)
          
    })
}

const email = ()=>{
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("email done")
              return res("good");
          },2000)
          
    })
}

const otp = ()=>{
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("otp done")
              res();
          },3000)
          
    })
}

reg().then(email().then((res)=>{
     console.log(res)
})).then(otp())


// ERROR



function reg(){
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              
              console.log("reg done")
              res ();
              
          },1000)
          
    })
}

function email(){
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
               return rej("some thing wrong");
              console.log("email done")
              
              
             
          },2000)
          
    })
}

function otp(){
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("otp done")
              res();
          },3000)
          
    })
}

reg().then(email).then(otp).catch((err)=>{
    console.log(err)
})



// multiple api call at same time

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
        Promise.all([getData(), getuser()])
            .then(([res1, res2]) => {
                setData(res1)
                setUser(res2)
                setLoading(false)
            }).catch((err) => {
                setError(true)
            })
    }, []);


// for handling error in api



// The following example shows how to handle errors in Promise.all() for a specific API: 

const promise1 = fetch('https://api.example.com/endpoint1');
const promise2 = fetch('https://api.example.com/endpoint2');

Promise.all([promise1, promise2])
  .then(([res1, res2]) => {

    // Check if both responses are successful
    if (res1.ok && res2.ok) {

      // Do something with the responses
      console.log(res1, res2);

    } else {

      // Handle the error for a specific API response
      if (!res1.ok) {
        throw new Error(`Error from endpoint 1: ${res1.status}`);
      } else if (!res2.ok) {
        throw new Error(`Error from endpoint 2: ${res2.status}`);
      }

    }

  })
  .catch(err => console.error(err));
