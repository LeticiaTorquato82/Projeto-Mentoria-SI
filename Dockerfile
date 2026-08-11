FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS test
WORKDIR /app
COPY --from=deps /app .
RUN npm test

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=deps /app/src ./src
EXPOSE 3000
CMD ["node", "src/index.js"]
