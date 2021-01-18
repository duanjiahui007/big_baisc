const request = axios.create({baseURL: 'http://114.116.17.81:8234'});

// 获取当前轮配置


// 获取当前活动奖品信息
function getIsPrize(){
  return request({
    url:"/prize/getActivityPrizes",
    method:'get'
  })
}

// 开始当前轮游戏
function playStart(id){
  return request({
    url:"/activity-record/startOneTurn/"+id,
    method:"get"
  })
}

// 关闭当前轮游戏
function playEnd(id){
  return request({
    url:"/activity-record/endOneTurn/"+id,
    method:'get'
  })
}

// 配置新一轮游戏




// 获取数据统计