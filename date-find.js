  export const ddMMtoMMdd = (date)=>{
   // console.log("params date " + date)
    if(!date) return "01/01/1900"
    var initial = date.split(/\//);
   // console.log(" ddMMtoMMdd " + [initial[1], initial[0], initial[2]].join('/')); //=> 'mm/dd/yyyy'
   // console.log("mnth " + new Date([initial[1], initial[0], initial[2]].join('/')).getMonth())
    return new Date([initial[1], initial[0], initial[2]].join('/')).getTime()
  }
  
  
  setFutureLoan(
           res.payload?.Master_Tag?.CapFirst.filter((val) => {
             let date_1 = new Date(ddMMtoMMdd(val.Next_EMI_DUE_ON));
             return date_1.getTime() > currentDate.getTime();
           }).sort((val1, val2) => {
             return (
               ddMMtoMMdd(val1.Next_EMI_DUE_ON) -
               ddMMtoMMdd(val2.Next_EMI_DUE_ON)
             );
           })[0]
         );
