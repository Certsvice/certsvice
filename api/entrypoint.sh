#!/bin/sh
set -e

SHARED_ENV="/shared/contract.env"

# If CONTRACT_ADDRESS already set (e.g. Sepolia pre-configured), use it directly
if [ -n "$CONTRACT_ADDRESS" ]; then
  echo "[entrypoint] Using CONTRACT_ADDRESS from environment"
else
  # Wait for deployer to write the address
  echo "[entrypoint] Waiting for contract deployment..."
  until [ -f "$SHARED_ENV" ]; do
    sleep 2
  done
  export $(grep -v '^#' "$SHARED_ENV" | xargs)
  echo "[entrypoint] CONTRACT_ADDRESS=$CONTRACT_ADDRESS"
fi

exec node build/index.js
