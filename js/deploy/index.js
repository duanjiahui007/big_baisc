const request = axios.create({baseURL: 'http://114.116.17.81:8234'});
// const request = axios.create({baseURL: 'http://192.168.0.174:8234'});

// 获取当前轮配置
function getToolPrize(type){
  return request({
    url:'/activity-prize/getActivityPrize/' + type,
    method:'get'
  })
}

// 获取当前活动奖品信息
function getIsPrize(){
  return request({
    url:"/prize/getActivityPrizes",
    method:'get'
  })
}

// 开始/关闭当前轮游戏 
function startOREnd(data){
  return request({
    url:"/activity-record/modifyStatus/",
    method:"put",
    data
  })
}


// 配置新一轮游戏 (确定)
function ToolYes(data){
  return request({
    url:'/activity-prize/addActivityPrize',
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data
  })
}

// 获取当前开始游戏的时间
function getGameingTime(params){
  return request({
    url:"/activity-record/getActivityRecord",
    method:'get',
    params
  })
}


// 获取数据统计

function getDataRecord() {
  return request({
    url:'/activity-record/statistics',
    method:'get'
  })
}