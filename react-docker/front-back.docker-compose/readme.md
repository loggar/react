# Dockerize Node

## backend app

```
docker build -t backend-app .
```

```
docker-compose up
```

## react app

```
docker build -t react:app .
```

```
docker run -p 3000:3000 react:app
```

`server.js` cors example

```js
const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const User = require("./src/User.model");
const cors = require("cors");

app.use(cors());
// ...
```

```
docker-compose up --build
```

## Use React production build

`front/Dockerfile`

```dockerfile
# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`docker-compose.yml`

```docker-compose
  ui:
    build: ./ui
    ports:
      - '80:80'
    depends_on:
      - api
```

```
docker-compose up --build
```
