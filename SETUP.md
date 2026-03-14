# Certsvice — Setup Guide

A blockchain-based certificate verification system built with:
- **Smart Contract** — Solidity on Ethereum (Sepolia testnet or local Hardhat)
- **API** — Express.js + MongoDB
- **back-office** — Next.js admin dashboard (university staff)
- **certs** — React app for public certificate verification

---

## Prerequisites

- Node.js 16+
- yarn (`npm install -g yarn`)
- MongoDB running locally (`mongod`) — or a MongoDB Atlas URI
- MetaMask browser extension
- (Optional) Infura account for Sepolia deployment

---

## Step 1 — Deploy the Smart Contract

### Option A: Local development (no ETH needed)

```bash
cd contract
yarn install
# Start a local Hardhat blockchain node (keep this terminal open)
yarn node

# In a new terminal — deploy to local node
yarn deploy:local
```

Copy the printed contract address into all three `.env` files (see Step 2).

### Option B: Sepolia testnet

1. Get a free Infura API key at https://infura.io
2. Get Sepolia test ETH from https://sepoliafaucet.com
3. Create `contract/.env` from the example:

```bash
cp contract/.env.example contract/.env
# Fill in SEPOLIA_RPC_URL and DEPLOYER_PRIVATE_KEY
```

4. Deploy:

```bash
cd contract
yarn install
yarn deploy:sepolia
```

Copy the printed contract address into all three `.env` files (see Step 2).

---

## Step 2 — Configure Environment Variables

Fill in the contract address printed from Step 1:

**`api/.env`**
```
CONTRACT_ADDRESS=0xYourDeployedAddress
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_ID   # or http://localhost:8545 for local
```

**`back-office/.env.local`**
```
NEXT_PUBLIC_CONTRACT=0xYourDeployedAddress
```

**`certs/.env`**
```
REACT_APP_CONTRACT_ADDRESS=0xYourDeployedAddress
```

---

## Step 3 — Start the API

```bash
cd api
yarn install
yarn dev
# API runs at http://localhost:8080
```

---

## Step 4 — Start the Back-office

```bash
cd back-office
yarn install
yarn dev
# Opens at http://localhost:3000
```

---

## Step 5 — Start the Certs app

```bash
cd certs
yarn install
yarn dev
# Opens at http://localhost:3001 (or next available port)
```

---

## MetaMask Setup

1. Install MetaMask: https://metamask.io
2. **For local development**: Add Hardhat network to MetaMask
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Import one of the accounts printed by `yarn node` using its private key
3. **For Sepolia**: Switch MetaMask to the Sepolia Test Network

---

## Project Architecture

```
certsvice/
├── contract/       # Solidity smart contract (Hardhat)
├── api/            # Express.js REST API + MongoDB
├── back-office/    # Next.js admin for universities
└── certs/          # React public verification portal
```

### API Endpoints

| Method | Route              | Description                    |
|--------|--------------------|--------------------------------|
| POST   | /api/signup        | Register a wallet address      |
| POST   | /api/signin        | Authenticate a wallet          |
| GET    | /api/university    | List all universities          |
| GET    | /api/wallet        | List all registered wallets    |
| GET    | /api/wallet/:id    | Get wallet by university ID    |
| POST   | /api/student       | Create a student certificate   |
| GET    | /api/student/:id   | Get a student certificate      |
| POST   | /api/student/:id   | List certificates by issuer    |
| DELETE | /api/student/:id   | Delete a student certificate   |

---

## Troubleshooting

**`process is not defined` in certs app**
→ Make sure you ran `yarn install` after the `process` package was added to `package.json`

**MetaMask shows wrong network**
→ The app will call `wallet_switchEthereumChain` to switch to Sepolia (`0xaa36a7`) automatically

**MongoDB connection fails**
→ Ensure MongoDB is running: `mongod --dbpath /tmp/mongodb`

**Contract calls fail (wrong address)**
→ Verify `CONTRACT_ADDRESS` in `api/.env` matches your deployed contract

**`web3-token` sign error in back-office**
→ Make sure MetaMask is connected and unlocked before signing in
