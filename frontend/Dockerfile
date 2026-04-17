# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy manifests first so Docker can cache the install layer
COPY package*.json ./

# --legacy-peer-deps + --force bypasses the ajv/ajv-keywords peer dep conflict
RUN npm install --legacy-peer-deps --force

COPY . .

RUN npm run build

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM nginx:alpine

# Copy the production build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
