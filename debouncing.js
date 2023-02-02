import React, {useState,useEffect} from 'react';
import './App.css';
import useDebounce from './useDebounce';

function App() {
  const [searchTerm,setSearchTerm] = useState('');
  const [data,setData] = useState([]);
  const debouceSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    if(debouceSearchTerm) {
      fetchPokemon(debouceSearchTerm);
    }else {
      console.log('Something else')
    }
  },[debouceSearchTerm]) 

  const fetchPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => res.json())
    .then((response) => {
      console.log('Reponse', response);
      setData(response)
    })
  }
  return (
    <div className="App">

      <input 
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder="Serach pokemon..."
      />
      {data ? (
        <div>
         <h1> {data.name}</h1>
          </div>
      ) : <h1>No  Data</h1>}
    </div>
  );
}


import React, {useState,useEffect} from 'react';


const useDebounce = (value, delay) => {
    const [debounceValue,setDebounceValue]=useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [value,delay])
 
 
 
    return debounceValue;
}

export default useDebounce;
export default App;
