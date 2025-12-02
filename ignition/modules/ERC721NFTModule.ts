import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC721NFTModule = buildModule("ERC721NFTModule", (m) => {
  // The deployer account will automatically be msg.sender,
  // so we do not pass any constructor args.
  const roddyNFT = m.contract("RoddyNFT");

  return { roddyNFT };
});

export default ERC721NFTModule;
