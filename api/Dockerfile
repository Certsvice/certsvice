# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
RUN yarn build

# ---- Runtime stage ----
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=builder /app/build ./build
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
