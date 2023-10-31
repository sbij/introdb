FROM node:16-alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . .

RUN npm run build
RUN npm prune --production

FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app
COPY --from=builder --chown=nodeuser:nodeuser /app/build build/
COPY --from=builder --chown=nodeuser:nodeuser /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
CMD [ "node", "build" ]