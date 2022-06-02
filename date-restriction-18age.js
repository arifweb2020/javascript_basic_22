/**
 * Login screen
 * Author: Arif
 */
import React, { useState } from "react";
import { Grid } from "@mui/material"
import { useHistory } from "react-router-dom";
import LoginContainer from "./../../../components/login-container/LoginContainer";
import { FormBodyContainer } from "./Login.css";
import LoginButton from "./../../../components/login-button/LoginButton";
import DisableButton from "./../../../components/disable-button/DisableButton";
import ErrorMesssgeAlert from "./../../../components/error-message/ErrorMessagAlert";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import "react-datepicker/dist/react-datepicker.css";
import range from "lodash/range";


/**
 * Login screen
 * @returns Login componet
 */
function Login() {
  const history = useHistory();
  const [mobNum, setMobNum] = useState("");
  const [dob, setDob] = useState("");
  const years = range(1900, getYear(new Date()) + 1, 1);
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
    history.push("/otp")
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
          msgText="Enter correct mobile Number"
          click={handleClose}
        />
      ) : null}
      <LoginContainer heading="Login">

        <FormBodyContainer>
          <p className="headingText">Please enter your details to
            login into the portal</p>
          <div className="inputFieldConatiner">
            <form>
              <Grid container>
                <Grid item xs={12}>
                  <div className="inputBox">
                    <div style={{ padding: "18px" }}>
                      {mobNum > 0 ? <p className="inputLabel">Mobile Number</p> : null}
                      <input type="text"
                        placeholder="Mobile Number"
                        maxLength={10}
                        value={mobNum}
                        className={mobNum > 0 ? "myInput" : "inputLine"}
                        onChange={handleMobNumber}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} mt={2}>
                  <div className="inputBox">
                    {dob ? <p className="inputDateLabel">Date of Birth</p> : null}
                    <DatePicker
                      renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                      }) => (
                        <div
                          style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
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
                            value={months[getMonth(date)]}
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
                        </div>
                      )}
                     // maxDate={new Date()}
                      maxDate={new Date().setFullYear(new Date().getFullYear()-18)}
                      selected={dob}
                      onChange={(date) => setDob(date)}
                      placeholderText="Date of Birth"
                    />
                    {!dob ? <p className="datePalceholderLine" style={{ borderBottom: "1.8px solid #E9E9E9" }}></p> : null}

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
