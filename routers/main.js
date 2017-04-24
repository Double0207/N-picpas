
/**
 * Created by Administrator on 2017/3/4.
 */
//路由操作
var express=require("express");
var mysql=require("mysql");
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"picpas",
    user:"root",
    password:"aaaa"
});

//1.加载路由
var router=express.Router();

router.get("/reg",function (req,res) {
    //console.log(req.session.user);
    //使用模板引擎去渲染页面两个参数：  第一个参数模板的路径    第二个参数：分配给模板使用的数据
            res.render("main/Register", {
                userInfo: req.session.user
            });
});

router.get("/log",function (req,res) {
    //console.log(req.session.user);
    //使用模板引擎去渲染页面两个参数：  第一个参数模板的路径    第二个参数：分配给模板使用的数据
    res.render("main/Login", {
        userInfo: req.session.user
    });
});
router.get("/index",function (req,res) {
    //console.log(req.session.user);
    //使用模板引擎去渲染页面两个参数：  第一个参数模板的路径    第二个参数：分配给模板使用的数据
    res.render("main/index", {
        userInfo: req.session.user
    });
});


//2.把这个路由的文件和主模块连接起来
module.exports=router;