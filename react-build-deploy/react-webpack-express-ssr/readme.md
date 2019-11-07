# react webpack express: server side rendering

## Simple express server

```
npm install express compression
```

```
npm install --save-dev @babel/cli @babel/core @babel/node @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/polyfill @babel/preset-env
```

```
npm install -D nodemon
```

`package.json`

```json
"scripts": {
    "start-server": "nodemon --exec babel-node src-server/server.js"
  },
```

```
npm run start-server
```

```
http://localhost:3000/ssr
```

```
SyntaxError: Unexpected identifier 'express'
import express from 'express'

```

babel configuration

`.babelrc`

```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

## Building the React Page

Sample component : `./src/components/app.jsx`

Getting the React Component Rendered Server Side: `./src/routes/ssr.js`

### Render React DOM

```
npm install react react-dom handlebars
```

```
SyntaxError: Unexpected token
const reactComp = renderToString(<App />);
```

```
npm install --save-dev @babel/preset-react
```

`.babelrc`

```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }], "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

## Hydrating our React Component

`./src/components/index.js`

```js
import React from "react";
import { hydrate } from "react-dom";
import App from "./app";
hydrate(<App />, document.getElementById("reactele"));
```

`./webpack.config.js`

```js
const path = require("path");

const config = {
  entry: {
    vendor: ["@babel/polyfill", "react"],
    app: ["./src/components/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"]
  }
};

module.exports = config;
```

`package.json`

```json
"scripts": {
    "start-server": "nodemon --exec babel-node src-server/server.js",
    "webpack": "webpack -wd"
  },
```

```
npm install -D webpack webpack-cli babel-loader
```

```
npm run webpack
```

and in different terminal:

```
npm run start-server
```
