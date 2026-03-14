const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying Certsvice contract...");

  const Certsvice = await hre.ethers.getContractFactory("Certsvice");
  const certsvice = await Certsvice.deploy();
  await certsvice.waitForDeployment();

  const address = await certsvice.getAddress();
  console.log(`Certsvice deployed to: ${address}`);

  // Write address to shared volume so other containers can pick it up
  fs.mkdirSync("/shared", { recursive: true });
  fs.writeFileSync("/shared/contract.env", `CONTRACT_ADDRESS=${address}\n`);
  console.log("Contract address written to /shared/contract.env");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
