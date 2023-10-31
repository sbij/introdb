FROM node:16-alpine AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci
COPY . /usr/src/app

RUN npm run build
RUN npm prune --production

FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=builder --chown=nodeuser:nodeuser /usr/src/app/build build/
COPY --from=builder --chown=nodeuser:nodeuser /usr/src/app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
CMD [ "node", "build" ]