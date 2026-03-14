# Certsvice

A blockchain-based academic certificate verification system. Universities issue certificates on-chain; anyone can verify them without trusting a central authority.

## Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity · Hardhat · Ethereum (Sepolia / local) |
| API | Express.js · TypeScript · MongoDB · Mongoose |
| Back Office | Next.js 12 · Tailwind CSS · Web3.js · MetaMask |
| Certs Portal | React 17 (CRA) · Tailwind CSS · Web3.js · MetaMask |
| Infrastructure | Docker · Docker Compose |

## Architecture

```
certsvice/
├── contract/        Solidity smart contract (Hardhat)
├── api/             REST API — Express + TypeScript + MongoDB
├── back-office/     Admin dashboard — Next.js (university staff & owner)
└── certs/           Public verification portal — React SPA
```

### How it works

```
Owner (MetaMask)
  └─► Registers university wallet on-chain + in DB (back-office)

University staff (MetaMask)
  └─► Signs in via MetaMask signature (web3-token)
  └─► Issues certificate → hashed → stored on-chain + in DB (back-office)
  └─► Can revoke / download certificates

Public user
  └─► Uploads certificate JSON → hash verified against chain (certs portal)
```

---

## Running with Docker (recommended)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- [MetaMask](https://metamask.io) browser extension

### 1. Configure environment

```bash
cp .env.compose .env
```

Open `.env` and set at minimum:

```env
JWT_SECRET=your-strong-random-secret
```

### 2a. Local development (Hardhat — free, no ETH needed)

```bash
docker compose --profile local up --build
```

This will:
- Start a local Hardhat blockchain node (port **8545**)
- Compile & deploy the smart contract automatically
- Write the contract address to a shared volume (no manual copy-paste)
- Start MongoDB, API, back-office, and certs portal

**MetaMask setup for local:**
- Network Name: `Hardhat Local`
- RPC URL: `http://localhost:8545`
- Chain ID: `31337`
- Import a test account from the Hardhat node logs (any of the printed private keys)

| Service | URL |
|---|---|
| API | http://localhost:8080 |
| Back Office | http://localhost:3000 |
| Certs Portal | http://localhost:3001 |
| Hardhat RPC | http://localhost:8545 |

### 2b. Sepolia testnet

You need an [Infura](https://infura.io) API key and a wallet with Sepolia ETH ([faucet](https://sepoliafaucet.com)).

**Step 1 — Deploy the contract** (runs once):

```bash
# Fill in .env first:
#   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
#   DEPLOYER_PRIVATE_KEY=your-private-key-without-0x

docker compose --profile sepolia run --rm contract-deploy-sepolia
```

Copy the contract address printed in the logs into your `.env`:

```env
CONTRACT_ADDRESS=0xYourDeployedAddress
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

**Step 2 — Start everything:**

```bash
docker compose up --build
```

**MetaMask setup for Sepolia:**
- Switch to the **Sepolia Test Network** in MetaMask
- The app will prompt to switch automatically if you're on the wrong network

---

## Running manually (without Docker)

### Prerequisites

- Node.js 18+ · yarn · MongoDB · MetaMask

### 1. Deploy the smart contract

**Local Hardhat node:**
```bash
cd contract && yarn install
yarn hardhat node          # keep this terminal open — port 8545
# in a new terminal:
yarn hardhat run scripts/deploy.js --network localhost
```

**Sepolia:**
```bash
cd contract
cp .env.example .env       # fill in SEPOLIA_RPC_URL + DEPLOYER_PRIVATE_KEY
yarn install
yarn hardhat run scripts/deploy.js --network sepolia
```

### 2. Set environment variables

Copy the printed contract address into all three env files:

**`api/.env`**
```env
NODE_ENV=dev
PORT=8080
DB_URI=mongodb://localhost:27017/certsvice
JWT_SECRET=your-secret
JWT_EXP=24
CONTRACT_ADDRESS=0xYourAddress
BLOCKCHAIN_RPC_URL=http://localhost:8545   # or Sepolia URL
```

**`back-office/.env.local`**
```env
NEXT_PUBLIC_API_URI=http://localhost:8080
NEXT_PUBLIC_CONTRACT=0xYourAddress
```

**`certs/.env`**
```env
REACT_APP_CONTRACT_ADDRESS=0xYourAddress
```

### 3. Start services

```bash
# API
cd api && yarn install && yarn dev          # → http://localhost:8080

# Back Office
cd back-office && yarn install && yarn dev  # → http://localhost:3000

# Certs Portal
cd certs && yarn install && yarn dev        # → http://localhost:3001
```

---

## API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/signup` | — | Register wallet address for a university |
| POST | `/api/signin` | — | Authenticate via MetaMask signature → JWT |
| GET | `/api/university` | — | List all universities |
| GET | `/api/wallet` | — | List all registered wallets |
| GET | `/api/wallet/:id` | — | Get wallet by wallet ID or owner ID |
| POST | `/api/student` | JWT | Issue a certificate |
| GET | `/api/student/:id` | — | Get certificate by ID |
| POST | `/api/student/:id` | JWT | List certificates by issuer + year |
| DELETE | `/api/student/:id` | JWT | Revoke a certificate |

---

## Troubleshooting

**MetaMask shows wrong network**
→ The app calls `wallet_switchEthereumChain` automatically. If it fails, add the network manually using the details above.

**Contract address not loading in browser (Docker local)**
→ The contract address is injected at container startup via `window.__env__`. Hard-refresh the page (`Ctrl+Shift+R`) after `docker compose up` finishes.

**MongoDB connection fails**
→ Ensure MongoDB is running or check `DB_URI` in your `.env`.

**`process is not defined` in certs app**
→ Run `yarn install` — the `process` polyfill package must be installed.

**`web3-token` sign error**
→ Make sure MetaMask is connected and unlocked before signing in.

**Hardhat node resets on container restart**
→ All local chain state (accounts, contracts) is lost when the `hardhat` container stops. Re-import the account and redeploy if needed, or use `docker compose --profile local up` (without `--build`) to restart without re-deploying.
