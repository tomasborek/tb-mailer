#INSTALL DEPS
FROM node:22.11.0-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

#BUILD
FROM node:22.11.0-alpine AS builder

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

#RUNNER
FROM node:22.11.0-alpine AS runner

WORKDIR /app

COPY --from=builder /dist ./dist
COPY --from=builder /package*.json ./
COPY --from=builder /node_modules ./node_modules

EXPOSE 3031

CMD ["npm", "run", "start"]
