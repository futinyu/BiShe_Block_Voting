let titleOwnaddr;
let titleOwnContract;
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
//获取前端地址的数据
async function initContract() {
    $.getJSON('./contracts/TitleOwner.json', function(data) {
        titleOwnContract=web3.eth.contract(data.abi).at(titleOwnaddr);
        getTitle();
    })
}

//获取标题
async function getTitle(){
    titleOwnContract.GetDetailTitle({from:web3.eth.accounts[0]},function (err,res) {
        if(!err){
            var mydata=Calcutime(res[1].c[0]);
            $(".clock-s").text(mydata.day+"日"+mydata.hour+"小时"+mydata.minute+"分钟");
            $(".read-s").text(res[2].c[0]);
            $(".entry-title").text(res[0]);
            $(".introduce").attr('display','block');
            $(".introduce").text(res[3])
            var isDele=true

            if(mydata.minute==0&&mydata.hour==0&&mydata.hour==0)//时间到期禁止投票
            {
                isDele=false
                $(".clearfix").append('<img src="./images/已过期.jpg" alt="失效" class="shixiao">')
            }
            AddDiv()
                getPartNumber(isDele);//获取参选人员长度
        }
        else{
            alert('加载错误');
            window.location.href='/index';
        }
    })
}
//获取参选人员
async function getPartMan(i,isDele) {
      titleOwnContract.readPartMans(i,function (err,res) {
        if(!err){
            console.log(res)
            if(isDele==false){
            $(".member-ul").append(
                '<li><div class="member-info">\n' +
                '                        <span class="mem-name" value="'+res[0]+'">姓名：'+res[0]+'</span>\n' +
                '                        <span class="mem-intro" value="'+res[1]+'">介绍：'+res[1]+'</span>\n' +
                '                        <a href="javascript:void(0)" onclick="ReadAddr('+i+')">' +
                '                        <span class="mem-ticket">当前票数:'+res[2].c[0]+'</span></a>\n' +
                '                        <input type="submit" value="已过期" disabled="disabled" /> \n' +
                '                    </div></li>'
            )
            }
            else{
                $(".member-ul").append(
                    '<li><div class="member-info" >\n' +
                    '                        <span class="mem-name" value="'+res[0]+'"id="name'+i+'">姓名：'+res[0]+'</span>\n' +
                    '                        <span class="mem-intro" value="'+res[1]+'">介绍：'+res[1]+'</span>\n' +
                    '                        <a href="javascript:void(0);" onclick="ReadAddr('+i+')"><span class="mem-ticket">当前票数:'+res[2].c[0]+'</span></a>\n' +
                    '                        <input type="submit" value="投票" onclick="VoteSomeOne('+i+')" /> \n' +
                    '                    </div></li>'
                )
            }
        }
      })
}
//获取长度，并在回调里面直接使用
async function getPartNumber(isDele) {
   titleOwnContract.GetPartLen(function (err,res) {
          if(!err){
             var len= res.c[0];
             for(var i=0;i<len;i++){
                 getPartMan(i,isDele);
             }
          }
          else {alert('出现错误！')}
   })
}

