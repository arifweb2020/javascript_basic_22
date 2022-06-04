  useEffect( (args) => {
    const getData = async () =>{
      const { agreementId, noOfRecord } = args;
      const data = {
        agreement_ID: agreementId,
        noOfPaymentRecords: noOfRecord,
      };
      const res = await axios.post(
        `${url}/getTransactionHistory`,
        data
      );
      const res1 = res.json()
|
    }
    getData()
  }, [])
  
  
  // for login api
  
   export const LoginAsync = createAsyncThunk(
   "login/loginApi",
   async (args) => {
    const { user, password } = args;
    const urlParam = JSON.stringify({
        username: user,
        password: password,
      });
     // axios.request can be used once it is configured by default using axios.create
     const response = await axios.post(`${endpointURL}/login`, urlParam);
     //  console.log("score card response is : " + JSON.stringify(response.data));
     return response;
   }
 );
    
    // for get method
    
      export const invoiceDetailsAsync = createAsyncThunk(
    "invoice/invoiceDetails",
    async (args) => {
          const {refId} = args
        // axios.request can be used once it is configured by default using axios.create
       const response = await axios.get(`${endpointURL}/invoice/invoiceDetails`, {
           params: {
                referenceId:refId
           }
         })
        return response;
    }
);
