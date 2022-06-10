export const LoginAsync = createAsyncThunk(
  "login/loginCred",
  async (args) => {
    const { dob, mobNum, message, emailId, traceId, source } = args;
    const urlParam = JSON.stringify({
      // DOB: dob,
      // mobile: mobNum,
      // message: message,
      // emailId: emailId,
      // traceId: traceId,
      // source: source
      mobile: "8860623967",
      message: "Dear Customer, *** is your OTP for login process . It will be valid for 5 minutes. Team IDFC FIRST Bank. e/CNDtlkBVh ",
      emailId: null,
      traceId: "R4YAQAGM74",
      source: "SFDC"
    });
    // encrypting the payload
    const encPayload = encryption(urlParam);
    //  console.log("dec val is " + decryption(encPayload))

    // const ip = decryption("o3Gs1tLMAdnrM5okFoxc6gmu670AK/NdFl0ivCRpQRjx36+986V+WSMLa0kxIBV7jZuNzGvMUErB\nMc61TpBccFEtB+FptVB3I1AZahNgUZ+S7VU2CC8X2pb52MuUvzgxWRRjNrLXKp72X5BJg/o4KN/r\n0sZo0S/HHD64I6ysGzJmeyaYl4xGHeUErOzQg1VQYxmQ/I1+tzawBVM8ohABGKSwbzGIZYfwHPul\n0YCkAyiNbfRJa6CBb3KWUN1N6ZaKGFEiiNL5HsTAMpQOL+kBBmDj4yxpsunAYgN2Swz15wxI3mLc\nIM53YiBxrEkNlQGgXvEHtGpdE02QNoNVIKXS4A==\n")
    // console.log("IP " + ip)
    // axios.request can be used once it is configured by default using axios.create
    const response = await axios.post('/sendOtp',
      {
        encryptedSendOtpRequest: encPayload
      }
    );
    console.log("response " + JSON.stringify(response))
    const decResponse = decryption(response.data.data.encryptedSendOtpResponse);
   // const finalResponse = JSON.parse(decResponse)
    //  response.data.encryptedSendOtpResponse = JSON.parse(decResponse);
  //  console.log("dec data " + JSON.stringify(finalResponse))

    try {
      return JSON.parse(decResponse);
    } catch (error) {
      return null;
    }
  }
);
