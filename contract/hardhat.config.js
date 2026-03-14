require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.3",
  networks: {
    // Local Hardhat node (for development without spending ETH)
    localhost: {
      url: process.env.HARDHAT_RPC_URL || "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // Sepolia testnet (replaces deprecated Ropsten)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
    },
  },
};
