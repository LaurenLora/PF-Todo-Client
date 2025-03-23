FROM node:22.11.0-alpine AS base

FROM base AS dependencies

WORKDIR /app

COPY ./app/package.json ./app/yarn.lock* ./

RUN yarn install

FROM base AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./app .

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME="0.0.0.0" \
    NEXT_PUBLIC_API_URL="http://localhost:3001/api" \
    NEXTAUTH_URL="http://localhost:3000" \
    NEXTAUTH_SECRET="f2RQ02VvgVpAYJP4ZGaZiW4SyjSKNPhmXhH7Tueo1HA=" \
    BUNNY_CDN_STORAGE_URL="https://storage.bunnycdn.com" \
    BUNNY_CDN_USERNAME="playable-factory" \
    BUNNY_CDN_ACCESS_KEY="db38e5b4-17cf-4827-adb595d15b96-d67f-46f8" \
    BUNNY_CDN_URL="https://playable-factory.b-cdn.net"

COPY --from=build /app/public ./public

RUN mkdir .next

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

CMD ["node", "server.js"]