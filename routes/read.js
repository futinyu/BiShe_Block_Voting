var express = require('express');
var router = express.Router();
var titleownObj=require('../public/lib/titleown');
router.get('/',function (req,res,next) {
        var ids=Number(req.query.ids);
        var titleaddr=req.query.addr;
        var Obj={};

        titleownObj.titleOwnContract=titleownObj.titleown.at(titleaddr)
        titleownObj.titleOwnContract.readPartMans(ids,function (err1,res1) {
         if(!err1){
             console.log(res1);
              Obj.name=res1[0];
              Obj.introduce=res1[1];

              Obj.addrArry=res1[3];
              console.log(Obj)
              res.render('read',{"Obj":Obj})
         }
         else {

         }
        })
})
module.exports=router;