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
