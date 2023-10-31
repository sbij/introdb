FROM node:16-alpine AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
COPY . ./

RUN npm run build
RUN npm prune --production

FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

EXPOSE 3000
CMD [ "node", "build" ]