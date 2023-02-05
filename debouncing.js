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


// without debounce

import './App.scss';
import { Route, Routes } from "react-router-dom";
import Home from './component/profile/Home';
import Details from './component/profile/Details';
import { useEffect, useState } from 'react';

function App() {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const hanndleChange = (e) => {
    const text = e.target.value
    setSearch(text)
  }

  useEffect(() => {
    if (search) {
      fetchPokemon(search);
    } else {
      console.log('Something else')
    }
  }, [search])

  const fetchPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((response) => {
       // console.log('Reponse', response);
        setData(response)
      })
  }

  return (
    <div className="app-container">

      <input type="text" value={search} onChange={hanndleChange} />

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagedetails/:id" element={<Details />} />
      </Routes> */}
      {data ? (
        <div>
          <h1> {data.name}</h1>
        </div>
      ) : <h1>No  Data</h1>}
    </div>
  );
}

export default App;


// normal search on input box

    const [search,setSearch] = useState("")
    const[sdata,setSdata] = useState([])
   const handleChange = (e)=>{
      const{value} = e.target;
      setSearch(value)
      fetch(`https://demo.dataverse.org/api/search?q=${value}`).
      then((res)=>res.json())
      .then((res)=>{
        setSdata(res.data.items)
      })
    }
   
   
  <input type="text" value={search} onChange={handleChange} />

        {
            sdata.length > 0 && search.length > 0 ?
            <>
            {
                sdata?.map((ele)=>{
                    return <p>{ele.name}</p>
                })
            }
            </> : null
        }
        
   // filter search with delay
        
        import cities from 'cities-list'
import { useState } from 'react'

const citiesArray = Object.keys(cities)

const App = () => {
  const [filteredCities, setFilteredCities] = useState([])
  
  let filterTimeout

const doCityFilter = query => {
  clearTimeout(filterTimeout)
  if (!query) return setFilteredCities([])

  filterTimeout = setTimeout(() => {
    console.log('====>', query)
    setFilteredCities(citiesArray.filter(
      city => city.toLowerCase().includes(query.toLowerCase())
    ))
  }, 500)
}

  return (
    <div className="container">
      <h1>Find your favourite cities</h1>

      <form className="mt-3 mb-5">
        <input
          type="text"
          className="px-2"
          placeholder="search here..."
          onChange={event => (doCityFilter(event.target.value))}
        />
      </form>

      <div>
        {filteredCities?.map((city, index) => (
          <p key={index}>{city}</p>
        ))}
      </div>
    </div>
  )
}

export default App



