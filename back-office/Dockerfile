# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* vars can be baked at build time (Sepolia).
# For Docker local/runtime injection, window.__env__ is used instead.
ARG NEXT_PUBLIC_API_URI
ARG NEXT_PUBLIC_CONTRACT
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_CONTRACT=$NEXT_PUBLIC_CONTRACT

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# ---- Runtime stage ----
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
