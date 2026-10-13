FROM node:22-slim AS base

# Dossier de l"application
RUN mkdir -p /app && chown node:node /app

WORKDIR /app

#-------------------------------------------------------------
FROM base AS deps

#activer pnpm via corepack
RUN corepack enable

#copier le package.json et pnpm.lock.json
COPY package.json pnpm-lock.yaml ./

RUN pnpm config set store-dir /pnpm/store

#install les dependances sans oublié d"ajouter le store par garder les modules
RUN  --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

#------------------------------------------------------------
FROM deps AS dev

ENV NODE_ENV="development"

#copier l"ensemble de dossier de l"application
COPY . .

#exporse le port
EXPOSE 5173

#lancer l"application
CMD pnpm run dev --host 0.0.0.0
#------------------------------------------------------------
FROM deps AS build
ENV NODE_ENV="production"
COPY . .
RUN pnpm run build

#-------------------------------------------------------------
FROM nginx:alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

#lancer l"application
CMD nginx -g 'daemon off;'