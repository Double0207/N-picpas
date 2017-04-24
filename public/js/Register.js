// JavaScript Document
var RegisterYN1=1;
var RegisterYN2=1;
var RegisterYN3=1;
var mytime;
function regts(str){
    $(".g_addCartDialog font").text(str);
    window.clearTimeout(mytime);
    $(".g_addCartDialog").show("slow");
    mytime = window.setTimeout(function() {
        $(".g_addCartDialog").hide("slow");
    }, 2000);
}

//适应高度
function lheight(){
    document.getElementsByClassName("Registerbody_1").item(0).style.height=document.getElementsByClassName("Registerbody_2").item(0).offsetHeight+60+"px"
}
$(function(){
    lheight();
    context=$(".choice_3").text();
    $(".choice_3").html("<font color='#47a812'>"+context+"</font>")
    var zc=$(".Registerhead_2_2_1").text()

    if("注册"==zc){
        $.ajax({
            type:"POST",
            url:"cust_loginjz.action",
            data:{},
            dataType:'JSON',
            success: function(data){
                if(data.code==1){
                    //如果记住了
                    var str=data.obj
                    var uemail=str[0];
                    var upwd=str[1];
                    $(".input1").attr("value",uemail);
                    $(".input2").attr("value",upwd);
                    $(".Registerbody_2_2_1 input").attr("checked","true")
                }else{
                    if(GetQueryString("uemail")!=null){
                        $(".input1").attr("value",GetQueryString("uemail"));
                    }
                }

            }
        })
    }
})


//检查邮箱
function lcheck(num){
    var context="";
    for(var i=1;i<4;i++){
        context=$(".choice_"+i).text();
        $(".choice_"+i).html(context)
    }
    context=$(".choice_"+num).text();
    $(".choice_"+num).html("<font color='#47a812'>"+context+"</font>")
}


//
function regmail(str){
    var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!reg.test(str)){
        return true;
    }else{
        return false;
    }
}




function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}



function lcheckmail(){
    var mail=$(".input1").val();
    if(mail==""){
        document.getElementById("checkmail").style.paddingBottom=10+"px"
        $("#checkmail").html("<font color='#1e90ff'>邮箱地址不能为空</font>")
        RegisterYN1=1;
    }else if(regmail(mail)){
        document.getElementById("checkmail").style.paddingBottom=10+"px"
        $("#checkmail").html("<font color='#1e90ff'>邮箱地址不是有效的邮箱地址。</font>")
        RegisterYN1=1;
    }else{
        document.getElementById("checkmail").style.paddingBottom=0+"px"
        $("#checkmail").html("")
        RegisterYN1=0
    }
    lheight();
}


//邮箱输入行
function lcheckmail1_1(){
    var mail=$(".input1").val();
    if(mail==""){
        document.getElementById("checkmail").style.paddingBottom=10+"px"
        $("#checkmail").html("<font color='#1e90ff'>邮箱地址不能为空</font>")
        RegisterYN1=1;
    }else if(regmail(mail)){
        document.getElementById("checkmail").style.paddingBottom=10+"px"
        $("#checkmail").html("<font color='#1e90ff'>邮箱地址不是有效的邮箱地址。</font>")
        RegisterYN1=1;
    }else{
        document.getElementById("checkmail").style.paddingBottom=0+"px"
        getcustcode();
        RegisterYN1=0
    }
    lheight();
}


//检查密码行
function lcheckpwd(){
    var pwd=$(".input2").val();
    if(pwd==""){
        document.getElementById("checkpwd").style.paddingTop=10+"px"
        $("#checkpwd").html("<font color='#1e90ff'>登陆密码不能为空</font>")
        RegisterYN2=1;
    }else if(pwd.length<8){
        document.getElementById("checkpwd").style.paddingTop=10+"px"
        $("#checkpwd").html("<font color='#1e90ff'>登陆密码应该包含至少8个字符</font>")
        RegisterYN2=1;
    }else{
        document.getElementById("checkpwd").style.paddingTop=0+"px"
        $("#checkpwd").html("")
        RegisterYN2=0;
    }
    lheight();
}


//回主页图片改变
function lchange(num){
    if(num==1){
        document.getElementsByClassName("Registerhead_2_3").item(0).getElementsByTagName("img").item(0).src="../images/zhuye2.png"
    }else if(num==2){
        document.getElementsByClassName("Registerhead_2_3").item(0).getElementsByTagName("img").item(0).src="../images/zhuye1.png"
    }
}
var codes=0
function changecode(){
    codes++
    $(".Registerbody_2_1_3 img").attr("src","getcode.action?code="+codes)
}
function getcustcode(){
    var uemail=$(".input1").val()
    getcustcode1()
    $.ajax({
        type:"POST",
        url:"cust_getcustcode.action",
        data:{uemail:uemail},
        dataType:'JSON',
        success: function(data){
            if(data.code==1){
                $("#checkmail").html("<input type='hidden' id='bj' value='0'/>")
            }else{
                document.getElementById("checkmail").style.paddingBottom=10+"px"
                $("#checkmail").html("<font color='#1e90ff'>改邮箱已被注册<input type='hidden' id='bj' value='1'/></font>")
                lheight();
            }
        }
    })
    lheight();
}


