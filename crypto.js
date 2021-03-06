1> one way

import CryptoJS from "crypto-js";

// const keyValue = "3KgT4!Bs4$Ss2Cf2";
// const ivValue = "4?_!QWQrC6?Mhkj";

const keyValue = "C&F)J@NcRfUjXn3t";
const ivValue = "aPdSgVkYp3s6v9nh";



/**
 * This encryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AESencryption string
 */
export const encryption = (plaintext) => {

  const key = CryptoJS.enc.Latin1.parse(keyValue);

 // const iv = CryptoJS.enc.Latin1.parse(ivValue);
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
  //  iv: iv,
    mode: CryptoJS.mode.ECB,
    //padding: CryptoJS.pad.ZeroPadding,
    padding: CryptoJS.pad.Pkcs7

  });



  const encryptData = encrypted.toString();
  return encryptData

};




/**
 * This decryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AES decryption string
 */
export const decryption = (plaintext) => {
console.log("dec plaintext " + plaintext)
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  console.log("dec key " + key)
 // const iv = CryptoJS.enc.Latin1.parse(ivValue);
  var decrypted = CryptoJS.AES.decrypt(plaintext, key, {
  //   iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  console.log("dec decrypted " + decrypted)
  const decryptData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptData


};



// 2nd way

import CryptoJS from "crypto-js";

const keyValue = "3KgT4!Bs4$Ss2Cf1";
const ivValue = "4?_!QWQrC6?Mh*hg";

/**
 * This encryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AESencryption string
 */
export const encryption = (plaintext) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  const iv = CryptoJS.enc.Latin1.parse(ivValue);
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return encrypted.toString();
};

/**
 * This decryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AES decryption string
 */
export const decryption = (plaintext) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  const iv = CryptoJS.enc.Latin1.parse(ivValue);
  var decrypted = CryptoJS.AES.decrypt(plaintext, key, {
    iv: iv,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};



// other method

import CryptoJS from "crypto-js";

const keyValue = "C&F)J@NcRfUjXnjh";


/**
 * This encryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AESencryption string
 */
export const encryption = (plaintext) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7

  });

  const encryptData = encrypted.toString();
  return encryptData

};




/**
 * This decryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AES decryption string
 */
export const decryption = (plaintext) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  var decrypted = CryptoJS.AES.decrypt(plaintext, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptData


};


/**
 * This decryption the AES decoded to string
 * @param {String} plaintext (Required)-String to be decoded
 * @returns AES decryption string
 */
 export const decryptionCBC = (plaintext) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  var iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
  var decrypted = CryptoJS.AES.decrypt(plaintext, key, {
    iv: iv,
   // mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptData


};

