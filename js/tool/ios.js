var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端、
if(isiOS){
  // 解决ios active 无效
  document.addEventListener('touchstart',function(event){
    // ↓ 解决ios 双击缩放
    if(event.touches.length > 1 ){
      event.preventDefault();
    }
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false)  
  },false);
  // 解决ios 缩放 双指缩放
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}
// 年月日转化
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}





