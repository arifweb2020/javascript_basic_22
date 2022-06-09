export function getLoanDisplayValue(loanType) {
  const loanMapping = {
    PL: "Personal Loan",
    CD: "Consumer Durable Loan",
    TW: "Two Wheeler Loan",
    HL: "Home Loan",
    BIL: "Business Loan",
    UCL: "Used Car Loan",
    ML: "Mortgage Loan",
    EBC: "Easy Buy Card",
    SEPL: "Self Employed Professional Loans",
  };

  return loanMapping[loanType] || "UNKNOWN";
}

// use like this
import { getLoanDisplayValue } from './../utilities/getLoanDisplayValue';
<TransactionList
              title={`EMI for ${"april"}`}
              txnMoney={` ₹${ele.txnAmount?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")} `}
              paymentDate="Payment Date"
              paymentMode={getLoanDisplayValue(ele.paymentMode)}
              date={getLoanDate(ele.txnDate)}
            />
            
            
             <Card
          backgroundColor="#fef9e6"
          topIcon={<OutstandingCharges />}
          heading="Outstanding Charges"
          message={`Charges of ${data?.Outstanding_Charges.amount} are oustanding on your account`}
          points={`${
            reportData?.data?.Outstanding_Charges.Accumulated_Rating || "X"
          }/${reportData?.data?.Outstanding_Charges.Gross_Rating || "X"}`}
          textColor="#D6AE0A"
        >
