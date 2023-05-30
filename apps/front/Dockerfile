FROM node:lts-alpine As build

WORKDIR /usr/src/app/

RUN npm i -g pnpm

USER root

COPY package.json ./

RUN pnpm i

COPY . ./

RUN pnpm run build

COPY . ./

FROM node:lts-alpine As prod

RUN npm i -g serve

COPY --from=build /usr/src/app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build"]



