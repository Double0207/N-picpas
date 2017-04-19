/**
 * Created by Administrator on 2017/4/19.
 */
var dialogModal=document.getElementById("dialogModal");
var upload=document.getElementById("upload");
var close=document.getElementById("close");


upload.onclick=function(){
    dialogModal.style.display="block";
}
close.onclick=function(){
    dialogModal.style.display="none";
}