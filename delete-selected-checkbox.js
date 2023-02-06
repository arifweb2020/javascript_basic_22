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



// select all checbox
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

// select box and delete with api

import React, { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import axios from "axios";
import { Container } from "react-bootstrap";

function Userdelete() 
{
  const history= useHistory();
  const [getuserdata, setUserdata]= useState([]);
  const [isChecked, setisChecked]= useState([]);
  const [delmsg, setDelmsg]= useState('');

  useEffect( ()=>{
    const getUser= async()=>{
      const reqData= await fetch("http://localhost/devopsdeveloper/user/getuser");
      const resData= await reqData.json();
      //console.log(resData);
      setUserdata(resData); 
    }
    getUser();
  }, []);

  const handlecheckbox = (e)=>{
    const {value, checked}= e.target;
    console.log(value);
    if(checked)
    {
      setisChecked([...isChecked, value]);
    } else{
      setisChecked(isChecked.filter( (e)=>e!== value));
    }
  }

  const alldelete= async()=>{
    //console.log(isChecked);
  if(isChecked.length!==0){
    const responce= await axios.post(`http://localhost/devopsdeveloper/user/deletecheckboxuser`, JSON.stringify(isChecked));
    setDelmsg(responce.data.msg);
    setTimeout( ()=>{
      history.push('/user');
    }, 2000);
  } else {
    alert("please Select at least one check box !");
  }

  }

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
         <div className="col-sm-12 mt-2">
         <h2 className="mt-4 mb-4 fw-bold">
              Insert , Update and Delete records in React Js  
            </h2>

            <h5 className="text-danger">{ delmsg } </h5>

            <button className="btn btn-danger" onClick={ alldelete}>Delete</button>
        
            <table className="table text-white table-bordered mt-2">
              <thead>
                <tr>
              <th scope="col"> #</th>  
                <th scope="col">Sr.No</th>         
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">User Address</th>          
                </tr>
              </thead>
              <tbody>
               { getuserdata.map( ( userrecords, index)=>(
                <tr key={index}>  
                <td><input type='checkbox' value={userrecords.user_id} checked={ userrecords.isChecked} onChange={(e)=>handlecheckbox(e)} /></td>                              
                  <th scope="row">{ index+1} </th>
                  <td>{ userrecords.user_name}</td>
                  <td>{ userrecords.user_email}</td>
                  <td>{ userrecords.user_address}</td>                  
                </tr>
               ))
                  }
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Userdelete;

// test delet

/**
 * Entry point of App
 * Author : Arif
 */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useState } from 'react';
import { useEffect } from 'react';
// https://reqres.in/api/users?page=1 https://github.com/DEVfancybear/react-redux-pagination-server-side/blob/master/src/App.js
function App() {
  const [data, setData] = useState([])
  const [isChecked, setisChecked] = useState([]);
  console.log(isChecked)
  useEffect(() => {
    (async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const res1 = await res.json()
      setData(res1)
    })()
  }, [])

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }

  }

  const deleteUsers = () => {

    if (isChecked.length !== 0) {
      const fd = data.filter((val) => !isChecked.includes(val.name))
      setData(fd)
      console.log("dd " , isChecked)
      setisChecked([])
      console.log("ddt " , isChecked)
    } else {
      alert("please Select at least one check box !");
    }

  }

  return (
    <div className="App">
      <button className="btn btn-danger" onClick={deleteUsers}>Delete</button>
      {
        data?.map((ele, i) => {
          return <div>
            <h3><input type="checkbox" value={ele.name} checked={ele?.isChecked} onChange={(e) => handlecheckbox(e)} />{ele.name}
            </h3>
          </div>
        })
      }


      {/* <Provider store={store}>
        <AppRoutes />
      </Provider> */}
    </div>
  );
}



export default App;







