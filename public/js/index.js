$(function () {
    var $loginBox=$("#loginBox");
    var $resBox=$("#registerBox");
    var $userBox=$("#userInfo");

    $loginBox.find("a.colMint").on("click",function () {
        $loginBox.hide();
        $resBox.show();
    });

    $resBox.find("a.colMint").on("click",function () {
        $resBox.hide();
        $loginBox.show();
    });

    //注册
    $resBox.find("button").on("click",function () {
        var uname=$resBox.find("[name='username']").val();
        var pwd=$resBox.find("[name='password']").val();
        var repwd=$resBox.find("[name='repassword']").val();

        if(uname==""|| uname==null || pwd=="" || pwd==null || repwd==""||repwd==null){
            alert("用户名或者密码不能为空");
            return;
        }

        if(pwd!==repwd){
            alert("前后输入密码不一致，请重新输入");
            return;
        }
        pwd=md5(pwd);
        $.ajax({
            type:"post",
            url:"/api/user/register",
            data:{
                uname:uname,
                pwd:pwd
            },
            dataType:"json",
            success:function (data) {
                if(data.code!=2){
                    alert(data.msg);
                }else{
                    $resBox.find('.colWarning').html(data.msg);
                    //注册成功
                    setTimeout(function () {
                        $resBox.find("[name='username']").val("");
                        $resBox.find("[name='password']").val("");
                        $resBox.find("[name='repassword']").val("");
                        $resBox.hide();
                        $loginBox.show();
                    },100000);
                }
            }
        });
    });

    //登录
    $loginBox.find('button').on('click',function () {
        var uname=$loginBox.find('[name="username"]').val();
        var pwd=$loginBox.find('[name="password"]').val();
        if(uname==""|| uname==null || pwd=="" || pwd==null){
            alert("用户名或者密码不能为空");
            return;
        }
        pwd=md5(pwd);
        //通过ajax提交请求
        $.ajax({
            type:"post",
            url:"/api/user/login",
            data:{
                username:uname,
                password:pwd
            },
            dataType:'json',
            success:function (result) {

                $loginBox.find('.colWarning').html(result.msg);

                if(result.code==2){
                    // //登录成功
                    // $loginBox.hide();
                    // $userBox.show();
                    //
                    // //判断判断是管理员还是普通用户登录
                    // if(result.info.isAdmin==0){  //普通用户
                    //     $userBox.find("p.userName span").html(result.info.uname);
                    //     $userBox.find("p.adminInfo").hide();
                    // }else if(result.info.isAdmin==1){  //管理员
                    //     $userBox.find("p.userName span").html(result.info.uname);
                    //     $userBox.find("p.adminInfo").show();
                    // }
                    window.location.reload();
                }
            }
        })
    });
    //退出
    $('#logout').on('click',function () {
        $.ajax({
            url:'/api/user/logout',
            success:function (result){
                if(!result.code){
                    window.location.reload();
                }
            }
        });
    })
});




//图片轮换
var timer;//定时器
var index=0;

function show(id){
    if(Number(id)){
        //清除定时器
        clearInterval(timer);
        index=id;

    }else{
        //网页加载之后就执行的
        //判断index
        index=index%5+1;

    }
    //设置图片
    document.getElementById("pic").setAttribute("src","../images/pic_"+index+".jpg");
}

show();
timer=window.setInterval("show()",3000);

function start(){
    timer=window.setInterval("show()",3000);
}






