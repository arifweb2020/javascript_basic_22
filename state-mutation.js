// Example of immutating state in React Hooks
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    // Create a new state object by copying the current state object and then updating the count value. 
    const newCount = { ...count };
    newCount.value += 1;

    // Update the count with the new state object. 
    setCount(newCount);
  }

  return (
    <div>
      <p>You clicked {count.value} times</p>
      <button onClick={incrementCount}>Click me</button>
    </div>
  );
}

// 2nd exmaple

import "./styles.css";
import {useState} from 'react'

export default function App() {
  const [state, setState] = useState({
    name: 'John',
    age: 30,
    city: 'New York'
  });

  const handleChange = (name, value) => {
    // Create a new object and spread the existing state into it. 
    const newState = { ...state, [name]: value };

    // Set the new state object as the component state. 
    setState(newState);  
  }
  return (
    <div className="App">
     <input type="text" value={state.name} onChange={e => handleChange('name', e.target.value)} />  

<input type="number" value={state.age} onChange={e => handleChange('age', e.target.value)} />  

<input type="text" value={state.city} onChange={e => handleChange('city', e.target.value)} />  

<p>Name: {state.name}</p>  

<p>Age: {state.age}</p>  

<p>City: {state.city}</p> 
    </div>
  );
}


// immutable of array

const [state, setState] = useState([1, 2, 3]);

//immutate state of array 
const newState = [...state];  // create a copy of the state array 
newState[0] = 4; // change the first element in the array 
setState(newState);
