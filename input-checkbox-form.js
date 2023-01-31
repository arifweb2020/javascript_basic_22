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
