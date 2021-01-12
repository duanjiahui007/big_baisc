// const CryptoJS = require('crypto-js') // 引用AES源码js

const key = CryptoJS.enc.Utf8.parse('LxQq188292@$*Lxb') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('LXqQ188292@1o3sP') // 十六位十六进制数作为密钥偏移量

// 解密方法
function Decrypt(word) {
  const decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
function Encrypt(word) {
  // console.log(word)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}


