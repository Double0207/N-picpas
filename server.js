/**
 * Created by Administrator on 2017/2/25.
 */
var express=require("express");
var cookieParser=require("cookie-parser");
//下载插件，并且加载
var session=require("express-session");
var bodyParser=require("body-parser");
var mysql=require("mysql");
var multer=require("multer");
var fs=require("fs");

//创建web程序入口
var app=express();

//配置
app.use(bodyParser.urlencoded({extended:false}));  //配置bodyparser
app.use(cookieParser());
var upload=multer({dest:"./photo"});   //指定文件上传路径

//第二步，session的配置
app.use(session({
    secret:'keyboard cat',   //session私密id
    resave:true,        //每次请求，都会重新去设置session cookie
    saveUninitialized:true,   //指无论有没有session  每次请求都会自动添加一个
    cookie:{secure:false}    //https协议    http
}));

var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"picpas",
    user:"root",
    password:"aaaa"
});

//来监听所有关于back/show.html的请求，不管是get还是post
app.all("/back/*",function (req,res,next) {
    console.log(req.session.uanme);

    //app.all(xxx)把监听拦截了,没错，但是我们处理完这个请求
    if(req.session.uname == undefined){
        res.send("<script>alert('请先登录');location.href='../login.html'</script>");
    }else{
        //还得继续往下运行
        next();
    }
});






//静态资源管理
app.get("/*",function (req,res) {
    res.sendFile(__dirname + req.url);
});

app.listen(80,function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("服务器启动成功");
    }
});