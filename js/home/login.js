
const APP_ID = "0d17557f-7c68-4f22-9d41-b31c588328b5"
const MER_ID = "2001"
const SCOPE = "1 2 3 4 5 6 7"

const getRandom = function(){
  return `${Math.ceil(Math.random() * 1000)}`
}

const isAndroid = function(){
  return !!window.jsInterface.getUserAuthCode
}

const getAuth = function(){
  try{
    const authParams = {
      merId: MER_ID, // 在手机银行申请到的商户Id
      appid: APP_ID, // 在统一认证平台申请到的appid
      state: getRandom(), // 统⼀认证平台所需透转的状态值，为第三⽅⽣成的随机数 
      scope: SCOPE,
      callbackName: 'authCallBack', // 回调函数的名称,全局方法
    }
    const stringParams = JSON.stringify(authParams)	
    if(isAndroid()) {
      window.jsInterface.getUserAuthCode(stringParams)
    } else {
      window.webkit.messageHandlers.getUserAuthCode.postMessage(stringParams)
    }
  }catch(error){
    alert(error)
  }
}

const authCallBack = function(authResult){
  /*
   * 调⽤这个接⼝成功后判断⽤户状态：
   * 1，未登录
   * 2，已登录
   * 如果未登录则会去先进⾏登录。
  */
  getUserByCode(authResult)
}


const getCodeForUserId = function(){
  const params = {
    state: getRandom(), // 统⼀认证平台所需透转的状态值，为第三⽅⽣成的随机数
    scope: SCOPE,
    appId: APP_ID,
    callbackName: 'codeForUserIdCallBack'
  }
  const stringParams = JSON.stringify(params)
  if(isAndroid()){
    window.jsInterface.getCodeForUserId(stringParams)
  } else {
    window.webkit.messageHandlers.getCodeForUserId.postMessage(stringParams);
  }
}

const codeForUserIdCallBack = function(codeForUserIdResult){
  getUserByCode(codeForUserIdResult)
}

const getUserByCode = function(code){
  alert('send code:' + code,"1211");
  if(!code){
    if(isAndroid()){
      window.jsInterface.close()
    } else {
      window.webkit.messageHandlers.getCodeForUserId.close();
    }
  }
  const instance = axios.create({
    baseURL: 'http://114.116.17.81:8234'
  })
  // const baseUrl = 'https://game.cebbank-xa.com/bankconvert'
  instance({
        url: `/login/${code}`,
        method: 'get'
      }).then(response => {
        alert(JSON.stringify(response),"233")
      })
}
getAuth();
  
