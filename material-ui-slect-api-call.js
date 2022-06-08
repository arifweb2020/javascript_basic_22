import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/app-header/AppHeader";
import { HeadingBox } from "../loan-view/loans/ActiveLoans";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LoanDropdown from "../../components/loans-dropdown/LoanDropdown";
import { useDispatch } from "react-redux";
import {
  DropdownContainer,
  SelectBox,
  BottomBox,
  StyledTipHeader,
} from "./LoanHistory.css";
import RatingTiles from "../../components/rating-tiles/RatingTiles";
import { Grid, Box } from "@mui/material";
import TransactionList from "./../../components/transaction-history-list/TransactionList";
import LoanDetails from "../../components/loan-details/LoanDetails";
import { loanHistoryAsync } from "./LoanHistorySlice";
import { getLoanDate, getMonth } from "../../utilities/dateFormat";
import AppFooter from "./../../components/app-footer/AppFooter";
import { numberOfLastTransaction } from "../../global/constants";
import { getLoanDisplayValue } from "../../utilities/getLoanDisplayValue";
import { getPaymentModeValue } from './../../utilities/getPaymentModeValue';
import { activeLoansAsync } from './../loan-view/loans/ActiveLoansSlice';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function LoanHistory() {
  //   const loanHistoryData = useSelector((state) => state.loanHistory.data);
  // console.log("history data: "+ JSON.stringify(loanHistoryData));
  const history = useHistory();
  const paymentPage = (e) => {
    window.location =
      "https://reporting.idfcfirstbank.com/QuickPay/Login/LoginEMI.aspx";
  };
  const dispatch = useDispatch();
  const [agreementId, setAgreementId] = useState("118324");
  const [noOfRecord, setNoOfRecord] = useState(numberOfLastTransaction);
  const [historyData, setHistoryData] = useState({});
  const [loan, setLoan] = useState([])
  const [selectLoan, setSelectLoan] = useState("")
  useEffect(() => {
    dispatch(loanHistoryAsync({ agreementId, noOfRecord })).then((res) => {
      setHistoryData(res.payload.data.data.Master_Tag.CapFirst);
    });
  }, []);
  const customerId = "C5733678421";
  React.useEffect(() => {
    dispatch(activeLoansAsync({ customerId })).then((res) => {
      console.log(
        "loan type list : " +
        JSON.stringify(res.payload?.data.data.Master_Tag.CapFirst)
      );
      setLoan(
        res.payload?.data.data.Master_Tag.CapFirst);


    });
  }, [dispatch]);

  const handleChange = (event) => {
    setSelectLoan(event.target.value);
  };

  return (
    <div>
      <AppHeader backgroundColor="#fff">
        <Grid container>
          <Grid xs={2} md={1} sm={1}>
            <span
              onClick={() => history.push("/")}
              style={{ color: "#9C1E26", cursor: "pointer" }}
            >
              <ArrowBackIosIcon />
            </span>
          </Grid>
          <Grid xs={12} md={12} sm={12}>
            <HeadingBox>
              <h3>History</h3>
            </HeadingBox>
          </Grid>
        </Grid>
      </AppHeader>
      <DropdownContainer>

        <StyledTipHeader>SELECT LOAN TO VIEW HISTORY</StyledTipHeader>

        <SelectBox mt={1}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
            <InputLabel
              style={{
                opacity: "0.32",
                color: "#25243B",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.4px",
                lineHeight: "24px",
              }}

              id="demo-simple-select-standard-label"
            >
              {selectLoan ? null : "Loan Type"}
            </InputLabel>
            {selectLoan ? <div style={{ background: "#fff", height: "4px", position: "relative", top: "57px", zIndex: 999 }}></div> : null}
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={loan}
              onChange={handleChange}
              label="Laon Type"
              variant="standard"
              color="error"
            >

              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {loan?.map((ele, i) => {
                return <MenuItem key={i?.LoanAccount} value={ele?.LoanAccount}><p style={{ color: "#25243B", fontFamily: "Inter", fontSize: "16px", fontWeight: "600", position: "relative", top: "-4px" }}>{ele?.LoanAccount}<br />{ele?.Loan_Type}</p></MenuItem>
              })}
              {/* <MenuItem value={1}><p style={{ color: "#25243B", fontFamily: "Inter", fontSize: "16px", fontWeight: "600", position: "relative", top: "-4px" }}> 3432325 <br />Bussiness Loan</p></MenuItem>
              <MenuItem value={2}><p style={{ color: "#25243B", fontFamily: "Inter", fontSize: "16px", fontWeight: "600", position: "relative", top: "-4px" }}>8732325<br />Home Loan</p></MenuItem>
              <MenuItem value={3}><p style={{ color: "#25243B", fontFamily: "Inter", fontSize: "16px", fontWeight: "600", position: "relative", top: "-4px" }}>974323<br />Personal Loan</p></MenuItem>
              <MenuItem value={4}><p style={{ color: "#25243B", fontFamily: "Inter", fontSize: "16px", fontWeight: "600", position: "relative", top: "-4px" }}>3987363<br />Two Wheeler Loan</p></MenuItem> */}
            </Select>

          </FormControl>

        </SelectBox>
      </DropdownContainer>

      <div style={{ marginBottom: "40px" }}>
        <LoanDetails
          HolderName={getLoanDisplayValue(historyData.loanType)}
          loanAmt={`₹${historyData.loanAmount?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`}
          emiAmt={`₹${historyData.emiAmount?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`}
          bank={historyData.bankname || "NA"}
          AccountNumber={historyData.lan}
          debitCard={historyData.autoDebitBankNumber}
        />
      </div>

      <DropdownContainer>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <RatingTiles
              backcolor="#CAE7D0"
              title={
                historyData.noOfDigitalPayments + "/" + numberOfLastTransaction
              }
              subtitle="No. of Digital Payments"
            />
          </Grid>
          <Grid item xs={6}>
            <RatingTiles
              backcolor="#F4D8CF"
              title={historyData.noOfBounces + "/" + numberOfLastTransaction}
              subtitle="Bounces in last month"
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <p style={{
            color: "#25243B",
            fontFamily: "Inter",
            fontSize: "11px",
            letterSpacing: 0,
            lineHeight: "12px"
          }}>TRANSACTION HISTORY</p>
          {historyData?.history?.map((ele) => (
            // <TransactionList
            //   title={`EMI for ${getMonth(ele.txnDate)}`}
            //   txnMoney={` ₹${ele.txnAmount} `}
            //   paymentDate="Payment Date"
            //   date={getLoanDate(ele.txnDate)}
            //   txnMoneyColor="#008568"
            //   click={paymentPage}
            // />

            <TransactionList
              title={`EMI for ${"april"}`}
              txnMoney={` ₹${ele.txnAmount?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")} `}
              paymentDate="Payment Date"
              paymentMode={getPaymentModeValue(ele.paymentMode)}
              date={getLoanDate(ele.txnDate)}
            />
          ))}

        </Box>
        {/* <BottomBox mt={2}>
          <p>Showing 6 of 59</p>
          <h6>View More</h6>
        </BottomBox> */}
      </DropdownContainer>
      <Box mt={3}>
        <AppFooter />
      </Box>
    </div>
  );
}

export default LoanHistory;
