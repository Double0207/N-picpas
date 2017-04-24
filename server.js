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

//加载模板引擎
var swig=require("swig");

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

//配置模板引擎
//配置文件后缀名，以及你的模板引擎渲染文件的方法
app.engine("html",swig.renderFile);  //1.后缀名    处理模板引擎渲染的方法
//设置模板引擎所放的目录
app.set("views","./view");   //第一个参数不可改变    第二个是目录
//注册所使用的模板引擎
app.set("view engine","html");  //第一个参数不可改变   第二个为app.engine这个方法所定义的东西 与第一个相同
//因为我们的模板引擎是默认开启了缓存的，因此我们开发的时候，可以去掉缓存，但是上线了就要开启
swig.setDefaults({cache:false});

//考虑到如果所有的业务逻辑都写得这个server.js里面，那么将过于庞大，因此我们分模块开发
//定义路由的路径
//app.use("/admin",require("./routers/admin"));  //默认都是引入js文件因此不要加后缀名
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));    //直接进入主模块




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