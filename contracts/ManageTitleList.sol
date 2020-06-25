
pragma solidity >=0.4.22 <0.6.2;
//投票的标题管理
contract ManageTitleList
{
    address myaddr;
    constructor() public {
       myaddr=msg.sender;
    }

    uint [] public TitleList;
    address [] public TitleAddrs;
    mapping(uint=>address) public creatorTitleMap;//存放所有标题的地址
     function createTitle(string memory _title,uint _arrivetime) public returns(bool)
    {
        address newTitle=address(new TitleOwner(_title,_arrivetime));
        uint nowID=TitleList.length>0?TitleList[TitleList.length-1]+1:1;//索引永远比值小1
        creatorTitleMap[nowID]=newTitle;//存放标题地址
        TitleList.push(nowID);
        TitleAddrs.push(newTitle);//在这里不需要映射直接保存地址
        return true;
    }
    //获取管理员地址
     function getManager() public view returns(address)
        {
            return myaddr;
        }

    //创建候选人
    function createPartMan(uint i,string memory _name,string memory _introduce)public
    {
        address  targetaddr=creatorTitleMap[i];//正常序号
        TitleOwner  titleowner=TitleOwner(targetaddr);
        titleowner.createNewMan(_name,_introduce);
    }


    //返回所有的标题地址
    function  getTitleList()public view returns(address[] memory)
    {
    return TitleAddrs;
    }

    function GetAllVoteman(address targetaddr)public view returns(uint)//返回投票人数
    {
          TitleOwner titleowner=TitleOwner(targetaddr);
         return titleowner.GetVoterNum();
    }
    //返回所有标题
    function GetTitle(address _targetaddr)public view returns(string memory,uint,uint64 )
    {
        TitleOwner titleowner=TitleOwner(_targetaddr);
        return titleowner.GetDetailTitle();
    }
}


contract TitleOwner
{
    string title;
    uint time;
    bool isalive=true;
    uint64 allman;//所有参与投票的人
    address [] public  GiveVote;//已经投过票的
    struct PartMember  //候选人结构体数组
    {
        string name;
        string introduce;//个人简介
        uint64 account;
        address []  voteaddr;//存放投票的地址
    }
    PartMember [] public partmember;//参选人员列表
    constructor(string memory _title,uint _arrivetime) public
    {
        title=_title;
        time=now;
        time=time+_arrivetime;
        allman=0;
    }
    //创建候选人
    function createNewMan(string memory _name,string memory _introduce) public
    {
        address[] memory voteaddr=new address[](1);
        voteaddr[0]=address(0x0);
        partmember.push(PartMember(_name,_introduce,0,voteaddr));
    }
    //返回所有的参选人
    function readPartMans(uint j)view public returns(string memory,string memory,uint64,address[] memory)
    {
        return (partmember[j].name,partmember[j].introduce,partmember[j].account,partmember[j].voteaddr);
    }
    //给某人增加票数
    function ToBallet(uint i,address addr1)public{
        partmember[i].account+=1;
        partmember[i].voteaddr.push(addr1);
        allman+=1;
        GiveVote.push(addr1);
    }

    function  Havevoted()public view returns(address[] memory)//判断是否投过票
    {
      return GiveVote;
    }
    function GetVoterNum() public view returns(uint)//返回已投人数
    {
        return  allman;
    }
    function GetDetailTitle()public view returns(string memory,uint,uint64)//返回标题
    {
        return (title,time,allman);
    }
   //返回候选人长度
   function GetPartLen()public view returns(uint)
   {
       return partmember.length;
   }
}

