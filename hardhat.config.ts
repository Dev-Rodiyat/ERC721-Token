import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const CELOSCAN_API_KEY = vars.get("CELOSCAN_API_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    // Celo Sepolia Testnet
    celoSepolia: {
      url: "https://forno.celo-sepolia.celo-testnet.org/",
      accounts: [PRIVATE_KEY],
    },
    // Celo Mainnet
    celo: {
      url: "https://forno.celo.org",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: CELOSCAN_API_KEY,
    customChains: [
      {
        network: "celoSepolia",
        chainId: 11142220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://sepolia.celoscan.io",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
    ],
  },
};

export default config;
