/**
 * Created by Administrator on 2017/3/4.
 */

/**
 * Created by Administrator on 2017/3/4.
 */
//路由操作
var express=require("express");
var mysql=require("mysql");  //数据库模块
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"picpas",
    user:"root",
    password:"aaaa"
});

//1.加载路由
var router=express.Router();

var resData;
//定义一下统一返回的json格式
router.use(function (req,res,next) {
    resData={
        code:-1,
        msg:""
    };
    next();
});

//注册
router.post("/user/register",function (req,res) {
    //获取传过来的参数
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    pool.getConnection(function (err,conn) {
        conn.query("select * from user where uname=?",[uname],function (err,result) {
            //conn.release();
            if(err){
                resData.code=0;
                resData.msg="网络连接失败，请稍后重试";
                res.json(resData);
            }else if(result.length>0){
                resData.code=1;
                resData.msg="用户名已经存在，请重新注册";
                res.json(resData);
            }else{
                //可以注册
                conn.query("insert into user values(null,?,?,0)",[uname,pwd],function (err,resu) {
                    if(err){
                        resData.code=0;
                        resData.msg="网络连接失败，请稍后重试1";
                        res.json(resData);
                    }else{
                        resData.code=2;
                        resData.msg="注册成功";
                        res.json(resData);
                    }
                });
            }
        });
    })
});

//登录
router.post("/user/login",function (req,res,next) {
    //获取传过来的参数
    var uname=req.body.username;
    var pwd=req.body.password;
    pool.getConnection(function (err,conn) {
        if(err){
            resData.code=0;
            resData.message="网络连接失败，请稍后重试";
            res.json(resData);   //服务器端要求返回json，因此我们返回json数据格式
        }else {
            conn.query("select * from user where uname=? and pwd=?", [uname, pwd], function (err, result) {
                conn.release();
                if (err) {
                    resData.code = 0;
                    resData.message = "网络连接失败，请稍后重试";
                    res.json(resData);
                } else if (result.length <= 0) {
                    resData.code = 1;
                    resData.message = "用户密码错误，请重新登陆";
                    res.json(resData);
                } else {
                    resData.code = 2;
                    resData.message = "登录成功";
                    resData.info = result[0];  //传输到前台，好获取用户名

                    req.session.user = {
                        _id: result[0].uid,
                        uname: result[0].uname,
                        isAdmin: result[0].isAdmin
                    };   //存session
                    res.json(resData);
                }
            })
        }
    });
});



//2.把这个路由的文件和主模块连接起来
module.exports=router;


