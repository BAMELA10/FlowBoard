FROM node:22-slim AS base

# Dossier de l"application
RUN mkdir -p /app && chown node:node /app

WORKDIR /app

#-------------------------------------------------------------
FROM base AS deps

#activer pnpm via corepack
RUN corepack enable

#copier le package.json et pnpm.lock.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

#installer openssl pour prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN pnpm config set store-dir /pnpm/store

#install les dependances sans oublié d"ajouter le store par garder les modules
RUN  --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

FROM deps AS dev

ENV NODE_ENV="development"

#copier l"ensemble de dossier de l"application
COPY . .

#exporse le port
EXPOSE 3000

#lancer l"application
CMD ["pnpm", "run", "dev"]

#-------------------------------------------------------------
FROM deps AS prod

ENV NODE_ENV="production"

#copier l"ensemble de dossier de l"application
COPY --chown=node:node . .

#generer le schema prisma
RUN pnpm prisma generate

#faire le build de l"application pour produire le /dist
RUN pnpm run build

USER node

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

EXPOSE 3000

#lancer l"application
CMD ["pnpm", "run", "start"]