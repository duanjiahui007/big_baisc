const request = axios.create({baseURL: 'https://api.asyware.com/wheelgame'}); 
// const request = axios.create({baseURL: 'http://192.168.0.174:8234'});
let token = localStorage.getItem('token')? localStorage.getItem('token') : '';


function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
// 获取token ---本地-- 测试取法 --
function getToken(params) {
  return request({
    url:'/login',
    method:'get',
    params
  })
}

function hasToken(){
  // if(!token){
  //   return 
  return   new Promise((reslove,reject)=>{
        let id = !!getQueryVariable('id')?getQueryVariable('id') : parseInt(Math.random()*1000+1);
        // alert(!!getQueryVariable('id')+'__request__id'+id)
        localStorage.setItem('id',id);
        getToken({userId:id}).then(res=>{
          console.log(res)
          // alert(!!getQueryVariable('id')+'__save__id'+id)
          token = res.headers['x-auth-token'];
          localStorage.setItem('token',token);
          reslove();
        })
    })
  // }
  // return false
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
