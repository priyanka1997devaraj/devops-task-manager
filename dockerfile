# ---------- Stage 1: Build ----------
FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --only=production

# Copy app source
COPY . .

# ---------- Stage 2: Runtime ----------
FROM node:18-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app /app

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
