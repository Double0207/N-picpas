
/**
 * Created by Administrator on 2017/4/17.
 */

var $regist=$(".regist");
var $logining=$(".logining");

/* 注册 */
$(".zhuce").eq(0).on("click",function(){
    $regist.show();
})
/*  注册退出 */
$(".regist_close").eq(0).on("click",function(){
    $regist.hide();
})
/* 登录 */
$(".denglu").eq(0).on("click",function(){
    $logining.show();
})
/*  登录退出 */
$(".login-close").eq(0).on("click",function(){
    $logining.hide();
})



