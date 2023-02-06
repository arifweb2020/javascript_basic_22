https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/

import "./styles.css";
import {useState} from 'react'

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
  ]);

  const handleChange = (id) => {

    const newItems = items.map((item) => {

      if (item.id === id) {

        return { ...item, checked: !item.checked };

      } else {

        return item;

      }

    });

    setItems(newItems);

  };

  const deleteSelected = () => {

    const newItems = items.filter((item) => !item.checked);

    setItems(newItems);

  };  
  return (
    <div className="App">
     <ul>  
         {items.map((item) => (  
           <ListItem key={item.id} item={item} onChange={() => handleChange(item.id)} />  
         ))}  
       </ul>  
       <button onClick={deleteSelected}>Delete Selected</button> 
    </div>
  );
}


 const ListItem = ({ item, onChange }) => {
  return (
    <div>
      <input type="checkbox" checked={item.checked} onChange={onChange} />
      {item.name}
    </div>
  );
};



// select all box
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import YTVideo from "./YTVideo";

const userData = [
  { name: "Jeevan" },
  { name: "Manish" },
  { name: "Prince" },
  { name: "Arti" },
  { name: "rahul" }
];

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <div className="container my-4" style={{ width: "500px" }}>
      <form className="form w-100">
        <h3>Select Users</h3>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="allSelect"
            // checked={
            //   users.filter((user) => user?.isChecked !== true).length < 1
            // }
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <label className="form-check-label ms-2">All Select</label>
        </div>
        {users.map((user, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2">{user.name}</label>
          </div>
        ))}
      </form>
      <YTVideo embedId="mGV9r0wgCrI" />
    </div>
  );
}

export default App;



