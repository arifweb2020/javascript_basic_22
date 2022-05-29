
import React, { useState } from "react";
import { Grid } from "@mui/material"
import { useHistory } from "react-router-dom";
import LoginContainer from "../../components/login-container/LoginContainer";
import { FormBodyContainer } from './Login.css'
import LoginButton from "../../components/login-button/LoginButton";
import DisableButton from "../../components/disable-button/DisableButton";
import ErrorMesssgeAlert from './../../components/error-message/ErrorMessagAlert';
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import "react-datepicker/dist/react-datepicker.css";
import range from "lodash/range";


function Login() {
  const history = useHistory();
  const [mobNum, setMobNum] = useState("");
  const [dob, setDob] = useState("");
  // const range = (start, end) => {
  //   return new Array(end - start).fill().map((d, i) => i + start);
  // };
  const years = range(1975, getYear(new Date()) + 1, 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isError, setError] = useState("")

  const handleMobNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobNum(value);
  };

  const handleSubmission = (e) => {
    e.preventDefault()
    if (!dob) {
      setError(true)
    }
    else {
      history.push("/otp")
    }

  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <>
      {isError ? (
        <ErrorMesssgeAlert
          msgText="Enter mobile Number"
          click={handleClose}
        />
      ) : null}
      <LoginContainer>

        <FormBodyContainer>
          <p className="headingText">Please enter your details to
            login into the portal</p>
          <div className="inputFieldConatiner">

            <form>
              <Grid container>
                <Grid item xs={12}>
                  <div className="inputBox">
                    <div style={{ padding: "18px" }}>
                      <input type="text"
                        placeholder="Mobile Number"
                        maxLength={10}
                        value={mobNum}
                        className={mobNum > 0 ? "myInput" : "inputLine"}
                        onChange={handleMobNumber}
                      />
                      {mobNum > 0 ? <p className="inputLabel">Mobile Number</p> : null}
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} mt={2}>

                  <div className="inputBox">

                    {/* <div style={{ padding: "18px" }}>
                      <input type="date"
                       placeholder="Date of Birth"
                        value={dob}
                        className={dob ? "myInput" : "inputLine"}
                        onChange={(e)=>setDob(e.target.value)}
                      />
                      {dob ? <p className="inputLabel">Date of Birth</p> : null}
                    </div> */}

                    {/* <DatePicker selected={dob}
                      onChange={(date) => setDob(date)}
                      placeholderText="Date of Birth"
                      className={dob ? "arif" : "react-datepicker-wrapper"}
                      
                    /> */}
                    <DatePicker
                      renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        // decreaseMonth,
                        // increaseMonth,
                        // prevMonthButtonDisabled,
                        // nextMonthButtonDisabled,
                      }) => (
                        <div
                          style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                          </button> */}
                          <select
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                          >
                            {years.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <select
                            value={months[getMonth(date + 1,1)]}
                            onChange={({ target: { value } }) =>
                              changeMonth(months.indexOf(value))
                            }
                          >
                            {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                          </button> */}
                        </div>
                      )}
                      maxDate={new Date()}
                      selected={dob}
                      onChange={(date) => setDob(date)}
                      placeholderText="Date of Birth"
                      className={dob ? "arif" : "react-datepicker-wrapper"}
                    />
                    {!dob ? <p className="datePalceholderLine"  ></p> : null}
                    {dob ? <p className="inputDateLabel">Date of Birth</p> : null}
                  </div>


                </Grid>

                <Grid item xs={12} mt={3}>

                  {dob && mobNum.length === 10 ? <LoginButton btnText="Get OTP" click={handleSubmission} /> : <DisableButton btnText="Get OTP" />}
                </Grid>
              </Grid>
            </form>
          </div>
        </FormBodyContainer>
      </LoginContainer>
    </>
  );
}

export default Login;



import { Box } from "@mui/material";
import styled from "styled-components";

export const FormBodyContainer=styled(Box)`



& .headingText{
    color: #25243B;
    font-family: Inter;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.5px;
    line-height: 22px;
}


@media screen and (max-width:667px){
    & .headingText{
    width: 190px;
    position: relative;
    left: 10px;
    }
}

& .inputFieldConatiner{
    margin-top:20px;

    & .otpText{
        ont-family: Inter;
  font-size: 12px;
  letter-spacing: -0.5px;
  line-height: 18px;
  margin-top:10px;

  & span {
    color: #9B1E26;
    font-family: Inter;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 18px;
  }
 
    }

    & .inputBox {
        border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px 0 rgba(37,36,59,0.05);
  height:62px;

//   & .react-datepicker-ignore-onclickoutside{
//       width:100% !important;
//       border:none !important;
//   }

& .datePalceholderLine{
   
    border-bottom-style: solid;
    color: #E9E9E9;
    max-width: 90%;
    margin: 0 auto;
    position: relative;
    z-index: 9999;
    top:10px;
}

& .react-datepicker-wrapper input[type="text"]{
    border: none;
    width:90%;
    position: relative;
    left: 16px;
    top: 14px;
    color: #25243B;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 22px;
//   box-shadow: inset 0 -1.4px 0 0 #E9E9E9;
  padding-bottom:10px;
}

& .arif{
    box-shadow: inset 0 -0.1px 0 0 #fff;
}

& .react-datepicker-wrapper input[type="text"]::placeholder{
    opacity: 0.32;
    color: #25243B;
          font-family: Inter;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.5px;
          line-height: 22px;
}


& input:focus{
    outline: none;
   
}
  



  & .inputLabel{
    color: #25243B;
    font-family: Inter;
    font-size: 10px;
    letter-spacing: 0;
    line-height: 13px;
    position:relative;
    top: -4px;
  }

  & .inputDateLabel{
    color: #25243B;
    font-family: Inter;
    font-size: 10px;
    letter-spacing: 0;
    line-height: 13px;
    position:relative;
    top: 7px;
    left: 17px;
  }

    & .inputLine{
        
        width:100%;
        outline: 0 !important;
    border-width: 0 0 1.5px !important;
    border-color: #E9E9E9; !important;
    padding-bottom:10px;
    
    }

    & .inputLine::placeholder{
        opacity: 0.32;
  color: #25243B;
        font-family: Inter;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.5px;
        line-height: 22px;
    }

    & .myInput{
        outline: 0 !important;
        border-width: 0 0 2px !important;
        border-color:#fff !important;
        width:100%;
        position: relative;
    top: -4.5px;
    color: #25243B;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 22px;
      }
    }

    // @media (max-width:667px){
    //     & .inputBox{
    //         width:100%;
    //     }
    // }
}

`


