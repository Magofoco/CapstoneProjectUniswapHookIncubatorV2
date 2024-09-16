import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "dotenv/config";

const { PRIVATE_KEY, ALCHEMY_API_KEY, ETHERSCAN_API_KEY } =	process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.26",  
};

export default config;
