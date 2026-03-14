# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# REACT_APP_* vars can be baked at build time (Sepolia).
# For Docker local/runtime injection, window.__env__ is used instead.
ARG REACT_APP_CONTRACT_ADDRESS
ENV REACT_APP_CONTRACT_ADDRESS=$REACT_APP_CONTRACT_ADDRESS

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# ---- Runtime stage — serve with nginx ----
FROM nginx:alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
