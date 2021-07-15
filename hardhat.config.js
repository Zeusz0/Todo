require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 const ALCHEMY_API_KEY = "130I4_0CkCUGCPgB9p-I-ShfDO18qr1F";

 const ROPSTEN_PRIVATE_KEY = "0068fe71bcba3434572bd00aaa237917e8a905c59cd247cb683c990f2a4cd1a0";
 
 module.exports = {
   solidity: "0.7.3",
   networks: {
     ropsten: {
       url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
       accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
     }
   }
 };