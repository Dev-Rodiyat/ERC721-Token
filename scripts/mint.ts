import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Minting NFTs with deployer account: ", deployer.address);
  console.log("-------------------------------------------------");

  // Check deployer's CELO balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(
    "Account balance (CELO Sepolia):",
    hre.ethers.formatEther(balance),
    "CELO"
  );
  console.log("---------------------------------------------------");

  // Attach to deployed RoddyNFT contract
  const contractAddress = "0xAa37242aEbB0Ee4eD49d2538117133146BC48541"; // replace this
  const RoddyNFT = await hre.ethers.getContractFactory("RoddyNFT");
  const roddyNFT = await RoddyNFT.attach(contractAddress);

  console.log("Minting NFTs to multiple addresses...");
  console.log("-------------------------------------------------");

  // Array of recipients
  const recipients = [
    "0xc1c92aa2ad8d929748090fee7e88e245725af3c5",
    "0x1a0a85fd9e79562e85a0861c509e0c2239a6d0d5",
    "0x7e6a38d86e4a655086218c1648999e509b40e391",
    "0x460798d5432d2eb30d33b769a227a551e9e45aa6",
  ];

  // Corresponding IPFS metadata URIs
  const metadataURIs = [
    "ipfs://bafkreigo3zvkhm3n7ojamyjp24hr6i5dweebf2pue2u7tv7v7tktipb4hu",
    "ipfs://bafkreigo3zvkhm3n7ojamyjp24hr6i5dweebf2pue2u7tv7v7tktipb4hu",
    "ipfs://bafkreigo3zvkhm3n7ojamyjp24hr6i5dweebf2pue2u7tv7v7tktipb4hu",
    "ipfs://bafkreigo3zvkhm3n7ojamyjp24hr6i5dweebf2pue2u7tv7v7tktipb4hu",
  ];

  for (let i = 0; i < recipients.length; i++) {
    const tx = await roddyNFT.safeMint(recipients[i], metadataURIs[i]);
    await tx.wait();
    console.log(`NFT minted to ${recipients[i]} with URI: ${metadataURIs[i]}`);
  }

  console.log("-------------------------------------------------");
  console.log("All NFTs minted successfully!");
  console.log("-------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
