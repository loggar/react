# React App - webpack 4

## install webpack

```
npm i -D webpack webpack-cli
```

```js
// src/index.js
console.log("hello");
```

```json
// package.json
{
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
  }
}
```

```
npm start

# or

npm run build

# dist/main.js
```

## Setting Up React and Babel

```
npm i -S react react-dom
```

```
npm i -D babel-core babel-loader babel-preset-env babel-preset-react
```

* babel-core: Transforms your ES6 code into ES5
* babel-loader: Webpack helper to transform your JavaScript dependencies (for example, when you import your components into other components) with Babel
* babel-preset-env: Determines which transformations/plugins to use and polyfills (provide modern functionality on older browsers that do not natively support it) based on the browser matrix you want to support
* babel-preset-react: Babel preset for all React plugins, for example turning JSX into functions

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

```json
// .babelrc
{
  "presets": ["env", "react"]
}
```

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React and Webpack4</title>
</head>
<body>
  <section id="index"></section>
</body>
</html>
```

Now we need to install html-webpack-plugin and use this in our webpack config file. This plugin generates an HTML file with `<script>` injected, writes this to `dist/index.html`, and minifies the file.

```
npm i -D html-webpack-plugin
```

```js
// webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
```

The value I am giving the `template` key is where I am looking for my HTML file. The `filename` value is the name of the minified HTML that will be generated in the dist folder.

```
npm start
```

## Setting up webpack-dev-server

```
npm i -D webpack-dev-server
```

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production"
  }
}
```

If you now run `npm run start` you should see `localhost:8080` open up in your default browser — that’s what the `—-open` flag is for. Now everytime you make changes, it will refresh the page.

You can also add a `--hot` flag to your npm start script which will allow you to only reload the component that you’ve changed instead of doing a full page reload. This is **Hot Module Replacement**.

## Setting up CSS

```
npm i -D css-loader style-loader
```

```js
// webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
```

> Note that the order of adding these loaders is important. First, we need to resolve the CSS files before adding them to the DOM with the style-loader. By default, webpack uses the loaders from the right (last element in the array) to the left (first element in the array).

### Making CSS modular

We can also make CSS modular using webpack. This means class name will be scoped locally and specific to only the component in question.

To do this, we can provide some options to css-loader:

We can also make CSS modular using webpack. This means class name will be scoped locally and specific to only the component in question.

To do this, we can provide some options to css-loader:

```js
// webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
```

As we need to give options, each loader is now an object with a key-value pair. To enable CSS modules, we need to set module option for css-loader to be true. The importLoaders option configures how many loaders before css-loader should be applied. For example, sass-loader would have to come before css-loader.

The localIdentName allows you to configure the generated identification.

* [name] will take the name of your component
* [local] is the name of your class/id
* [hash:base64] is the randomly generated hash which will be unique in every component’s CSS
* 
To make this a bit more visual, I’ll give you an example. Say I have a component named **Form** and I have a button with a CSS class **primaryButton**. I also have another component called **Search** and a button in it with a CSS class **primaryButton**. However, both of these classes have different CSS:

```css
Form button
.primaryButton {
  background-color: green;
}
Search button
.primaryButton {
  background-color: blue;
}
```

When webpack bundles your application, depending on which CSS comes latest, both of your buttons could have the color green or blue instead of Form having green and Search having blue.

This is where the localIdentName comes into place. With this, once your application is bundled, your buttons will have a unique class name!


### Importing CSS

You will need to import your CSS file in your Search component like so:

```js
import style from "./Search.css"
```

You can then apply different CSS class styles such as:

```js
const Search = () => {
  return <div className={style.nameOfYourCSSClass}>
           Hello Search Component :)
         </div>
}
```

You don’t have to call it style but what I found is that most people have given it this name in their projects.

## Entry and output points

Webpack 4 by default has a default entry point of index.js in your src folder. If you would like to point to a different file, you can do so by specifying an entry point in your webpack config file:

```js
module.exports = {
  entry: "./src/app.js",
  module: {
   ...
  }
}
```

You can also specify output file like so:

```js
const path = require('path')
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(‘dist’),
    filename: ‘bundled.js’
  },
  module: {
    ...
  }
}
```