//-----------------------button事件-----------------------------、
//点击投票事件
async function VoteSomeOne(ids){

    var islogin=getCookie('islogin');
    var loginaddr=getCookie('addr');
    if(islogin==1){
        var voteaddr=web3.eth.accounts[0];
        if(voteaddr!=loginaddr)
        {
            alert("当前账户不匹配，请重新登录");
            location.href='/loin';
        }

        titleOwnContract.Havevoted(function (err,res) {
        if(!err){
            //判断记录是否存在
            for(var i=0;i<res.length;i++)
            {
                if(voteaddr==res[i])
                {
                    alert('用户已投过票，禁止投票');
                    //把所有的标签置为disabled
                    $("input").attr("value","已投票");
                    $("input").attr("disabled","disabled");
                    return
                }

            }
            var r=confirm("投票将扣除50枚FTY代币，是否继续");
            if(r==false) return;
            //金额计算
            var  money=Number($('.balance').attr("value"));
            if(money<50)
            {
                alert("代币不足，请找管理员充值")
                return;
            }
            //不存在继续{标题，标题地址，姓名，前端账户，合约账户}
            var loginAddr=getCookie('loginAttr');
            var myname=document.getElementsByClassName("mem-name")[ids].attributes.value.value;
            var title=$(".entry-title").text()
            $.ajax({
                url:'detail',
                type:'post',
                data:{loginAddr:loginAddr,votename:myname,title:title,mistAddr:voteaddr,titleAddr:titleOwnaddr,Ids:ids},
                success:function(res) {
                    if(res.jude){//判断后台是否成功
                        alert(res.msg);
                        alert("扣费交易的txhash值"+res.txHash.TxUpBalance+"\n"+"投票的txhash为："+res.txHash.TxBallet+"\n"
                        +"记录的txhash值为："+res.txHash.TxRecord);
                        $("input").attr("disabled","disabled");
                        $("input")[ids].value="已投票";
                        location.href=location.href;//跳转页面
                    }
                    else{
                        alert(res.err);
                        location.href=location.href;
                    }
                }
            })
        }
        else {console.log(err.message)}
    })
    }
    //没有登录就进行登录
    else{
        alert('请登录用户');
        location.href="/login";
    }
}
//跳转到新页面查看
async function ReadAddr(ids) {
   var url="/read?ids="+ids+"&"+"addr="+titleOwnaddr ;
   window.open(url);
}
//管理员添加候选人
async function addPartMan() {
     $("#cover").show();
     $("#modal").show();
}
//确认和返回
async function  MakeSure() {
    var partname=$("#modal input").val()
    var introduce=$("#modal textarea").val()
    if(partname==""|| introduce==""){
        alert("输入值不能为空");
        return
    }
    $("#modal").hide()
    $("#cover").hide()
    titleOwnContract.createNewMan(partname,introduce,{from:web3.eth.accounts[0],gas:90000000},function (err3,res3) {
      if(!err3){
          alert("交易txhash:"+res3)
          location.href=location.href;
      }
      else
      {    console.log(err3)
          alert("添加失败")}
    })
}
async function Cancel() {
    $("#modal").hide();
    $("#cover").hide();
}
//---------------------------------分割线----------------------------------------
//添加管理员标签
function AddDiv() {
  var shixiao= $(".shixiao").attr("alt");
  var login=Number(getCookie('islogin'));
  if(typeof(shixiao)=="undefined"&&login==1)
  {
       console.log(web3.eth.accounts[0],adminAddr)
      if(web3.eth.accounts[0]==adminAddr)
      {
          $(".clearfix").append("<a href='javascript:void(0)' onclick='addPartMan()'><img src=\"./images/添加图标.png\" alt=\"添加\" class=\"addtitle\" ></a>")
      }
  }
}
//获取url上的请求值
function getParam(paramName){
    var seach=window.location.search.split('?')[1];

    var paramArray=seach.split('&');
    var len = paramArray.length;
    var paramObj = {};//json对象
    var arr = [];//数组对象
    for(var i=0;i<len;i++){
        arr=paramArray[i].split('=');
        paramObj[arr[0]]=arr[1]
    }
    //获取内容
    return paramObj[paramName];
}
//时间计算
function Calcutime(timestamp){
    timestamp=timestamp*1000;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var SurData=(timestamp-(new Date()).getTime());
    var mydata={};
    var stampdata=Math.floor(SurData/1000);
    if(stampdata>60){
       //先算天
        mydata.day=Math.floor(stampdata/86400);
        var SurDay=stampdata%86400;
        mydata.hour=Math.floor(SurDay/3600);
        var SurHour=SurDay%3600;
        mydata.minute=Math.floor(SurHour/60)

    }
    else
        mydata={day:0,hour:0,minute:0}
    return mydata;

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
        titleOwnaddr=getParam('addr');
        init();
    });
});