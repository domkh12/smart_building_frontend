# PHASE 1 Install Node
FROM node AS builder
WORKDIR /app
COPY ./package*.json /app/
RUN npm i
COPY . /app/
RUN npm run build
# PHASE 2 Install Nginx
FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]