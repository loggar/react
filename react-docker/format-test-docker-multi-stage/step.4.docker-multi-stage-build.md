# docker multi statge build

- https://hackernoon.com/a-tale-of-two-docker-multi-stage-build-layers-85348a409c84

The last thing we need in place to get our application ready for production deployment is a Dockerfile.

The Dockerfile is also a great place to run our unit tests, which is why I’ve decided to write the tests first.

We have a few goals with our build:

- It should be secure
- It should be as slim as possible
- It should not build if quality standards are not met

With the goals in mind, let’s get started.

Docker is essentially an isolated environment for your code to run in. Just like you would provision a server, you provision a docker container. As discussed in A Better Way to Develop Node.js with Docker, most popular frameworks/languages have builds available from Docker Hub. Seems how we are using Node, we need an environment that runs `node`. We’ll start our Dockerfile with that.

But before we do, let’s talk about happen when you run the command `docker build`. The first thing that happens is Docker determines the “context” in which the build is running. It sucks in everything from your currently directory as the context, except files or folders listed in the `.dockerignore` file.

We only want the bare minimum required for the build process, so let’s start by creating a `.dockerignore` file and ignoring everything else.

`.dockerignore`

```
.cache
coverage
dist
node_modules
```

Any other heavy folder that ends up in your project that is not needed for a successful build/test should also be ignored.

Here’s the difference in running docker build `. -t ssr` with and without the `.dockerignore` file:

```
$ docker build . -t ssr
Sending build context to Docker daemon  166.6MB
$ docker build . -t ssr
Sending build context to Docker daemon  1.851MB
```

As you can see, it’s a pretty significant difference.

## The build layer

Now let’s create the Dockerfile line by line:

```dockerfile
FROM node:11.10.0-alpine AS build
```

