#loggar react-babel-webpack2
###Project Initialization
####project directory
```
mkdir react-babel-webpack2
cd react-babel-webpack2
npm init --yes
```
####react
```
npm install react react-dom --save
npm install react-hot-loader@3.0.0-beta.3 --save
```
####babel
```
npm install babel-core babel-loader babel-register --save-dev
npm install babel-preset-es2015 babel-preset-react --save-dev
```
* babel-loader : transpile .js file in order to provide it to the webpack.
* babel-register : transpile webpack.config.babel.js file.
####webpack
```
npm install webpack@2.1.0-beta.25 --save-dev
npm install webpack-dev-server@2.1.0-beta.2 --save-dev
npm install loader-utils html-webpack-plugin extract-text-webpack-plugin@2.0.0-beta.4 --save-dev
npm install style-loader css-loader sass-loader node-sass --save-dev
```
###Setting up Webpack
####webpack.config.babel.js
```
import path from 'path';  
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({  
  entry: [
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    }),
  ]
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
              ],
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: 'style!css!sass',
      },
    ]
  },
});
```
* entry : the entry point of the bundle, it can either be single file or multiple files.
* output : output object which Webpack completes to compile.
* plugins : Webpack built-in or third party plugins can be added functionality typically related to the bundle process.
* rules : file transformation rules.

html-webpack-plugin : it will generate an HTML file for you that includes all your webpack bundles in the body using script tags.

####.babelrc
```
{
    "presets": [
        "es2015"
    ]
}
```
>You can see that we included a different configuration for our babel loader, although we are able to use the .babelrc file with webpack, we included another configuration in our webpack config shown below.
Webpack2 brings native support for ES2015 Modules. It now understands import and export without them being transformed to CommonJS requires. In our presets, we include ['es2015', { modules: false }], which disables transformation of the ES2015 module syntax, and that's why we use different babel configurations, because webpack config uses import which isn't supported by node yet.

####package.json
```
{
  ...
  "scripts": {
    "webpack": "webpack --display-error-details"
  }
  ...
}
```
```
npm run webpack
```
now check /dist directory.

###Hot Module Replacement Plugin for React Project
####webpack.config.babel.js
```
// ...
import {HotModuleReplacementPlugin} from 'webpack';

export default () => ({  
  entry: [
    'react-hot-loader/patch', // Needed to preserve state
    'webpack-dev-server/client?http://localhost:8080', // webpack dev server host and port
    // ...
  ],
  // ...
  plugins: [
    new HotModuleReplacementPlugin(), // Globally enable hot code replacement
    // ...
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        // ...
        options: {
          // ...
          plugins: ['react-hot-loader/babel'],
        }
        // ...
      },
      // ...
  },
  devServer: {
    hot: true,
  },
});
```

####index.jsx
```
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; //hot module replacement plugin required.

// Components
import App from './components/app/App.jsx';

// Styles
import './index.scss';

function renderApp() {  
  // We now render `<AppContainer>` instead of our App component. 
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('main')
  );
}

renderApp(); // Renders App on init

if (module.hot) {  
  // Renders App every time a change in code happens.
  module.hot.accept('./components/app/App.jsx', renderApp);
}
```

####package.json
```
{
  ...
  "scripts": {
    "dev": "webpack-dev-server"
  }
  ...
}
```
```
npm run dev
```

###Dev / Production Environment

####webpack.config.babel.js
```
// ...
import {HotModuleReplacementPlugin} from 'webpack';

const defaultEnv = {  
    dev: true,
    production: false,
};

export default (env = defaultEnv) => ({  
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
    ] : [],
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, env.dev ? 'dist' : 'dist-production'),
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? [
      // Webpack Development Plugins
      new HotModuleReplacementPlugin(),
    ] : [],
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html'),
    }),
  ],
  module: {
    // ...
  },
  devServer: {
    hot: env.dev
  },

});
```
####package.json
```
{
  ...
  "scripts": {
    "dev": "webpack-dev-server --env.dev",
    "production": "webpack -p --env.production",
  },
  ...
}
```
```
npm run dev
npm run production
```

###Extract-css-file for production output
>extract-text-webpack-plugin

####webpack.config.babel.js
```
// ...
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default (env = defaultEnv) => ({  
  // ...
  plugins: [
    ...env.dev ? [
      // ...
    ] : [
      // Webpack Production Plugins
      new ExtractTextPlugin('[name].css'),
    ],
    // ...
  ],
  module: {
    rules: [
      // ...
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? 'style!css!sass' : ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css!sass'
        })
      },
    ]
  }
  // ...
});
```