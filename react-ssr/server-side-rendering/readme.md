# Move over Next.js and Webpack

- https://hackernoon.com/move-over-next-js-and-webpack-ba367f07545

## install

```
npm init

npm i --save react react-dom react-router styled-components react-helmet-async react-imported-component

npm i --save-dev parcel-bundler react-hot-loader
```

## development mode with parcel

`package.json`
```json
"scripts": {
  "dev": "parcel src-app/index.html"
}
```

With Parcel, you simple give it the entrypoint to your application as the only argument to start developing.

```
npm run dev
```

## Streaming Server Side Rendering

```
npm i --save llog pino express through cheerio

npm i --save-dev concurrently rimraf nodemon @babel/polyfill cross-env
```

`.babelrc`
```json
{
  "env": {
    "server": {
      "plugins": ["react-imported-component/babel", "babel-plugin-dynamic-import-node"]
    },
    "client": {
      "plugins": [
        ["react-imported-component/babel"]
      ]
    }
  }
}
```

`package.json`
```json
"scripts": {
  "dev": "npm run generate-imported-components && parcel app/index.html",
  "dev:server": "nodemon -e js,jsx,html --ignore dist --ignore app/imported.js --exec 'npm run build && npm run start'",
  "build": "rimraf dist && npm run generate-imported-components && npm run create-bundles",
  "create-bundles": "concurrently \"npm run create-bundle:client\" \"npm run create-bundle:server\"",
  "create-bundle:client": "cross-env BABEL_ENV=client parcel build app/index.html -d dist/client --public-url /dist/client",
  "create-bundle:server": "cross-env BABEL_ENV=server parcel build server/index.js -d dist/server --public-url /dist --target=node",
  "generate-imported-components": "imported-components app app/imported.js",
  "start": "node dist/server"
}
```

```
npm run dev:server

# or

npm run build && npm run start
```
