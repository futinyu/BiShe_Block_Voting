var express = require('express');
var router = express.Router();
var registerObj=require('../public/lib/register');
/* GET home page. */
router.get('/', function(req, res, next) {
    //登录的时候需要清除cookie
    res.clearCookie('islogin');
    res.clearCookie('addr');
    res.clearCookie('loginAttr');
    res.render('login');
});
router.post('/',function (req,res,next) {
    var number=req.body.number;
    var psd=req.body.psd;
    var myaccount=req.body.myaccount;
    var infor={"msg":null,"jude":null,"err":null}//ajax返回的数据
    registerObj.registerContract.verifyPwd(number,psd,{from:myaccount,gas:900000},function (error,result) {
        if(result){
            infor.jude=true;
            infor.msg="登录成功"
            infor.err=null;
            //console.log(infor);
            res.cookie("islogin",'1',{maxAge:900000})
            res.cookie("addr",myaccount,{maxAge:900000}) //获取当前账户
            //res.send(infor);//发送数据到前台
            registerObj.registerContract.getinformation({from:myaccount},function (err1,result1) {
             if(!err1){
                registerObj.registerContract.getCurrAddr({from:myaccount},function (err1,curraddr) {
                 if(!err1){
                     res.cookie("loginAttr",curraddr,{maxAge:900000})//登录的地址
                     res.send(infor);
                 }
                 else { infor.err="内部错误";
                     infor.jude=false;
                     infor.msg=null;
                     res.send(infor);}
                })
             }
             else {
                 infor.err="内部错误";
                 infor.jude=false;
                 infor.msg=null;
                 res.send(err1);
             }
            })
        }
        else {
            infor.err="请检查账户在重试";
            infor.jude=false;
            infor.msg=null;
            console.log(error)
            res.send(infor);
        }
    })

    //暂时用下面这个
    // res.send(infor);
})
module.exports = router;
