const APP_ID = "e57e70d3-4f50-4fde-9f8b-a0f686852673"
const MER_ID = "2030"
const SCOPE = "1 2 3 4 5 6 7"

const getRandom = function(){
  return `${Math.ceil(Math.random() * 1000)}`
}

const isAndroids = function(){
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
    if(isAndroids()) {
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
  const stringParams = JSON.stringify(params);
  if(isAndroids()){
    window.jsInterface.getCodeForUserId(stringParams);
  } else {
    window.webkit.messageHandlers.getCodeForUserId.postMessage(stringParams);
  }
}

const codeForUserIdCallBack = function(codeForUserIdResult){
     getUserByCode(codeForUserIdResult)
}

const getUserByCode = function(code){
  if(!code){
    alert("用户未登录!")
    if(isAndroids()){
      window.jsInterface.close()
    } else {
      window.webkit.messageHandlers.getCodeForUserId.close();
    }
  }
  const instance = axios.create({
    baseURL: 'https://game.cebbank-xa.com/wheelgame'
  })
  instance({
    url: `/login/${code}`,
    method: 'get'
  }).then(response => {

    let datas = JSON.parse(Decrypt(response.data));
    if(datas.code == -1){
      alert("用户登录失败！请重新进入")
      if(isAndroids()){
        window.jsInterface.close()
      } else {
        window.webkit.messageHandlers.getCodeForUserId.close();
      }
    }else{
      localStorage.setItem('token',response.headers['x-auth-token']);
      token = localStorage.getItem('token');
      getPieList();
      userBout();
      getHasRanking();
      getMePrizeHttp();
    }
    
  })
} 
getAuth();



