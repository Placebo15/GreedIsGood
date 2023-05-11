require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
let secrets = require("./secrets");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: secrets.url,
      accounts: [secrets.key]
    }
  },
  etherscan: {
    apiKey: "TDC6XUP94939GYMB8NNTCSDUTWITTP972G"
  }
};
