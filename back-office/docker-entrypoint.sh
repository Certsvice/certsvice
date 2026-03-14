#!/bin/sh
set -e

SHARED_ENV="/shared/contract.env"
ENV_JS="/app/public/env-config.js"

# Resolve contract address — from env var or shared volume
if [ -n "$CONTRACT_ADDRESS" ]; then
  echo "[entrypoint] Using CONTRACT_ADDRESS from environment"
elif [ -f "$SHARED_ENV" ]; then
  export $(grep -v '^#' "$SHARED_ENV" | xargs)
  echo "[entrypoint] Loaded CONTRACT_ADDRESS from $SHARED_ENV"
else
  echo "[entrypoint] Waiting for contract deployment..."
  until [ -f "$SHARED_ENV" ]; do sleep 2; done
  export $(grep -v '^#' "$SHARED_ENV" | xargs)
  echo "[entrypoint] CONTRACT_ADDRESS=$CONTRACT_ADDRESS"
fi

# Write runtime env-config.js (served as a static file by Next.js from /public)
echo "window.__env__ = { CONTRACT_ADDRESS: \"${CONTRACT_ADDRESS:-}\" };" > "$ENV_JS"
echo "[entrypoint] Written $ENV_JS"

exec node_modules/.bin/next start -p 3000
