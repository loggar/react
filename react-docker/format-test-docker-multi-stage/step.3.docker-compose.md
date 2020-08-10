# docker compose

- https://hackernoon.com/a-better-way-to-develop-node-js-with-docker-cd29d3a0093

## The docker-compose builder pattern

Let’s talk about what Docker is for a moment.

Docker is a way to package your code. This is the typical context for using Docker.

Docker is also a way to create an isolated environment which is capable of executing certain types of applications.

Docker allows you to package environments that are capable of running your code.

When you use Docker for production you are using the most specialized Docker containers you can make. They are customized and specifically built for your application, packaged in the way you built it. For this purpose, creating a Dockerfile makes sense.

When you set up your computer for development, that’s not what you do. You instead install the tools that you need for development. You just need to create an environment which your code can run in.

This means you can use a more generalized Dockerfile. Usually, these generalized Dockerfiles you need for development already exist.

For example, when developing a Node.js application, you need node installed on your machine. That’s it.

You don’t need alpine linux. You don’t need to package your node_modules into an immutable build. You don’t need little containers to exec into to make significant changes. You just need to be able to execute node and npm.

Therefore, in a container, that’s all you need as well, meaning the official node image on Docker Hub will do just fine.

Without further ado, my approach to development with Docker.

In my last article I showed how to use Parcel for development and production. Let’s keep that rolling, and build on top of that.

I think it’s a good example because Hot Module Reloading is essential for developing React apps efficiently.

## docker compose

First, we need a `docker-compose` file. In it, we need our development environment. Seems how we are making a node app, that means the officalnode image is probably a safe bet.

`docker-compose.yml`

```yml
version: '3'
services:
  dev:
    image: node:11
```

Next, we need our code to be in the environment, but we don’t want it to be baked into the image. If we are using this for development, when our files change, the files in the container also need to change.

To accomplish this we can use a volume. We will mount our current directory `.` to `/usr/src/service` in the container. We will also need to tell docker where our “working directory” is. Meaning — what directory did we put the code in?

```yml
version: '3'
services:
  dev:
    image: node:11
    volumes:
      - .:/usr/src/service
    working_dir: /usr/src/service
```

Now, every time we make a change on our local machine, the same file changes will be reflected in `/usr/src/service`.

Next, we need to execute the command `npm run dev`. This is easily accomplished with a `command`. We also want to access it locally on port `1234`.

Finally, hot module reloading with Parcel happens on a random port by default, which won’t work for us, as we need to map the HMR port as well.

Modify the `dev` script in `package.json` to include the option `--hmr-port=1235`.

`package`

```json
"dev": "npm run generate-imported-components && parcel app/index.html --hmr-port 1235",
```

And with that in place, let’s update the Docker file to map the ports on our local machine to the same ports on our container.

```yml
version: '3'
services:
  dev:
    image: node:11
    volumes:
      - .:/usr/src/service
    working_dir: /usr/src/service
    command: npm run dev
    ports:
      - 1234:1234
      - 1235:1235
```

If you’ve done enough Node development, you’ll notice we have a problem. You can’t just run a node app without installing dependencies.

Also, you can’t just install your node modules locally on Mac or Windows and expect them to work on the linux container.

When you run a build in some cases libraries compile natively and the resulting artifact only works on the operating system it was built on!

As a first attempt, you may be tempted to just chain `npm install` and `npm run dev` in a single command, and sure enough that would work, but it’s not quite what we want. This would require to run an install every time we started development mode with the container.

Also, some services beyond needing an install, also might need a build step. In our case, this isn’t needed for developing the client because parcel or nodemon handle it, but not all apps were built in the past week with the latest tech.

For educational purposes the way to chain commands is using `bash` or `ash` to execute the command. If you try

```
npm install && npm run dev
```

You will learn that doesn’t work. Instead you can could use.

```
bash -c "npm install && npm run dev"
```

This would in fact work, but is not the optimal solution we are looking for.

Which brings us to Step Two.

## docker compose builder

Let’s create another docker-compose file, this time named `docker-compose.builder.yml`.

We will need to use `version: 2` this time to make use of a feature in `docker-compose` that isn’t available in the version 3 specification.

Version 3 is more suited towards use in production than version 2, which has more development friendly features.

The first thing we want to define in `docker-compose.builder.yml` is a base image.

`docker-compose.builder.yml`

```yml
version: '2'
services:
  base:
    image: node:11
    volumes:
      - .:/usr/src/service
    working_dir: /usr/src/service
```

This should look pretty familiar. It’s the same base we use in our `docker-compose.yml` file.

Now, we can extend the base to execute a whole bunch of different commands. For example:

```yml
version: '2'
services:
  base:
    image: node:11
    volumes:
      - .:/usr/src/service/
    working_dir: /usr/src/service/
  install:
    extends:
      service: base
    command: npm i
  build:
    extends:
      service: base
    command: npm run build
  create-bundles:
    extends:
      service: base
    command: npm run create-bundles
```

Now, to install dependencies using a `node:11` image which matches our development service in `docker-compose.yml` we can run:

```
docker-compose -f docker-compose.builder.yml run --rm install
```

To install the versions of binaries needed.

> Pro Tip: Admittedly, `docker-compose -f docker-compose.builder.yml run — rm install`, doesn’t really “roll off the tongue”, does it? I usually put this in a Makefile so can just run `make install`, etc.

After running the install, `docker-compose up` will bring up our development environment, which works exactly the same as it would on your local machine.

```
$ docker-compose up
Creating stream-all-the-things_dev_1 ... done
Attaching to stream-all-the-things_dev_1
dev_1  |
dev_1  | > stream-all-the-things@1.0.0 dev /usr/src/service
dev_1  | > npm run generate-imported-components && parcel app/index.html
dev_1  |
dev_1  |
dev_1  | > stream-all-the-things@1.0.0 generate-imported-components /usr/src/service
dev_1  | > imported-components app app/imported.js
dev_1  |
dev_1  | scanning app for imports...
dev_1  | 1 imports found, saving to app/imported.js
dev_1  | Server running at http://localhost:1234
```

And when we make a change, hot code reloading works as expected!

All with no Dockerfile!

## bonus

I just wanted to quickly add an example Makefile that will `make` the commands easier to remember and use.

Create a file called `Makefile`:

`Makefile`
```
install:
 docker-compose -f docker-compose.builder.yml run --rm install
dev:
 docker-compose up
```

Now you can run `make install` and `make dev`.