//注册
function checkboxyn(){
    if(($(".Registerbody_2_2 input").get(0).checked.toString())=="false"){
        $("#checkboxyn").html("<font color='#1e90ff'>必须同意该条款才能使用本站提供的服务。</font>");
        RegisterYN3=1;
    }else{
        $("#checkboxyn").html("");
        RegisterYN3=0;
    }
    lcheckpwd();
    lheight();
    var RegisterYN=Number(RegisterYN1)+Number(RegisterYN2)+Number(RegisterYN3);
    var Registermail=$(".input1").val();
    var Registerpwd=$(".input2").val();
    var register=$("#register");
    var emial=register.find("[name='emial']").val();
    var pwd=register.find("[name='pwd']").val();
    //var Registercode=$(".input_1_2").val();

    if(RegisterYN==0){
            regts("处理中，请稍等~")
            $(".input1").val();
            $(".input2").val();
            $(".Registerbody_2_2 input").get(0).checked=false;
        $.ajax({
            type:"POST",
            url:"/api/user/register",
            data:{uname:emial,
                pwd:pwd
            },
            dataType:'JSON',
            success: function(data){
                window.location.href="/log";
                if(data.code==1){
                    regts("注册已完成")
                }
            }
        })

    }

    lheight();
}

//登录
    function CustLogin() {
        lcheckmail(); //检查邮箱
        lcheckpwd();//检查密码
        lheight();//高度适应
        var register = $("#logining");
        var dlemial = register.find("[name='dlemial']").val();
        var dlpwd = register.find("[name='dlpwd']").val();
        var LoginYN = RegisterYN1 + RegisterYN2
        if (LoginYN == 0) {
            $.ajax({
                type: "POST",
                url: "/api/user/login",
                data: {
                    uname: dlemial,
                    pwd: dlpwd
                },
                dataType: 'JSON',
                success: function (data) {
                    if (data.code == 1) {
                        location.href = "/index";
                    } else if (data.code == 2) {
                        regts("该账号未注册")
                        lheight();
                    } else {
                        regts("用户名或密码输入错误，请重新输入")
                        lheight();
                    }

                }
            })
        }
        lheight();
    }

    var forgetpwd1 = 1;
    var forgetpwd2 = 1;

    function lcheckmail1(val) {
        if (val == "") {
            document.getElementsByClassName("lpass").item(0).style.color = "#1e90ff"
            document.getElementById("checkmail").style.paddingTop = 10 + "px"
            $("#checkmail").html("<font color='#1e90ff'>邮箱地址不能为空</font>")
            forgetpwd1 = 1;
        } else if (regmail(val)) {
            document.getElementsByClassName("lpass").item(0).style.color = "#1e90ff"
            document.getElementById("checkmail").style.paddingTop = 10 + "px"
            $("#checkmail").html("<font color='#1e90ff'>邮箱地址不是有效的邮箱地址。</font>")
            forgetpwd1 = 1;
        } else {
            document.getElementsByClassName("lpass").item(0).style.color = "dodgerblue"
            document.getElementById("checkmail").style.paddingTop = 0 + "px"
            $("#checkmail").html("")
            forgetpwd1 = 0;
        }
        lheight();
    }

    function lcheckcode(val) {
        if (val == "") {
            document.getElementsByClassName("lpass").item(1).style.color = "#1e90ff"
            document.getElementById("checkpwd").style.paddingTop = 10 + "px"
            $("#checkpwd").html("<font color='#1e90ff'>验证码不能为空</font>")
            forgetpwd2 = 1;
        } else {
            $.ajax({
                type: "POST",
                url: "cust_codeYN.action",
                data: {code: val},
                dataType: "JSON",
                success: function (data) {
                    if (data.code == 1) {
                        document.getElementsByClassName("lpass").item(1).style.color = "dodgerblue"
                        document.getElementById("checkpwd").style.paddingTop = 0 + "px"
                        $("#checkpwd").html("")
                        forgetpwd2 = 0;
                        lheight();
                    } else if (data.code == 0) {
                        document.getElementsByClassName("lpass").item(1).style.color = "#1e90ff"
                        document.getElementById("checkpwd").style.paddingTop = 10 + "px"
                        $("#checkpwd").html("<font color='#1e90ff'>验证码不正确</font>")
                        forgetpwd2 = 1;
                        lheight();
                    }
                }
            })
        }
        lheight();
    }

    function forgetpwd() {
        lcheckmail1($(".Registerbody_2_1_2 input").val())
        lcheckcode($(".Registerbody_2_1_3 input").val())
        var forgetpwd = forgetpwd1 + forgetpwd2;
        if (forgetpwd == 0) {
            var uemail = $(".Registerbody_2_1_2 input").val();
            regts("处理中，请稍等。。。")
            $(".Registerbody_2_1_2 input").val("");
            $(".Registerbody_2_1_3 input").val("");
            $.ajax({
                type: "POST",
                url: "",
                data: {uemail: uemail},
                dataType: 'JSON',
                success: function (data) {
                    if (data.code == 1) {
                        regts("邮件已发送")
                    } else {
                        document.getElementsByClassName("lpass").item(0).style.color = "#1e90ff"
                        document.getElementById("checkmail").style.paddingTop = 10 + "px"
                        $("#checkmail").html("<font color='#1e90ff'>邮箱地址是无效的</font>")
                        forgetpwd1 = 1;
                        lheight();
                    }

                }
            })
        }
        lheight();
    }

    var hcp1 = 1;
    var hcp2 = 1;
    var changepwd1_1val = "";
