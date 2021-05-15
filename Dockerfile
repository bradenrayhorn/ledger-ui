FROM node:14.16.0-alpine3.10 as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY ./yarn.lock /usr/src/app/yarn.lock

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.15.2-alpine

COPY --from=build /usr/src/app/build /var/www
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./env.sh /var/env.sh
RUN chmod +x /var/env.sh
ADD start.sh /
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
