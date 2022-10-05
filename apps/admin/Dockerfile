# Install dependencies only when needed
FROM public.ecr.aws/docker/library/node:18-slim AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apt update -y && apt install -y libpq-dev g++ make python3
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@twihika/admin --docker

# Install dependencies based on the preferred package manager
# Rebuild the source code only when needed
FROM public.ecr.aws/docker/library/node:18-slim AS installer
RUN apt update -y && apt install -y libssl-dev
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN yarn install
ARG HASURA_GRAPHQL_ADMIN_SECRET
ENV HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET
ARG HASURA_GRAPHQL_ENDPOINT
ENV HASURA_GRAPHQL_ENDPOINT=$HASURA_GRAPHQL_ENDPOINT
ARG TWI_HIKA_FIREBASE_CLIENT_JSON
ENV TWI_HIKA_FIREBASE_CLIENT_JSON=$TWI_HIKA_FIREBASE_CLIENT_JSON
ARG TWI_HIKA_FIREBASE_ADMIN_JSON
ENV TWI_HIKA_FIREBASE_ADMIN_JSON=$TWI_HIKA_FIREBASE_ADMIN_JSON
ARG TURBO_REPO_TOKEN
ENV TURBO_REPO_TOKEN=$TURBO_REPO_TOKEN
ARG TURBO_REPO_API
ENV TURBO_REPO_API=$TURBO_REPO_API
ARG TURBO_REPO_TEAM
ENV TURBO_REPO_TEAM=${TURBO_REPO_TEAM}
ARG EVENTBUS_HOST
ENV EVENTBUS_HOST=$EVENTBUS_HOST
ARG DEVELOPMENT_MODE
ENV DEVELOPMENT_MODE=$DEVELOPMENT_MODE

RUN yarn turbo run build  --filter=@twihika/admin...
# RUN yarn turbo run build --token=${TURBO_REPO_TOKEN} --api=${TURBO_REPO_API} --team=${TURBO_REPO_TEAM} --filter=@twihika/id...

# Production image, copy all the files and run next
FROM public.ecr.aws/docker/library/node:18-slim AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs


COPY --from=installer /app/apps/admin/next.config.js .
COPY --from=installer /app/apps/admin/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static

EXPOSE 3000

ENV PORT 3000
CMD node apps/admin/server.js
