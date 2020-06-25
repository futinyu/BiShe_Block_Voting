var Web3=require('web3');
let registerown;
let web3;
async function init(){
    web3=new Web3 (new Web3.providers.HttpProvider('http://localhost:8545'));
    var abi=[
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "records",
            "outputs": [
                {
                    "name": "title",
                    "type": "string"
                },
                {
                    "name": "currdate",
                    "type": "uint256"
                },
                {
                    "name": "currentaddr",
                    "type": "address"
                },
                {
                    "name": "selectname",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_regisaddr",
                    "type": "address"
                },
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
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_pwd",
                    "type": "string"
                }
            ],
            "name": "rightPwd",
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
            "inputs": [
                {
                    "name": "_username",
                    "type": "string"
                }
            ],
            "name": "rightUseName",
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
            "inputs": [
                {
                    "name": "_phone",
                    "type": "string"
                }
            ],
            "name": "rightPhone",
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
            "name": "getBalance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint64"
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
                    "name": "increment",
                    "type": "int256"
                }
            ],
            "name": "updateBalance",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
                    "name": "_phone",
                    "type": "string"
                }
            ],
            "name": "changeOwnerInfo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getOwnerInfo",
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
                    "name": "i",
                    "type": "uint256"
                }
            ],
            "name": "getrewords",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "address"
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
                    "name": "_titleaddr",
                    "type": "address"
                }
            ],
            "name": "istovote",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_titleaddr",
                    "type": "address"
                },
                {
                    "name": "_title",
                    "type": "string"
                },
                {
                    "name": "selectname",
                    "type": "string"
                }
            ],
            "name": "Ballet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getReLen",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getaddtime",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    registerown=web3.eth.contract(abi)
}
init();
module.exports={registerown,web3};
