var titleaddr='0xFbee180aF7cFEc5a2F3436F7E70F4f777ab9e318';
let titleContract;
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
    AddDiv()
    initContract();
}
async function initContract() {
    $.getJSON('./contracts/ManageTitleList.json', function(data) {
        titleContract=web3.eth.contract(data.abi).at(titleaddr);
        getaddrList()
    })
}
//获取地址数组
async function getaddrList(){
    var account=web3.eth.accounts[0];
    titleContract.getTitleList({from:account},function (err,addrs) {
           if(!err){
               console.log(addrs)
               for(var i=1;i<addrs.length+1;i++)
               {
                   getDetailtitle(addrs[i-1],i)

               }
           }
           else console.log(err);
    })
}
//获取详细标题和相关内容
async function getDetailtitle(addr,i){
    console.log(1)
    titleContract.GetTitle(addr,{from:web3.eth.accounts[0]},function (err,res) {
        //待修改
        if(!err){
            //计算时间
              var arrivetime=StampTotime(res[1].c[0]);
              if(res[1].c[0]*1000>(new Date()).getTime()){
              $(".newvote").append('<div class="title-list" number='+i+'>\n' +
                  '<div class="title-href">'+i+'、<a href="/detail?addr='+addr+'" >'+ res[0]+'</a></div>\n' +
                  ' <div class="title-infor">\n' +
                  '<span class="vote-time">截止时间：<span style="color: #9370DB">'+arrivetime+'<span> </span>\n' +
                  '<span class="vote-num" >投票人数：<img class="vote-img" src="./images/read.jpg" alt="投票人数">'+res[2].c[0]+'</span>\n' +
                  ' </div>\n' +
                  '</div><p class="statuok" style="display: none"></p>')
              }
              else {
                  $(".newvote").append('<div class="title-list" number='+i+'>\n' +
                      '<div class="title-href">'+i+'、<a href="/detail?addr='+addr+'">'+ res[0]+'</a>' +
                      '</div><img src="./images/已过期.jpg" alt="过期" class="effect" style="width80px;height:80px;margin: 40px 0 0 650px;">\n' +
                      ' <div class="title-infor">\n' +
                      '<span class="vote-time">截止时间：<span style="color: #9370DB">'+arrivetime+'<span> </span>\n' +
                      '<span class="vote-num" >投票人数：<img class="vote-img" src="./images/read.jpg" alt="投票人数">'+res[2].c[0]+'</span>\n' +
                      ' </div>\n' +
                      '</div><p class="statuerr" style="display: none"></p>')
              }
          }
    })
}
//时间计算
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
//添加标题按钮
function AddDiv(){
        var login=Number(getCookie('islogin'));
        //账户要相同
        var name1=$(".a-name").text();
        var newurl="/person?name="+name1;
        console.log('name1'+name1)
        if(login==1&&web3.eth.accounts[0]==adminAddr)
        {
            $(".Add").css('display','block');
            $(".Add").append("<a href="+newurl+"><img src=\"./images/添加图标.png\" title='添加标题' alt=\"添加标题\" class=\"addtitle\"></a>")}
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
        init();
    });
});