// JavaScript Document
function pwdheight(){
    var pwdh=$(".pwdbody").height()
    $("#pwd").height(pwdh+70)
}
var changepwd1=1;
var changepwd2=1;
var changepwd3=1;
$(function(){
    pwdheight();
    $.ajax({
        type:"POST",
        url:"cust_upwd.action",
        data:{},
        dataType:'JSON',
        success: function(data){
            var str=data.obj;
            $("#uemail").val(str[0])
            $(".pwdbody_1 input").val(str[1])
        }
    })
})
function lcheckpwd1(val){
    if(val==""){
        document.getElementsByClassName("lpwd").item(0).style.color="#a94442"
        document.getElementById("checkmail").style.paddingBottom=10+"px"
        $("#checkmail").html("<font color='#a94442'>当前密码不能为空</font>")
        changepwd1=1;
    }else{
        document.getElementsByClassName("lpwd").item(0).style.color="#47a812"
        document.getElementById("checkmail").style.paddingBottom=0+"px"
        $("#checkmail").html("")
        changepwd1=0;
    }
    pwdheight();
}
function lcheckpwd2(val){
    lcheckpwd1($(".pwdbody_1 input").val())
    if(val==""){
        document.getElementsByClassName("lpwd").item(1).style.color="#a94442"
        document.getElementById("checkpwd").style.paddingBottom=10+"px"
        $("#checkpwd").html("<font color='#a94442'>登陆密码不能为空</font>")
        changepwd2=1;
    }else if(val.length<8){
        document.getElementsByClassName("lpwd").item(1).style.color="#a94442"
        document.getElementById("checkpwd").style.paddingBottom=10+"px"
        $("#checkpwd").html("<font color='#a94442'>登陆密码应该包含至少8个字符</font>")
        changepwd2=1;
    }else{
        document.getElementsByClassName("lpwd").item(1).style.color="#47a812"
        document.getElementById("checkpwd").style.paddingBottom=0+"px"
        $("#checkpwd").html("")
        changepwd2=0;
    }
    pwdheight();
}
function lcheckpwd3(val){
    var pwd=document.getElementsByClassName("input").item(1).value;
    if(val==""){
        document.getElementsByClassName("lpwd").item(2).style.color="#a94442"
        document.getElementById("checkpwd2").style.paddingBottom=10+"px"
        $("#checkpwd2").html("<font color='#a94442'>重复密码不能为空</font>")
        changepwd3=1;
    }else if(val.length<8){
        document.getElementsByClassName("lpwd").item(2).style.color="#a94442"
        document.getElementById("checkpwd2").style.paddingBottom=10+"px"
        $("#checkpwd2").html("<font color='#a94442'>重复密码应该包含至少8个字符</font>")
        changepwd3=1;
    }else{
        if( val!=pwd){
            document.getElementsByClassName("lpwd").item(2).style.color="#a94442"
            document.getElementById("checkpwd2").style.paddingBottom=10+"px"
            $("#checkpwd2").html("<font color='#a94442'>重复密码必须重复</font>")
            changepwd3=1;
        }else{
            document.getElementsByClassName("lpwd").item(2).style.color="#47a812"
            document.getElementById("checkpwd2").style.paddingBottom=0+"px"
            $("#checkpwd2").html("")
            changepwd3=0;
        }
    }
    pwdheight();
}
function changepwd(){
    lcheckpwd1($(".pwdbody_1 input").val())
    lcheckpwd2($(".pwdbody_2 input").val())
    lcheckpwd3($(".pwdbody_3 input").val())
    var changepwd=changepwd1+changepwd2+changepwd3;
    if(changepwd==0){
        var uemail=$("#uemail").val()
        var upwd=$(".pwdbody_3 input").val();
        $.ajax({
            type:"POST",
            url:"cust_cpwd.action",
            data:{uemail:uemail,upwd:upwd},
            dataType:'JSON',
            success: function(data){
                alert(data.code)
                if(data.code==1){
                    location.href="Login.html?uemail="+uemail;
                }else{
                    regts("输入错误...")
                }
            }
        })
    }
    pwdheight();
}
function regts(str){
    $(".g_addCartDialog font").text(str);
    window.clearTimeout(mytime);
    $(".g_addCartDialog").show("slow");
    mytime = window.setTimeout(function() {
        $(".g_addCartDialog").hide("slow");
    }, 1500);
}