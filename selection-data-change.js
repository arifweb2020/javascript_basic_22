import { useEffect, useState } from "react";
import Audi from "./components/Audi";
import Benz from "./components/Benz";
import Ferrari from "./components/Ferrari";

export default function App() {
  const [car, setCar] = useState("selectDreamCar");

  const [ferrariContentVisible, setFerrariContentVisible] = useState(false);
  const [benzContentVisible, setBenzContentVisible] = useState(false);
  const [audiContentVisible, setAudiContentVisible] = useState(false);

  useEffect(() => {
    car === "ferrari"
      ? setFerrariContentVisible(true)
      : setFerrariContentVisible(false);
    car === "benz" ? setBenzContentVisible(true) : setBenzContentVisible(false);
    car === "audi" ? setAudiContentVisible(true) : setAudiContentVisible(false);
  }, [car]);

  const handleOnChange = (e) => {
    setCar(e.target.value);
  };

  const makeFirstLetterCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderResult = () => {
    let result;
    car === "selectDreamCar"
      ? (result = "select your dream car")
      : (result = makeFirstLetterCapital(car));
    return result;
  };

  return (
    <div className="container mt-3">
      <div>
        <h1>Hello {renderResult()}</h1>
      </div>
      <div className="mt-4">
        <select className="form-select" value={car} onChange={handleOnChange}>
          <option value="selectDreamCar">Select your dream car</option>
          <option value="ferrari">Ferrari</option>
          <option value="benz">Benz</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      {ferrariContentVisible && <Ferrari />}
      {benzContentVisible && <Benz />}
      {audiContentVisible && <Audi />}
    </div>
  );
}
       
       
       // API CALL for selection data
       
       
       


const [data,setData] = useState([]);
const [singledata,setSingledata] = useState({});

useEffect(()=>{

const getData = async () =>{

const res = await fetch('https://jsonplaceholder.typicode.com/users')
const res1 = res1.json()
setData(res1)

}

})

const handleSub = (e)=>{

//alert (e.target.value)

const res = await fetch('https://jsonplaceholder.typicode.com/users/' + e.target.value)
const res1 = res1.json()
setSingleData(res1)

}



function Selction(props) {

  return (
  <>
  <select onChange={handleSub}>
  <option value="0">--select this --</option>
  data.map((user,i)=>{
  <option value={user.id} key={i.id}>user.name</option>
  })
  
  </select>
  
  <h1>Single user data</h1>
  
  
  <p>{singledata.username}</p>
  <p>{singledata.email}</p>
  
  </>
  
  )
  }
  
  export default Selction
       
       
