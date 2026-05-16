ARG APP_IMAGE=photo-video-app
FROM ${APP_IMAGE} AS app

FROM nginx:stable-alpine

COPY --from=app /var/www/public /var/www/public
COPY --from=app /var/www/storage/app/public /var/www/storage/app/public
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
