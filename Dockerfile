# Stage 1: Build
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production=false

# Copy source code
COPY . .

# Build NestJS app
RUN npm run build

# Stage 2: Production
FROM node:lts-alpine

WORKDIR /app

# Copy only what is needed for production
COPY package*.json ./
RUN npm install --production

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Copy any other necessary files (like .env)
#COPY .env ./

# Expose port from environment variable
EXPOSE ${PORT:-3000}

# Set NODE_ENV
ENV NODE_ENV=production

# Increase Node memory if needed
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Start the app
CMD ["node", "dist/main.js"]
