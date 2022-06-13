import { decryptionCBC } from "./APISecurity";

export function getUserInfo() {
   
    const storageData = JSON.parse(localStorage.getItem("token"));
    const decryptData = decryptionCBC(storageData);
    console.log("decrypt data " + decryptData)
    return JSON.parse(decryptData)?.Master_Tag?.CapFirst[0] || {};

}

// how to call

{getUserInfo().CustomerID}
