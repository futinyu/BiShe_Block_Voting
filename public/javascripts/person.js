var titleaddr='0xFbee180aF7cFEc5a2F3436F7E70F4f777ab9e318';
let titleContract;
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
    $.getJSON('./contracts/ManageTitleList.json', function(data) {
        titleContract=web3.eth.contract(data.abi).at(titleaddr);
    })
}

async function ChangeInfo(){
    var name1=$(".name1").val();
    var phone1=$(".phone1").val();
    $.ajax({
        url:'person',
        type:'post',
        data:{name1:name1,myaccount:web3.eth.accounts[0],phone1:phone1},
        success:function(res) {
            if(res.jude){//判断后台是否成功
                alert(res.msg);
                alert("交易的hash为："+res.txhash)
            }
            else{
                alert(res.err)
                location.href=location.href;
            }
        }
    })
    }
//---------------------------------其他方法------------------------
async function createTitle(){
       var title1= $(".votetitle").val()
       var day=Number($(".day").val());
       var hour=Number($(".hour").val())
       var minute=Number($(".minute").val())
       if(day<0||hour<0||minute<0)
       {
           alert("输入不能为负数");
           return
       }
       if(day==0&&hour==0&&minute==0)
       {alert("截止时间不能设置为0")
       return }
       var alltime=Number(day*86400+hour*3600+minute*60)
       if(title1=="")
       {alert("标题不能为空")
       return }
       titleContract.createTitle(title1,alltime,{from:web3.eth.accounts[0],gas:90000000},function (err,res) {
           if(!err)
           {
               alert("添加成功")
               window.location.href="/addvote";
           }
           else{
               alert("执行失败")
           }
       })


}
//修改信息触发事件 ,找到以后在点击
$(".change").click(function(){ $(".changeWord").css('display','block')})


$(function() {
    $(window).load(function() {
        init();
    });
});