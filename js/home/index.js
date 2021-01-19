const request = axios.create({baseURL: 'http://114.116.17.81:8234'}); 
let token = localStorage.getItem('token')? localStorage.getItem('token') : '';

// 获取token ---本地-- 测试取法 --
function getToken(params) {
  return request({
    url:'/login',
    method:'get',
    params
  })
}
getToken({userId:2}).then(res=>{
  token = res.headers['x-auth-token'];
  localStorage.setItem('token',token);
  request.defaults.headers.common['x-auth-token'] = token;
}) 


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
    method:'get' 
  })
}

// 开始抽奖
function playStart(params){
  return request({
    url:'/user-prize-record',
    method:'get',
    headers:{
      'x-auth-token':token  
    },
    params
  })
}

playStart().then(res=>{
  console.log(Decrypt(res.data))
})
