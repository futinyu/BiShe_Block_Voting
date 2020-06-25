var Web3=require('web3');
var registeraddr='0x77dd5Cdc8b9C45dB70C9c43841318165de532F2b';
let registerContract;
let web3;
async function init(){
    web3=new Web3 (new Web3.providers.HttpProvider('http://localhost:8545'));
    var abi=  [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "creatorOwnerMap",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "registerList",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_age",
                    "type": "string"
                },
                {
                    "name": "_password",
                    "type": "string"
                },
                {
                    "name": "_phone",
                    "type": "string"
                }
            ],
            "name": "createRegist",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getinformation",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "unknowvalue",
                    "type": "string"
                },
                {
                    "name": "pwd",
                    "type": "string"
                }
            ],
            "name": "verifyPwd",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCurrAddr",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    registerContract=web3.eth.contract(abi).at(registeraddr)
}
init();
module.exports={registerContract,web3};
