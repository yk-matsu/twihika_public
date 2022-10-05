FROM public.ecr.aws/docker/library/node:18-slim AS builder
# ビルドには devDependencies もインストールする必要があるため
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@twihika/storybook --docker

FROM public.ecr.aws/docker/library/node:18-slim AS installer
WORKDIR /app
RUN apt update -y && apt install -y libpq-dev g++ make python3
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
COPY turbo.json turbo.json
COPY .yarnrc .yarnrc
COPY .npmrc .npmrc

RUN yarn install

ARG TURBO_REPO_TOKEN
ENV TURBO_REPO_TOKEN=$TURBO_REPO_TOKEN
ARG TURBO_REPO_API
ENV TURBO_REPO_API=$TURBO_REPO_API
ARG TURBO_REPO_TEAM
ENV TURBO_REPO_TEAM=${TURBO_REPO_TEAM}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn turbo run build  --filter=@twihika/storybook...

WORKDIR /app/apps/storybook

CMD node auth-server.js
