FROM node:22-bookworm-slim

WORKDIR /app/worker

COPY infra/azure/snapshot-worker/package.json ./package.json
COPY packages/api-contract ./packages/api-contract
COPY packages/geo ./packages/geo

RUN npm install --omit=dev --ignore-scripts --no-package-lock --no-audit --no-fund \
  && npm cache clean --force

COPY src ./src

ENV NODE_ENV=production

USER node

CMD ["node", "node_modules/tsx/dist/cli.mjs", "src/server/river-snapshot.ts"]
