let registeown;
let registeownContract;
let adminAddr="0xdc57d330f22e5232234d551710516ef25d9bd53e";
async  function init() {
    var web3Provider;
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            // 请求用户授权
            await window.ethereum.enable();
        } catch (error) {
            // 用户不授权时
            console.error("User denied account access")
        }
    } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
        web3Provider = window.web3.currentProvider;
    } else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(web3Provider);
    initContract();
}
async function initContract() {
    $.getJSON('./contracts/RegisterOwner.json', function(data) {
        registeownContract=web3.eth.contract(data.abi).at(registeown);
        getMyinfo()
    })
}
async function getMyinfo() {
    registeownContract.getOwnerInfo({from:web3.eth.accounts[0]},function (err,res) {
       if(!err){
           $(".name").text(res[0]);
           $(".mobiel").text(res[1]);
           registeownContract.getBalance({from:web3.eth.accounts[0]},function (err1,res1){
               if(!err1){
               $(".balance").text(res1.c[0]+" FTY");
               registeownContract.getaddtime({from:web3.eth.accounts[0]},function (err2,res2){
                 if(!err2)
                 {
                     var stamp=StampTotime(res2.c[0]);
                     $(".regist-time").text(stamp);
                 }
               })
               }
           })
       }

    })
}

//-------------------------------------------点击事件-------------------\
async function ApplyBalance() {
    var jude=confirm("即将申请2000FTY代币，是否继续?");
    if(jude) {
        registeownContract.updateBalance(2000, {from: web3.eth.accounts[0], gas: 90000000}, function (err, txhash) {
            if (!err) {
                alert("申请成功，本次交易申请的hash为：" + txhash);
                location.href='/myinfo.html';
            }
            else {
                alert("申请失败")
            }
        })
    }
}

//--------------------------------------------
function StampTotime(timestamp){
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}



//获取cookies
function getCookie(cookieName){

    var strCookie=document.cookie;
    var arrCookie=strCookie.split(';');
    for(var i=0;i<arrCookie.length;i++)
    {
        var arr=arrCookie[i].split("=");
        arr[0]=arr[0].replace(/^\s*/,"");
        if(cookieName==arr[0])
        {return arr[1]}
    }
    return "";
}

$(function() {
    $(window).load(function() {
        registeown=getCookie("loginAttr");
        init();
    });
});