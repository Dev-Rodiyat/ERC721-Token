import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Minting NFTs with deployer account:", deployer.address);
  console.log("-------------------------------------------------");

  // Check deployer's balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance (ETH Sepolia):", ethers.formatEther(balance), "ETH");
  console.log("---------------------------------------------------");

  // Attach to deployed RoddyNFT contract
  const contractAddress = "0xc53EC46e4AcFB24b08Bf192DdaD98553ABe3C702"; // replace with your deployed address
  const roddyNFT = await ethers.getContractAt("RoddyNFT", contractAddress);

  console.log("Minting NFTs to multiple addresses...");
  console.log("-------------------------------------------------");

  // Array of recipients
  const recipients = [
    "0xc1c92aa2ad8d929748090fee7e88e245725af3c5"
  ];

  // Corresponding IPFS metadata URIs
  const metadataURIs = [
    "ipfs://bafkreigo3zvkhm3n7ojamyjp24hr6i5dweebf2pue2u7tv7v7tktipb4hu"
  ];

  for (let i = 0; i < recipients.length; i++) {
    const tx = await roddyNFT.safeMint(recipients[i], metadataURIs[i]);
    await tx.wait();
    console.log(`NFT minted to ${recipients[i]} with URI: ${metadataURIs[i]}`);
  }

  console.log("-------------------------------------------------");
  console.log("NFT minted successfully!");
  console.log("-------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});