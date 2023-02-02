import React, { Component } from "react";

class CheckBox extends Component {
    state = {
        languages: [] 
    }
    onChange = (event) =>{
        //console.log(event.target.checked);
        const isChecked = event.target.checked;
        if(isChecked){
            this.setState({ languages: [...this.state.languages, event.target.value] });
        }else{
            let index = this.state.languages.indexOf(event.target.value);
            this.state.languages.splice(index, 1);
            this.setState({ languages: this.state.languages });
        }
    }
    onSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state.languages);
    }
    render() {
        return (
            <div className='checks'>
                <form onSubmit={this.onSubmit}>
                <p>Select languages.</p>
                <input type="checkbox" name="languages" value="French" onChange={this.onChange}/>
                <label htmlFor="language1"> French</label><br />
                <input type="checkbox" name="languages" value="Spanish" onChange={this.onChange}/>
                <label htmlFor="language2"> Spanish</label><br />
                <input type="checkbox" name="languages" value="German" onChange={this.onChange}/>
                <label htmlFor="language3"> German</label><br />
                <input type="checkbox" name="languages" value="Hindi" onChange={this.onChange}/>
                <label htmlFor="language4"> Hindi</label><br />
                <input type="checkbox" name="languages" value="Japanese" onChange={this.onChange}/>
                <label htmlFor="language5"> Japanese</label><br />
                <input type="checkbox" name="languages" value="Mandarin" onChange={this.onChange}/>
                <label htmlFor="language6"> Mandarin</label>
                <br />
                <input type='submit' value='Submit'/>
                </form>
            </div>
        );
    }
}
export default CheckBox;


// input delete

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


// third option

import React, { useEffect, useState } from "react";

export const App = () => {
  const [selectedConsole, setSelectedConsole] = useState([]);
  const [console, setConsole] = useState([]);

  const dataList = [
    {
      id: "001",
      name: "Atari",
      description: "Click here to add to list"
    },
    {
      id: "002",
      name: "Sega",
      description: "Click here to add to list"
    },
    {
      id: "003",
      name: "Nintendo",
      description: "Click here to add to list"
    }
  ];

  useEffect(() => {
    setConsole(dataList ?? []);
  }, [setConsole]);
  return (
    <div className="">
      Click on any of the 3 div's within the blue border to add it to the
      'selected' area. the checkbox needs to be marked with a tick when the div
      is selected and the tick needs to be removed when the div has been
      unselected by pressing the 'x'
      <div className="flex flex-row border-1 border-gray-1 mt-4 h-466 w-553">
        <div className="h-466 w-303  overflow-auto ">
          {console &&
            console.map((item, index) => (
              <div
                key={`${""}-${index}`}
                id={item.id}
                className="text-sm2 text-blue-1 cursor-pointer border border-blue border-solid border-2 border-blue-600"
                onClick={() => {
                  !selectedConsole.includes(item) &&
                    setSelectedConsole((oldValue) => [...oldValue, item]);
                  const updatedConsole = console.map((element) => {
                    if (item.id === element.id) {
                      element.checked = true;
                    }
                    return element;
                  });
                  setConsole(updatedConsole);
                }}
              >
                <div className="flex flex-row relative w-60">
                  <div className="bg-white border-2 rounded border-blue-0 w-4 h-4 flex flex-shrink-0 mt-5 mr-1 focus-within:border-blue-0">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className=" absolute verification-checkbox"
                    />
                    <svg
                      className="fill-current hidden w-4 h-4 text-blue-3 pointer-events-none"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </div>
                  <div className="flex flex-col ml-2">
                    {item.name}
                    <div className="">{item.description}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col h-300 w-248">
          <div className="flex row mt-2 w-62 pl-2 border-b border-gray-1 mb-3">
            <div className="">
              <span className="text-center inline-block w-3">
                {selectedConsole.length}
              </span>
              <span>selected</span>
            </div>
            <div
              className="pl-10 cursor-pointer"
              onClick={() => {
                setSelectedConsole([]);
              }}
            >
              Unselect all
            </div>
          </div>
          {selectedConsole &&
            selectedConsole.map((format) => (
              <div
                className="flex flex-row justify-between text-blue-3 -ml-2 text-sm4 font-semibold rounded-lg px-4 p-0.5 w-248"
                key={format.id}
              >
                <div className="">{format.name}</div>
                <div
                  className="ml-3 font-bold cursor-pointer text-blue-3"
                  onClick={() => {
                    setSelectedConsole(
                      selectedConsole.filter((f) => f.name !== format.name)
                    );
                    const updatedConsole = console.map((element) => {
                      if (format.id === element.id) {
                        element.checked = false;
                      }
                      return element;
                    });
                    setConsole(updatedConsole);
                  }}
                >
                  X
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default App;


// select all checkbox

import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({
    nr1: false,
    nr2: false
  });

  /* ################################################ */
  /* #### TOGGLES checK STATE BASED ON inputName #### */
  /* ################################################ */

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  /* ###################################################### */
  /* #### CHECKS OR UNCHECKS ALL FROM SELECT ALL CLICK #### */
  /* ###################################################### */

  const selectAll = (value) => {
    setCheckedAll(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  /* ############################################# */
  /* #### EFFECT TO CONTROL CHECKED_ALL STATE #### */
  /* ############################################# */

  // IF YOU CHECK BOTH INDIVIDUALLY. IT WILL ACTIVATE THE checkedAll STATE
  // IF YOU UNCHECK ANY INDIVIDUALLY. IT WILL DE-ACTIVATE THE checkAll STATE

  useEffect(() => {
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  /* ########################## */
  /* #### RETURN STATEMENT #### */
  /* ########################## */

  return (
    <div className="App">
      <div>
        <label>All</label>
        <input
          type="checkbox"
          onChange={(event) => selectAll(event.target.checked)}
          checked={checkedAll}
        />
      </div>
      <div>
        <label>1</label>
        <input
          type="checkbox"
          name="nr1"
          onChange={() => toggleCheck("nr1")}
          checked={checked["nr1"]}
        />
      </div>
      <div>
        <label>2</label>
        <input
          type="checkbox"
          name="nr2"
          onChange={() => toggleCheck("nr2")}
          checked={checked["nr2"]}
        />
      </div>
    </div>
  );
}

