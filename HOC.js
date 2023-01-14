import React, { useState, useEffect } from 'react';
import './App.css';
import ChildA from './components/loader/ChildA';
import ChildB from './components/loader/ChildB';

function App() {
  return (
    <div className="container mt-4">
  <ChildA name="HOC Testing"/>
  <ChildB/>
    </div>
  );
}

export default App;

// counter

import React,{useState} from 'react';

const Counter = (WrrapedComp) =>{
    function Arif(props) {
        const [count , setCount] = useState(0);

        // {...props} we are <ChildA name="HOC Testing"/> it will not directly go ChildA comp

        const Addition = ()=>{
            setCount(count +1 )
        }
    
        return (
            <div>
                <WrrapedComp count={count} increment={Addition} {...props}/>
            </div>
        );
    }
    return Arif
}


export default Counter;


// child A

import React from 'react';
import Counter from './Counter';
function ChildA({count,increment,name}) {
    return (
        <div>
            <h1>{name}</h1>
            <h3>Child A {count}</h3>
            <button onClick={increment}>Add </button>
        </div>
    );
}

export default Counter(ChildA);

// child B

import React from 'react';
import Counter from './Counter';

function ChildB({count,increment}) {
    return (
        <div>
             <h3>Child B {count}</h3>
             <button onMouseOver={increment}>Hover me </button>
        </div>
    );
}

export default Counter(ChildB);
