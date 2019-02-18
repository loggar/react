# Set up React Development

* babel
* webpack
* less / sass
* prettier / eslint

## react

```
npm install react react-dom
```

## webpack

```
npm install --save-dev webpack webpack-dev-server webpack-cli
```

- webpack module: which include all core webpack functionality
- webpack-dev-server: this development server automatically rerun webpack when our file is changed
- webpack-cli: enable running webpack from the command line

```json
// package.json
  "scripts": {
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
```

## babel

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

- `@babel/core` is the main dependency that includes babel transform script.
- `@babel/preset-env` is the default Babel preset used to transform ES6+ into valid ES5 code. Optionally configures browser polyfills automatically.
- `@babel/preset-react` is used for transforming JSX and React class syntax into valid JavaScript code.
- `babel-loader` is a webpack loader that hooks Babel into webpack. We will run Babel from webpack with this package.

```json
// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
```

Test source files:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>My React Configuration Setup</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.less';

class Welcome extends React.Component {
  render() {
    return (
      <>
        <h1 className="header">Hello World from React boilerplate</h1>
        <p>
          Visit my repository at{' '}
          <a href="https://github.com/nsebhastian/my-react-boilerplate">
            GitHub
          </a>
        </p>
      </>
    );
  }
}

ReactDOM.render(<Welcome />, document.getElementById('root'));
```

Test dev

```
npm run start
```

```js
// webpack.config.js
module.exports = {
  devtool: 'inline-source-map',
};
```
## prettier

```
npm install --save-dev --save-exact prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## eslint

```
npm --save-dev install eslint eslint-loader babel-eslint eslint-config-react eslint-plugin-react
```

- `eslint` is the core dependency for all functionalities, while eslint-loader enables us to hook eslint into webpack. Now since React used ES6+ syntax, we will add `babel-eslint` — a parser that enables eslint to lint all valid ES6+ codes.
- `eslint-config-react` and `eslint-plugin-react` are both used to enable ESLint to use pre-made rules.

```json
// .eslintrc
{
  "parser": "babel-eslint",
  "extends": "react",
  "env": {
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "indent": ["error", 2],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ]
  }
}
```

```js
// webpack.config.js
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'], // include eslint-loader
      },
    ],
  },
```

```json
// package.json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --mode development",
  "format": "prettier --write \"src/**/*.js\"",
  "eslint-fix": "eslint --fix \"src/**/*.js\"",
  "build": "webpack--mode production"
},
```

## css less processor

```
npm install --save-dev less less-loader css-loader style-loader
```

Sample source files:

```less
// style/header.less
.header {
  background-color: yellow;
}
```

```less
// style/main.less
@import 'header.less';

@color: #f5adad;

body {
  background-color: @color;
}
```

```js
// src/index.js
import './style/main.less';
```

webpack module configuration:

```js
// webpack.config.js
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
```

```
npm start
```

## HtmlWebpackPlugin

```
npm install html-webpack-plugin -D
```

```js
// webpack.config.js
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
  ],
```

remove the script tag from your `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My React Configuration Setup</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## webpack build for production

```js
// webpack.config.prod.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '.build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './.build',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
  ],
};
```

```json
// package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development",
    "format": "prettier --write \"src/**/*.js\"",
    "eslint-fix": "eslint --fix \"src/**/*.js\"",
    "build": "webpack --mode production --config webpack.config.prod.js"
  },
```

```
npm run build
```

Now, deploy `.build` directory.
