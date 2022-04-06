import React from 'react';
import './App.css';
//Including all libraries, for access to extra methods.
var CryptoJS = require("crypto-js");

function App() {
  var data = [{ id: 1, name: 'Anil' }, { id: 2, name: 'Sunil' }]

  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();
  //log encrypted data
  console.log('Encrypt Data -')
  console.log(ciphertext);

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  //log decrypted Data
  console.log('decrypted Data -')
  console.log(decryptedData);

  return (
    <div className="App">
      <header className="App-header">
        <div>Encrypt Data -{ciphertext}</div>
        <div>
          {decryptedData.map(function (object) {
            //console.log(object)
          })}
        </div>
      </header>
    </div>
  );
}
export default App;




const your_obj = {
  key: "value"
};
const key = "some_constant_key"
const stringified = JSON.stringify(your_obj);

const data = sjcl.encrypt(key, stringified);

localStorage.setItem("MY_DATA", data);

// retrieve the data
const encryptedData = localStorage.getItem("MY_DATA");
const decryped = JSON.parse(sjcl.decrypt(key,retrievedData))



