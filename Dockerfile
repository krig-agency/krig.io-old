FROM jitesoft/node-yarn:stable as build
ENV NODE_ENV=production
RUN yarn global add gulp-cli
COPY . /app
WORKDIR /app
RUN yarn install && gulp build

FROM jitesoft/lighttpd
COPY --from=build /app/app /var/www/html
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
