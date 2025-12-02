import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const CELOSCAN_API_KEY = vars.get("CELOSCAN_API_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY"); // For Ethereum verification
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY"); // For Ethereum provider

const config: HardhatUserConfig = {
  solidity: "0.8.27",
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
    // Ethereum Sepolia Testnet
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY, // ✅ single unified key
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api", // ✅ Sepolia V1 endpoint
          browserURL: "https://sepolia.etherscan.io",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api", // ✅ Celo mainnet
          browserURL: "https://celoscan.io",
        },
      },
      {
        network: "celoSepolia",
        chainId: 11142220,
        urls: {
          apiURL: "https://api-sepolia.celoscan.io/api", // ✅ Celo Sepolia
          browserURL: "https://sepolia.celoscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: false, // optional: silences the Sourcify warning
  },
};

export default config;