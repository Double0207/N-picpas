
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

router.get("/",function (req,res,next) {
    console.log("3333");
});

//2.把这个路由的文件和主模块连接起来
module.exports=router;
