ARG NODEJS_VERSION
ARG NGINX_VERSION

FROM $NODEJS_VERSION as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY ./ ./
RUN quasar build

FROM $NGINX_VERSION as prod
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
