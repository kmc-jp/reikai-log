FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn prepare
RUN yarn build:production

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

EXPOSE 33555

COPY --from=builder /app/dist ./
CMD ["node", "reikai-log.js"]
