## Dockerizing ReactJS, NodeJS, NGINX using Docker

Create React App

```
create-react-app dockerizing-react-nginx
```

`dockerfile`

```dockerfile
FROM node:10-alpine as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install --only=prod&& mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

RUN npm run build
```

`.dockerignore`

```dockerignore
node_modules
```

Build docker image:

```
docker build -t react-frontend .
```

Run docker container:

```
docker run -p 3000:3000 react-frontend
```

## Production build

Add NGINX server

To add nginx as a server to our app we need to create a `nginx.conf` in the project root folder.

`nginx.conf`

```conf
server {

  listen 80;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page   500 502 503 504  /50x.html;

  location = /50x.html {
    root   /usr/share/nginx/html;
  }

}
```

Add the below lines to the Dockerfile

`Dockerfile`

```dockerfile
FROM node:10-alpine as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install && mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend
COPY . .
RUN npm run build

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine
COPY --from=builder /react-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose

`docker-compose.yml`

```yml
version: "3.7"

services:
  react-frontend:
    container_name: react-frontend
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ".:/app"
      - "/app/node_modules"
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
```

To start/stop the containers

```
docker-compose up

docker-compose down
```