//修改密码
    function changepwd1_1(val) {
        changepwd1_1val = val;
        if (val == "") {
            document.getElementsByClassName("lpass").item(0).style.color = "#1e90ff"
            document.getElementById("checkpwd").style.paddingTop = 10 + "px"
            $("#checkpwd").html("<font color='#1e90ff'>登陆密码不能为空</font>")
            hcp1 = 1;
        } else if (val.length < 8) {
            document.getElementsByClassName("lpass").item(0).style.color = "#1e90ff"
            document.getElementById("checkpwd").style.paddingTop = 10 + "px"
            $("#checkpwd").html("<font color='#1e90ff'>登陆密码应该包含至少8个字符</font>")
            hcp1 = 1;
        } else {
            document.getElementsByClassName("lpass").item(0).style.color = "dodgerblue"
            document.getElementById("checkpwd").style.paddingTop = 0 + "px"
            $("#checkpwd").html("")
            hcp1 = 0;
        }
        lheight();
    }
//重复2
    function changepwd1_2(val) {
        if (val == "") {
            document.getElementsByClassName("lpass").item(1).style.color = "#1e90ff"
            document.getElementById("checkpwd1").style.paddingTop = 10 + "px"
            $("#checkpwd1").html("<font color='#a94442'>重复密码不能为空</font>")
            hcp2 = 1;
        } else if (val.length < 8) {
            document.getElementsByClassName("lpass").item(1).style.color = "#1e90ff"
            document.getElementById("checkpwd1").style.paddingTop = 10 + "px"
            $("#checkpwd1").html("<font color='#1e90ff'>重复密码应该包含至少8个字符</font>")
            hcp2 = 1;
        } else {
            if (changepwd1_1val == val) {
                document.getElementsByClassName("lpass").item(1).style.color = "dodgerblue"
                document.getElementById("checkpwd1").style.paddingTop = 0 + "px"
                $("#checkpwd1").html("")
                hcp2 = 0
            } else {
                document.getElementsByClassName("lpass").item(1).style.color = "#1e90ff"
                document.getElementById("checkpwd1").style.paddingTop = 10 + "px"
                $("#checkpwd1").html("<font color='#1e90ff'>两次输入密码不同</font>")
                hcp2 = 1;
            }
        }
        lheight();
    }

    function changpwd1() {
        changepwd1_1($("#pwd1").val())
        changepwd1_2($("#pwd2").val())
        var chp = hcp1 + hcp2;
        uemail = GetQueryString("uemail");
        if (chp == 0) {
            var pwd = $("#pwd2").val();
            $.ajax({
                type: "POST",
                url: "",
                data: {upwd: pwd, uemail: uemail},
                dataType: 'JSON',
                success: function (data) {
                    if (data.code == 1) {
                        location.href = "Login.html?uemail=" + data.obj;
                    } else {
                        regts("密码修改失败")
                    }

                }
            })
        }
        lheight();
    }

    var getcustcodetime = null;

    function getcustcode1() {
        getcustcodetime = window.setInterval("getcustcode2()", 1000);
        $("#input_1_3").attr("disabled", "true");
        $("#input_1_3").attr("class", "input_1_3_1");
    }

    var getcustcodevalue = 10

    function getcustcode2() {
        if (getcustcodevalue == 0) {
            $("#input_1_3").attr("value", "重新发送");
            $("#input_1_3").removeAttr("disabled");
            $("#input_1_3").attr("class", "input_1_3");
            window.clearInterval(getcustcodetime)
            getcustcodetime = null;
            getcustcodevalue = 10;
            return;
        }
        $("#input_1_3").attr("value", "重新发送(" + getcustcodevalue + "s)");
        getcustcodevalue--;
}