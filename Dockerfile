# Stage 1
FROM node:16 as build-stage

WORKDIR /safestake-explorer
COPY . .
RUN yarn install && DISABLE_ESLINT_PLUGIN=true npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /safestake-explorer/build /usr/share/nginx/html
EXPOSE $EXPLORER_DOCKER_PORT

CMD nginx -g 'daemon off;'
