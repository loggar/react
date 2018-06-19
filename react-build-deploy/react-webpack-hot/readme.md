# hot-module-replacement-frontend-react

## refs

https://www.robinwieruch.de/minimal-react-webpack-babel-setup/

## frontend bundling

```
// public/index.html

<!DOCTYPE html>
<html>
  <head>
    <title>The Minimal React Webpack Babel Setup</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

install webpack

```
npm install --save-dev webpack webpack-dev-server webpack-cli
```

run script 

```
// package.json

"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js --mode development",
  ...
},
```

webpack configuration for bundling

```
// webpack.config.js

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public'
  }
};
```

sample js

```
// src/index.js

console.log('My Minimal React Webpack Babel Setup');
```

test bundling

http://localhost:8080

```
npm start
```

## React Setup in a Webpack + Babel Project


babel setup

```
npm install --save-dev babel-core babel-loader babel-preset-env
npm install --save-dev babel-preset-stage-2
```

react-babel setup

```
npm install --save-dev babel-preset-react
```

```
// package.josn

"babel": {
  "presets": [
    "env",
    "react",
    "stage-2"
  ]
},
```

```
// webpack.config.js

  rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
```

```
// .babelrc

{
  "presets": [
    "env",
    "react",
    "stage-2"
  ]
}
```

install react

```
npm install --save react react-dom
```

```
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);
```

## Hot Module Replacement in React

install react-hot-loader

```
npm install --save-dev react-hot-loader
```

```
// webpack.config.js

const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './public',
    hot: true
  }
};
```

react component

```
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();
```

test hot module replacement

http://localhost:8080

```
npm start
```