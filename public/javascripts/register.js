var registeraddr=' 0x77dd5Cdc8b9C45dB70C9c43841318165de532F2b\n';
let registerContract;
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
    $.getJSON('./contracts/RegisterList.json', function(data) {
        registerContract=web3.eth.contract(data.abi).at(registeraddr)
    })
}

//----------------------------------------------以下是对数据进行操作---------------------------------
//电话验证
function fun1(){
    // var phone=$(".mobile").val();
    // var parter = /^1[3578]\d{9}$/;
    // if(phone.length!=0){
    //     if(!parter.test(phone)){
    //         alert('电话格式错误！');
    //
    //     }
    // }

}
//密码验证
function fun2() {
    var psd=$(".psd").val();
    if(psd.length<5)
    {alert("密码长度不能小于6")}
    return false;
}
//二次密码
function fun3() {
     var psd=$(".psd").val();
     var psd1=$(".newpsd").val();

     if(psd!=psd1){ alert("两次密码不一样")}
}
//总验证
function RegisterClick(){
    var user=$(".user").val();
    var phone=$(".mobile").val();
    var psd=$(".psd").val();
    var psd1=$(".newpsd").val();
    $(".myaccount").val(web3.eth.accounts[0])
    if(user.length==0|phone.length==0|psd.length==0|psd1.length==0)
    {
        alert("注册不能为空，请检查！")
        return false;
    }
}
$(function() {
    $(window).load(function() {
        init();
    });
});