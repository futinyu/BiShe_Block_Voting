var express = require('express');
var router = express.Router();
var rOwnObj=require('../public/lib/registerown');
let admin="0xdc57d330f22e5232234d551710516ef25d9bd53e";
router.get('/',function (req,res,next) {
    var islogin=Number(req.cookies.islogin);
    var mistAddr=req.cookies.addr;
    var name=req.query.name;
    Obj={};
    if(admin==mistAddr)
    {
        Obj.jude=true
    }
    else Obj.jude=false;
    if(islogin!=1)
    {
        res.render('login')
    }


    Obj.name=name;
    res.render('person',{"Obj":Obj});
});
router.post('/',function (req,res,next) {
         var name1=req.body.name1;
         var phone1=req.body.phone1;
         var myaccout=req.body.myaccount;
         var myaddr=req.cookies.loginAttr;
         var Obj={}
        rOwnObj.rOwnContract=rOwnObj.registerown.at(myaddr);
        rOwnObj.rOwnContract.changeOwnerInfo(name1,20,phone1,{from:myaccout,gas:90000000},function (err1,txhash) {
              if(!err1){
                  Obj.jude=true
                  Obj.msg="修改成功";
                  Obj.txhasg=txhash;
                  res.send(Obj)
              }
              else {
                  Obj.jude=false;
                  Obj.err="修改失败";
                  res.send(Obj);
              }
        })

})
module.exports=router;