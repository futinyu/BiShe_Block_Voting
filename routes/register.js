var express = require('express');
var router = express.Router();
let admin='0xdC57d330F22E5232234d551710516Ef25d9BD53e';
//合约和web3的对象都在里面
var registerObj=require('../public/lib/register');
router.get('/',function (req,res,next) {
          res.render('register')
});
router.post('/',function (req,res,next) {
    var user=req.body.user;
    var phone=req.body.mobile;
    var psd=req.body.psd;
    var account=req.body.myaccount;
    //注册账户
    registerObj.registerContract.createRegist(user,"20",psd,phone,{from:account,gas:90000000},function (error,result) {
          if(!error){
              console.log('res'+result)
              res.redirect('login')
          }
          else {
              console.log('err:'+error)
              res.render('register')
              //如果错误直接使用redirect
             }
    })
    //res.redirect('login') //正式使用时去掉
    
    //返回个人信息

})
module.exports=router;