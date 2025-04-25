FROM node:23-slim AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM node:23-slim AS runner

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.output /app/.output
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
