# ---- Phase 1: Build the NestJS library ----
FROM node:20 AS builder-core-service

WORKDIR /app

COPY ./core-service/package*.json ./

RUN npm install

COPY ./core-service .

RUN npm i -g @vercel/ncc

RUN npm run build
RUN npm run package

# ---- Phase 1: Build the UI ----
FROM node:20 AS builder-ui

WORKDIR /app

COPY ./ui/package*.json ./

RUN npm install

COPY ./ui .

RUN npm run build

# ---- Phase 2: Output only the built artifacts ----
FROM node:20

WORKDIR /app

# Copy the built `dist/` folder from the builder stage
COPY --from=builder-core-service /app/package ./dist
COPY --from=builder-ui /app/dist/protal-proxy-ui ./dist/ui-assets