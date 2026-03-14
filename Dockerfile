
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
# Only copy production-ready files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# Remove dev dependencies
RUN npm install --omit=dev

USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]