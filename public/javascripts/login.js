var registeraddr='0x77dd5Cdc8b9C45dB70C9c43841318165de532F2b';
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
//---------------------------------------------分界线--------------------------------
function Login(){
        var myaccount=web3.eth.accounts[0];
        var number=$(".number").val();
        var psd=$(".psd").val();
        if(number.length<1){
            alert('请填写账户');
            return
        }
        if(psd.length<1)
        {
            alert('请填写密码');
            return
        }
        if(psd.length<6){
            alert('密码不正确');
            return
        }
        $.ajax({
        url:'login',
        type:'post',
        data:{number:number,myaccount:myaccount,psd:psd},
        success:function(res) {
            if(res.jude){//判断后台是否成功
                alert(res.msg);
                location.href='/index'//跳转页面
            }
            else{
                alert(res.err)
                location.href=location.href;
            }
        }
    })
}

$(function() {
    $(window).load(function() {
        init();
    });
});