First, as I mentioned, it’s a Node app, so it make sense to start with the official Node image. It’s production, and in production we want immutable, repeatable builds, and for that reason I used a specific Node version `11.10.0`. Depending on your requirements you may want to choose the latest LTS version of Node 10. I just picked the newest available. You can find a list of the latest tags here: [node Tags — Docker Hub](https://hub.docker.com/_/node?tab=tags).

Next, note the `AS` directive. This signals that this is not the final stage of the Dockerfile. Later on we can `COPY` artifacts out of this stage into our final container. The reason for this is to produce an image with the minimum number of artifacts. We can run more expensive commands in the first stage, and the bloat of their results will be stripped out in the next layer, leaving us with only the essentials to run the app.

As well as producing much smaller images, using a multi-stage build is also a good security measure as all build tooling, and thus, security vulnerabilities of the development tooling is stripped out of the final layer.

I’ve also decided to use an `alpine` version of node. This means the base OS is Alpine Linux, an ~5MB minimal linux distribution made for containerization.

Next, because we are using `alpine` and it does not come with many build tools, we should install the `node-gyp` collection of tools.

```dockerfile
RUN apk add --update --no-cache \
    python \
    make \
    g++
```

With that we have all of the tooling in place for our builds and tests to run. You could potentially save 10 seconds or so off of the build time if the packages you are relying do not need to compile any of their dependencies using gyp by skipping the previous step. It will be stripped out of the final layer, however, so it’s not a huge savings, and many node dependencies do require it.

Our code is not yet inside of the container, which is pretty helpful in order to run it! Let’s copy it into a simply named `src` directory, and set that directory as our working directory. All future commands in this layer will be run in the specified working directory.

```dockerfile
COPY . /src
WORKDIR /src
```

Next let’s install our Node dependencies.

```dockerfile
RUN npm ci
```

`npm ci` works similarly to `npm i`, but skips the expensive dependency resolution step, and instead just installs the exact dependencies specified in your `package-lock.json` file. It’s basically a faster `npm i` for use in CI environments.

And now we can run our quality checks and build. If they do not pass, a new image will not be successfully created, and the build will fail. This is great for builds run as part of a Continuous Deployment pipeline.

```dockerfile
RUN npm run lint
RUN npm run build
RUN npm run test
```

I usually aim to fail as quickly as possible, and generally put `test` before `build` but our Server Side tests rely on having an application built in order to serve it, so in this case I’ve just flipped them.

Finally, for this layer, the last thing we want to do is now get rid of any development dependencies as they are no longer needed past this point.

That’s it for the first layer. Here’s the whole first layer in one place for readability:

```dockerfile
FROM node:11.10.0-alpine AS build
RUN apk add --update --no-cache \
    python \
    make \
    g++
COPY . /src
WORKDIR /src
RUN npm ci
RUN npm run format
RUN npm run build
RUN npm run test
RUN npm prune --production
```

Now in the second layer we have a choice.

We built our application using a Node server to do streaming server side rendering. At this point in our Dockerfile we have a built client side application. We don’t necessarily need to use the server as well. We might decide we just want a statically served client-side only application instead. In the next part of the article I want to show you how you can go from here to either build a final layer using the original Node SSR server, or alternatively to package the application into a Nginx deployment.

## Final Layer Option #1: Node Streaming SSR rendered app

First, let’s start with the Node SSR version of the Dockerfile, as it’s what the series has been focused on so far.

Directly under the first stage, we now want to add a second `FROM` statement. This time, we will not use `AS` because it is the final layer. We’ll also want to go ahead and expose the port that the application runs on, as well as set a working directory as we did before.

```dockerfile
FROM node:11.10.0-alpine AS build
// ...
RUN npm prune --production
FROM node:11.10.0-alpine
ENV PORT=1234
EXPOSE $PORT
WORKDIR /usr/src/service
```

Again, notice that we starting with the same alpine node image at a specific version. When we create a new layer, nothing is copied over from the previous layer automatically. It’s a fresh slate. We need to copy the artifacts, in the case of our Node application, a couple files and folders, into our final layer. Let’s do that next:

```dockerfile
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist dist
```

Finally, we can run our app using `node`, but we want to set the user to not be root before doing so. The official Node image creates a user named `node` for this purpose.

```dockerfile
USER node
CMD ["node", "./dist/server/index.js"]
```

When deploying, we should be relying on an orchestrator to manage restarting and scaling the application for us, such as Kubernetes or Docker Swarm, so there’s no need to use tools like `pm2` or `forever`.

```dockerfile
FROM node:11-alpine AS build
RUN apk add --update --no-cache \
    python \
    make \
    g++
COPY . /src
WORKDIR /src
RUN npm ci
RUN npm run format
RUN npm run build
RUN npm run test
RUN npm prune --production
FROM node:11.10.0-alpine
EXPOSE 1234
WORKDIR /usr/src/service
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist dist
USER node
CMD ["node", "./dist/server/index.js"]
```

And building and running the app:

```
$ docker build . -t ssr
$ docker run -p 1234:1234 ssr
{"level":30,"time":1551155555272,"msg":"Listening on port 1234...","pid":1,"hostname":"d5b0db2acfbc","v":1}
```

```url
localhost:1234
```

If you’re paying attention or have read other Docker articles before you may notice that I haven’t defined a `HEALTHCHECK`. `HEALTHCHECK` is a command that is called when running in certain orchestrators, such as Docker Swarm. While running in Kubernetes, we instead rely on Kubernetes’ liveness and readiness probes.

For more info on writing healthchecks for node check out [Effective Docker Healthchecks For Node.js](https://medium.com/@patrickleet/effective-docker-healthchecks-for-node-js-b11577c3e595). And just for completeness, our SSR Node server is quite simple, so in this case using something like curl would be just fine.

Here’s a modified version of the final stage with a `HEALTHCHECK` using `curl` defined.

```dockerfile
// ... first layer ...
FROM node:11.10.0-alpine
RUN apk add --update --no-cache curl
EXPOSE 1234
WORKDIR /usr/src/service
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist dist
HEALTHCHECK --interval=5s \
            --timeout=5s \
            --retries=6 \
            CMD curl -fs http://localhost:1234/ || exit 1
USER node
CMD ["node", "./dist/server/index.js"]
```

## Final Layer Option #2: Nginx to serve static client side app

Now, let’s create a second Dockerfile, an alternative way to finish our final stage.

We are gonna start with the same build layer, but this time, our final stage will use `nginx` to serve the application statically, rather than rendered on the server side with Node.

Before we do, we will need to create a new entry in our package.json’s `script` section. Add the following scripts:

`package.json`
```json
"build:nginx": "rimraf dist && npm run generate-imported-components && npm run create-bundle:nginx",
"create-bundle:nginx": "cross-env BABEL_ENV=client parcel build app/index.html -d dist/client --public-url .",
```

The difference with the SSR build is the public url we set to . when we run the build because we want it to be relative to the `index.html` file in this case.

Now, create `./nginx/Dockerfile`:

```dockerfile
FROM node:11.10.0-alpine AS build
RUN apk add --update --no-cache \
    python \
    make \
    g++
COPY . /src
WORKDIR /src
RUN npm ci
RUN npm run format
RUN npm run build:nginx
RUN npm run test
RUN npm prune --production
FROM nginx:1.15.8-alpine
RUN apk add --update --no-cache curl
WORKDIR /usr/src/service
COPY --from=build /src/dist ./dist
COPY --from=build /src/nginx ./nginx
HEALTHCHECK --interval=5s \
            --timeout=5s \
            --retries=6 \
            CMD curl -fs http://localhost:1234/ || exit 1
RUN ["chmod", "+x", "./nginx/entrypoint.sh"]
ENTRYPOINT [ "ash", "./nginx/entrypoint.sh" ]
```

There isn’t much new here, except instead of using a command, we are using an `ENTRYPOINT`. This allows you to run a script instead of a command. We also want to make sure to call it with `ash` the alpine linux version of `sh`. The `RUN` line just above is simply changing linux permissions to make the file executable.

The script that we will make in a moment will start nginx using a config file that we also need to create and store in an `nginx` folder.

Let’s start with the `entrypoint.sh` script. I’m gonna include two useful snippets inside that help with using environment variables commented out. We don’t need them for this project, but it’s a common requirement, such as when you want to use nginx as a proxy to a backend, or perhaps include an analytics token or key in the JS bundle.

`entrypoint.sh`
```sh
#!/bin/bash
# This script can be used when you have webpack or parcel builds that 
# insert env variables at build time, usually as build args. 
# Just set the build args to an a unique string for replacement,
# and do it post build instead. Uncomment `echo` through `done` and modify
# to match your env variables
# --- Start Insert ENV to JS bundle ---
# echo "Inserting env variables"
# for file in ./dist/**/*.js
# do
#   echo "env sub for $file"
#   sed -i "s/REPLACE_MIXPANEL_TOKEN/${MIXPANEL_TOKEN}/g" $file
# done
# --- End Insert ENV to JS bundle ---
# And if you need env variables in Nginx, use this instead of `cp`
# --- Start Insert ENV to Nginx---
# echo "Injecting Nginx ENV Vars..."
# envsubst '${GRAPHQL_URL}' < nginx/nginx.conf.template > /etc/nginx/nginx.conf
# --- End Insert ENV to Nginx---
cp nginx/nginx.conf.template /etc/nginx/nginx.conf
echo "Using config:"
cat /etc/nginx/nginx.conf
echo "Starting nginx..."
nginx -c '/etc/nginx/nginx.conf' -g 'daemon off;'
```

Basically all we do is copy over our Nginx config to the `/etc/nginx` folder, and then start it.

Here’s the nginx config — save it as`./nginx/nginx.config.template`. You can use environment variables in it if you uncomment the `envsubst` line above.

```
events {
  worker_connections 1024;
}
http {
  server {
    include /etc/nginx/mime.types;
    listen 1234;
    root   /usr/src/service/dist/client;
    index  index.html;
    gzip on;
    gzip_min_length 1000;
    gzip_buffers 4 32k;
    gzip_proxied any;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
    gzip_vary on;
    location ~* \.(?:css|js|eot|woff|woff2|ttf|svg|otf) {
      # Enable GZip for static files
      gzip_static on;
      # Indefinite caching for static files
      expires max;
      add_header Cache-Control "public";
    }
  }
}
```

Let’s give it a run

```
$ docker run -p 1234:1234 nginx-server

Starting nginx...
```

```url
localhost:1234
```
