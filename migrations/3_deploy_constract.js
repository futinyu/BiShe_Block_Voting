var ManageTitleList=artifacts.require("ManageTitleList");
let account='0xdC57d330F22E5232234d551710516Ef25d9BD53e';

module.exports=function (deployer) {
    deployer.deploy(ManageTitleList,{from:account,gas:99000000,overwrite: false});
};
