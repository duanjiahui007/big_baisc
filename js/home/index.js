const request = axios.create({baseURL: 'http://114.116.17.81:8234'}); 
// const request = axios.create({baseURL: 'http://192.168.0.174:8234'});
let token = localStorage.getItem('token')? localStorage.getItem('token') : '';

// 获取token ---本地-- 测试取法 --
function getToken(params) {
  return request({
    url:'/login',
    method:'get',
    params
  })
}
if(!token){
  getToken({userId:2}).then(res=>{
    console.log(res)
    token = res.headers['x-auth-token'];
    localStorage.setItem('token',token);
    request.defaults.headers.common['x-auth-token'] = token;
  })
}



// 当前可玩游戏次数
function userPlayRounds(){
  return request({
    url:'/activity-record-user',
    method:'get',
    headers:{
      'x-auth-token':token  
    }
  })
}
// 大转盘奖品
function getWheelPrize(type){
  return request({
    url:'/activity-prize/getActivityPrize/' + type,
    method:'get',
    headers:{
      'x-auth-token':token  
    }
  })
}
// 开始抽奖
async function playStart(){
  return request({
    url:'/user-prize-record',
    method:'get',
    headers:{
      'x-auth-token':token  
    }
  })
}
// 排行榜接口
function userRanking(){
  return request({
    url:'/user-prize-record/getOrder',
    method:'get',
    headers:{
      'x-auth-token':token
    }
  })
}




// -----------------------  领奖   ------------------------
// 当前中奖接口
function userPrize(){
  return request({
    url:"/prize/getPrize",
    method:'get',
    headers:{
      'x-auth-token':token
    }
  })
}
// 提交接口
function userSubmit(data){
  return request({
    url:'/user-address/addUserAddress',
    method:'post',
    headers:{
      'x-auth-token':token,
      'Content-Type':'application/json'
    },
    data
  })
}