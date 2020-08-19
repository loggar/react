# Develop Microfrontends Using React

## Create Microfrontend apps

```
npx create-react-app app-container
npx create-react-app micro-dogs
npx create-react-app micro-cats
```

## micro-apps

Remove contents of styles

- `micro-docs/src/App.css`
- `micro-cats/src/App.css`

## app-container

Install the packages for routing:

```
npm install react-router-dom history
```

`.env`

```
REACT_APP_DOGS_HOST=http://localhost:3001
REACT_APP_CATS_HOST=http://localhost:3002
```

Create `./src/MicroFrontend.js`, Edit `./src/App.js`.

## micro-docs, micro-cats

### react-app-rewired

```
npm install --save-dev react-app-rewired
```

`./config-overrides.js`

```js
module.exports = {
  webpack: (config, env) => {
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    config.output.filename = "static/js/[name].js";

    config.plugins[5].options.filename = "static/css/[name].css";
    config.plugins[5].options.moduleFilename = () => "static/css/main.css";
    return config;
  },
};
```

- `http://localhost:3002/asset-manifest.json` before overrides:

```json
{
  "files": {
    "static/js/0.chunk.js": "/static/js/0.chunk.js",
    "static/js/0.chunk.js.map": "/static/js/0.chunk.js.map",
    "main.js": "/static/js/main.chunk.js",
    "main.js.map": "/static/js/main.chunk.js.map",
    "runtime-main.js": "/static/js/bundle.js",
    "runtime-main.js.map": "/static/js/bundle.js.map",
    "index.html": "/index.html"
  },
  "entrypoints": [
    "static/js/bundle.js",
    "static/js/0.chunk.js",
    "static/js/main.chunk.js"
  ]
}
```

If you look closely, you can see inside the files object we have the main.js file path. Build scripts that will bundle the entire application to main.js. Inside this main.js we must have a function to render as well as unmount the component. Let's use the following convention.

`micro-docs/.env`:

```
PORT=3001
```

`micro-cats/.env`:

```
PORT=3002
```

`package.json`

```json
"scripts": {
   "start": "react-app-rewired start",
   "build": "react-app-rewired build",
   "test": "react-scripts test",
   "eject": "react-scripts eject"
}
```

- `http://localhost:3002/asset-manifest.json` after overrides:

```json
{
  "files": {
    "main.js": "/static/js/main.js",
    "main.js.map": "/static/js/main.js.map",
    "index.html": "/index.html"
  },
  "entrypoints": ["static/js/main.js"]
}
```

Then you will notice that it has removed all the chunks and bundle everything to main.js.

### CORS for the apps hosted in different subdomains

`./src/setupProxy.js`

```js
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
};
```

### Global `render` function and `unmount` function

`micro-dogs/src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

window.renderDogs = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountDogs = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("Dogs-container")) {
  ReactDOM.render(<App />, document.getElementById("root"));
  serviceWorker.unregister();
}
```

`micro-cats/src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

window.renderCats = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountCats = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("Cats-container")) {
  ReactDOM.render(<App />, document.getElementById("root"));
  serviceWorker.unregister();
}
```

## Start Dev

```
~/micro-docs> npm start
~/micro-cats> npm start

~/app-container> npm start
```
