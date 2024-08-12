FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm i
RUN npm run build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/malfi/browser /usr/share/nginx/html

EXPOSE 80
