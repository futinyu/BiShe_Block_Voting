pragma solidity >=0.4.22 <0.6.2;
contract RegisterList
{

      address [] public registerList;
      mapping(address=>address) public creatorOwnerMap;//创建一个注册用户对应自己的合约地址
      function createRegist(string memory _name,string memory _age,string memory  _password,string memory _phone)public
      {
          require(isRegist()==true,'account is alive');
          address newRegiste=address(new  RegisterOwner(msg.sender,_name,_age,_password,_phone));
          registerList.push(newRegiste);
          creatorOwnerMap[msg.sender]=newRegiste;
      }

      function isRegist()  internal view returns(bool)
      {
          return creatorOwnerMap[msg.sender]==address(0x0);
      }

      function getinformation() view public returns(string memory,string memory)  //返回个人信息
      {
          require(isRegist()==false,'账号未注册');
          RegisterOwner registerowner=RegisterOwner(creatorOwnerMap[msg.sender]);
          return registerowner.getOwnerInfo();
      }

      function verifyPwd(string memory unknowvalue,string memory pwd) public  view returns(bool) //验证密码
      {
          address create=msg.sender;
          require(!isRegist(),'账户还未创建');
          address contractAddr=creatorOwnerMap[create];//获取合约的地址
          RegisterOwner registerowner=RegisterOwner(contractAddr);
          //验证账号密码和姓名或者电话
          return(registerowner.rightPwd(pwd)&&registerowner.rightUseName(unknowvalue))||(registerowner.rightPhone(unknowvalue)&&registerowner.rightPwd(pwd));
      }
      //获取用户的合约地址
        function getCurrAddr()public view returns(address){
                return creatorOwnerMap[msg.sender];
            }
}

contract RegisterOwner
{
    address register;
    string name;
    string age;
    string password;
    string  phone;
    uint64 private nowbalance;
    uint addtime;//注册时间

    constructor(address _regisaddr,string memory _name,string memory _age,string memory  _password,string memory _phone) public
    {
     register=_regisaddr;
     name=_name;
     age=_age;
     password=_password;
     phone=_phone;
     addtime=now;
     nowbalance=2000;
    }
    //存放标题以及是否投票信息
    struct Record{
        string title;

        uint256 currdate;
        address currentaddr;//标题地址
        string selectname;
    }
    Record [] public records; //记录所有投票记录
     modifier onlyowner(address _register)
    {
        require(_register==register,'非本地址操作');
        _;
    }

    //判断账号密码
    function rightPwd(string memory _pwd) public view returns(bool)
    {
        return keccak256(abi.encode(_pwd))==keccak256(abi.encode(password));
    }
    //判断账户名称
    function rightUseName(string memory _username)public view returns(bool)
    {
        return keccak256(abi.encode(_username))==keccak256(abi.encode(name));
    }
    //判断账户号码
    function rightPhone(string memory _phone) public view returns(bool)
    {
        return keccak256(abi.encode(phone))==keccak256(abi.encode(_phone));
    }

    //查询余额
    function getBalance() public view  returns(uint64)
    {
        return nowbalance;
    }
    //  更新剩余金额
    function updateBalance(int increment)public
    {
        require((int(nowbalance)+increment>=0));
        nowbalance=uint64(int(nowbalance)+increment);
    }
    //  修改账户信息
    function changeOwnerInfo(string memory _name,string memory _age,string memory _phone) public
    {
        name=_name;
        age=_age;
        phone=_phone;
    }

    //返回个人信息
    function getOwnerInfo()public view returns(string memory,string memory )
    {
        return(name,phone);
    }

    //返回投票信息
    function getrewords(uint256 i)public view  returns(string memory,uint256,address,string memory)
    {
       return(records[i].title,records[i].currdate,records[i].currentaddr,records[i].selectname);
    }


    //判断是否存在投票记录 ：如果报错  就在外面进行循环
    function  istovote(address _titleaddr) public view returns(bool)
    {
        for(uint i=0;i<records.length;i++)
        {
             if(_titleaddr==records[i].currentaddr)
             {

                     return false;

             }
        }
         return true;
    }
    //投票处理
    function Ballet(address _titleaddr,string memory _title,string memory selectname) public
    {
        //require(istovote(_titleaddr),'判断是否投过票');

        records.push(Record(_title,now,_titleaddr,selectname));//后期决定加不加标题地址

    }
    //返回结构体数组长度
    function getReLen()public view returns(uint)
    {
        return records.length;
    }
 //返回注册时间
    function getaddtime()public view returns(uint)
    {
        return addtime;
    }
}
