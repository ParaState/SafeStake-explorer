# Stage 1
FROM node:14 as builder

COPY . /app
WORKDIR /app

RUN yarn install && DISABLE_ESLINT_PLUGIN=true npm run build

# # Stage 2
FROM nginx:stable
ARG CENV
COPY "./deploy/nginx_$CENV.conf" /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
