var express = require('express');
var router = express.Router();
var rOwnObj=require('../public/lib/registerown');
var titleownObj=require('../public/lib/titleown');
router.get('/',function (req,res,next) {
    //详情页后台引导数据
    // var titleownaddr=req.query.addr;
    // titleownObj.titleownContract=titleownObj.titleown.at(titleownaddr);//必须要走的一步，到哪一个地址就绑定哪一个合约
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
                    res.render('detail',{'Obj':Obj})
                })
            }
            else {
                console.log(err)
            }
        })
    }
    else res.render('detail')
});
//post方法
router.post('/',function (req,res,next) {
    //title用来做参数，loginAddr个人合约地址，votename记录的名称，mistAddr前端地址，titleAddr标题地址。
    var txhash={}
    var title=req.body.title;
    var loginAddr=req.body.loginAddr;
    var votename=req.body.votename;
    var mistAddr=req.body.mistAddr;
    var titleAddr=req.body.titleAddr;
    var ids=Number(req.body.Ids);
    var infor={"msg":null,"jude":null,"err":null}//ajax返回的数据
    if(title==""||loginAddr==""||votename==""||mistAddr==""||titleAddr=="")
    {
        infor.jude=false;
        infor.err="数据不对，请重新调整";
        res.send(infor);
    }
    //合约实例化
    titleownObj.titleOwnContract=titleownObj.titleown.at(titleAddr);//实例化标题合约
    rOwnObj.rOwnContract=rOwnObj.registerown.at(loginAddr);
    //先进行金额计算
    rOwnObj.rOwnContract.updateBalance(-50,{from:mistAddr},function (err1,txhash1) {
        if(!err1)
        {
            txhash.TxUpBalance=txhash1;
            //对标题合约进行处理
            titleownObj.titleOwnContract.ToBallet(ids,mistAddr,{from:mistAddr,gas:90000000},function (err2,txhash2) {
             if(!err2){
                 txhash.TxBallet=txhash2;
                //对个人记录进行处理
                 rOwnObj.rOwnContract.Ballet(titleAddr,title,votename,{from:mistAddr,gas:900000000},function (err3,txhash3) {
                     if(!err3){
                         txhash.TxRecord=txhash3;
                         infor.msg="成功投票";
                         infor.jude=true;
                         infor.txHash=txhash;
                         res.send(infor)
                     }
                     else {
                         infor.err="记录失败";
                         console.log(err3);
                         infor.jude=false;
                         res.send(infor)
                     }
                 })
             }
             else
             {
                 console.log(err2);
                 infor.err="投票失败";
                 infor.jude=false;
                 res.send(infor)
             }
            })
        }
        else{
            infor.err="金额不足"
            infor.jude=false
            res.send(infor)
        }
    })
    //res.send(infor)
});

module.exports=router;