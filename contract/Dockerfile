FROM node:18-alpine
RUN apk add --no-cache netcat-openbsd
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx hardhat compile
# CMD is set per-service in docker-compose (node vs deployer)
