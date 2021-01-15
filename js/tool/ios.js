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





