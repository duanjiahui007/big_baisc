
// loading  ---- 全局
(function () {
  let loadingBox = document.querySelector('.loading-content');
  for(let i = 0 ; i<6 ; i++){
    let isBool = document.createElement('span');
    isBool.style.animationDelay =140*i +'ms';
    isBool.style.opacity = 1-(i*0.1)
    loadingBox.appendChild(isBool);
  }
})()


{
  // ！！！多次调用 出现 不显示文字情况 待优化 -----------
  // 消息提示  (msg : 'loading' 显示loading圆圈)
  //           ( loading:是否长时间显示)
  //           ( isAll 是否全屏不动  true 是  false )
  //           ( delayed 显示时间 )

  function  getMessage(msg,loading = false,isAll=false,delayed=1.5) {
    this.msg = msg;
    this.loading = loading;
    this.isAll = isAll;
    this.delayed = delayed;
    this.isLang = null;
    this.isLangEr = null;
    this.msg_dom_txt = document.querySelector('.msg-txt');
    this.msg_dom_box = document.querySelector('.mask-msg');

    // 显示
    this.show = function (){
      if(this.isAll){
        this.msg_dom_box .classList.add('mask-msg-all');
      }
      if(this.msg === 'loading'){
        this.msg = `<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>`
      }
      this.msg_dom_txt.innerHTML = this.msg;
      this.msg_dom_box .classList.remove('mask-msg-hide');
      this.msg_dom_txt.classList.add('msg-txt-show');
      this.isLang = setTimeout(()=>{
        this.close();
      },delayed*1000);
      if(this.loading){
        clearTimeout(this.isLang);
      }
    } 
    
    // 关闭
    this.close = function (){
      this.msg_dom_txt.classList.remove('msg-txt-show');
      this.isLangEr = setTimeout(()=>{
        this.msg_dom_box .classList.add('mask-msg-hide')
        this.msg = '';
        this.msg_dom_txt.innerHTML = this.msg;
        if(this.isAll){
          this.msg_dom_box .classList.remove('mask-msg-all');
        }
      },330)
    }
  }
}