App.js

import Counter

 <Counter render={(count, increment, decrement) => (<RenBtn cnt={count} inc={increment} dec={decrement} />)} />


// Counter.js

import React, { useState } from 'react';

function Counter(props) {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount((prev) => prev + 1)
    }

    const decrement = () => {
        setCount((prev) => prev - 1)
    }

    return (
        <div>
            <h1>Render props counter</h1>
            {props.render(count, increment, decrement)}
        </div>
    );
}

export default Counter;

// RenBtn.js

import React from 'react';

function RenBtn({cnt,inc,dec}) {
    return (
        <div>
            {cnt}
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}

export default RenBtn;



   {/* <RenderProps render={()=> "render props"}/> */}
            {/* passing as aprops */}
            <RenderProps render={(param) => param} />

import React from 'react';

function RenderProps(props) {
    return (
        <div>
            {/* {props.render()} */}
            {/* passing as para */}
            {props.render("arif")}
        </div>
    );
}

export default RenderProps;
