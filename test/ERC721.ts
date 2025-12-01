import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("RoddyNFT (ERC721)", () => {
  async function deployERC721NFTFixture() {
    const metadataURI = "ipfs://bafkreigo3zvkhm3n7ojamyjp24hr6i5dweebf2pue2u7tv7v7tktipb4hu";

    const [owner, anotherAccount] = await hre.ethers.getSigners();
    const RoddyNFT = await hre.ethers.getContractFactory("RoddyNFT");

    const roddy = await RoddyNFT.deploy();
    await roddy.waitForDeployment();

    return {roddy, owner, anotherAccount, metadataURI};
  }

  it("mints an NFT to the correct owner", async () => {
    const { roddy, owner, metadataURI } = await loadFixture(deployERC721NFTFixture);

    const tx = await roddy.safeMint(owner.address, metadataURI);
    await tx.wait();

    expect(await roddy.ownerOf(0)).to.equal(owner.address);
    expect(await roddy.tokenURI(0)).to.equal(metadataURI);
  });

  it("reverts when a non-owner tries to mint", async () => {
    const { roddy, anotherAccount, owner, metadataURI } =
      await loadFixture(deployERC721NFTFixture);

    await expect(
      roddy.connect(anotherAccount).safeMint(owner.address, metadataURI)
    )
      .to.be.revertedWithCustomError(roddy, "OwnableUnauthorizedAccount")
      .withArgs(anotherAccount.address);
  });

  it("increments token IDs correctly", async () => {
    const { roddy, owner, metadataURI } = await loadFixture(deployERC721NFTFixture);

    await roddy.safeMint(owner.address, metadataURI);
    await roddy.safeMint(owner.address, metadataURI);

    expect(await roddy.ownerOf(0)).to.equal(owner.address);
    expect(await roddy.ownerOf(1)).to.equal(owner.address);
  });

  it("returns the correct token URI", async () => {
    const { roddy, owner, metadataURI } = await loadFixture(deployERC721NFTFixture);

    await roddy.safeMint(owner.address, metadataURI);

    expect(await roddy.tokenURI(0)).to.equal(metadataURI);
  });

  it("supports standard ERC721 interfaces", async () => {
    const { roddy } = await loadFixture(deployERC721NFTFixture);

    // ERC721 interface ID
    expect(await roddy.supportsInterface("0x80ac58cd")).to.equal(true);

    // ERC721Metadata interface ID
    expect(await roddy.supportsInterface("0x5b5e139f")).to.equal(true);
  });
});
