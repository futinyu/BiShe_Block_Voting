var express = require('express');
var router = express.Router();
var rOwnObj=require('../public/lib/registerown');

router.get('/', function(req, res, next) {
    //请求需要获取电话，名字和地址
    var curraddr=req.cookies.loginAttr//用钱包账户对应的地址
    var myaccount=req.cookies.addr;
    var islogin=req.cookies.islogin;
    var Obj={};
    if(islogin==1){//用户已登录进入
        rOwnObj.rOwnContract=rOwnObj.registerown.at(curraddr);
        //找到个人用户信息
        rOwnObj.rOwnContract.getOwnerInfo({from:myaccount},function (err1,arr1) {
          if(!err1){
              Obj.username=arr1[0];
              Obj.phone=arr1[1];
              //获取账户余额
              rOwnObj.rOwnContract.getBalance({from:myaccount},function (err2,banlance) {
                   Obj.banlance=banlance;
                   res.render('index',{'Obj':Obj})
              })
          }
          else {
              console.log(err)
          }
        })
    }
    else res.render('index')
    //res.render('index', { username: username });
});


module.exports = router;
