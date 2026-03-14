const hre = require("hardhat");

async function main() {
  console.log("Deploying Certsvice contract...");

  const Certsvice = await hre.ethers.getContractFactory("Certsvice");
  const certsvice = await Certsvice.deploy();

  await certsvice.waitForDeployment();

  const address = await certsvice.getAddress();
  console.log(`Certsvice deployed to: ${address}`);
  console.log("\nCopy this address into your .env files:");
  console.log(`  api/.env          → CONTRACT_ADDRESS=${address}`);
  console.log(`  back-office/.env.local → NEXT_PUBLIC_CONTRACT=${address}`);
  console.log(`  certs/.env        → REACT_APP_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
