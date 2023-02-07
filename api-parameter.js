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

    
    
        const asyncPostCall = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                 method: 'POST',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer {token}',
                   },
                   body: JSON.stringify({
             // your expected POST request payload goes here
                     title: "My post title",
                     body: "My post content."
                    })
                 });
                 const data = await response.json();
              // enter you logic when the fetch is successful
                 console.log(data);
               } catch(error) {
             // enter your logic for when there is an error (ex. error toast)

                  console.log(error)
                 } 
            }

asyncPostCall()
    
    
    
    API POST method
    
    
    export const LoginAsync = createAsyncThunk(
  'login/loginCred',
  async (args) => {
    const { dob, mobNum } = args;
    return fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        DOB: dob,
        mobileNo: mobNum,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        return res.data
      })
  },
)
