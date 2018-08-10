# react webpack 4 - custom 2018

## webpack

```
npm install --save-dev webpack webpack-cli
```

`package.json`
```json
"scripts": {
  "build": "webpack --mode production"
}
```

## babel

```
npm i --save-dev babel-loader babel-core babel-preset-env babel-preset-react
```

`.babelrc`
```json
{
  "presets": ["env", "react"]
}
```

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

## react

I like writing my React components by following the Container / Presentational principle.

I suggest taking a look at [container components](https://medium.com/@learnreact/container-components-c0e67432e005) and [smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov for learning more.

In brief, the Container / Presentational principle is a pattern for React components.

The container component is the one that carries all the logic: functions for handling state changes, internal component state and so on.

In contrast a presentational component is merely used for displaying the desired markup. Presentational components are usually [plain arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and receive data from the container component as [props](https://reactjs.org/docs/components-and-props.html).

You’ll see how they look like in the following example.

For this post’s scope I’d like to build a super simple React form with a single text input.

```
npm i --save-dev react react-dom 
```

Next up let’s create a container component that:

* has its own state
* renders an HTML form

```js
// src/js/components/container/FormContainer.js
import React, { Component } from "react";
import ReactDOM from "react-dom";
class FormContainer extends Component {
	constructor() {
		super();
		this.state = {
			title: ""
		};
	}
	render() {
		return (
			<form id="article-form">
			</form>
		);
	}
}
export default FormContainer;
```

The component does nothing at this moment. It’s just a skeleton for wrapping up child components.

In fact a container component without its presentational child is almost useless.

Let’s fix that.

Our first presentational React component will be a text input. We know that an HTML input takes the following attributes:

* type
* class
* id
* value
* required

All of these will become props that the container component will pass down to its presentational child.

Since the input holds its own state we must be sure that React will take care of it. An HTML input becomes a [controlled component in React](https://reactjs.org/docs/forms.html#controlled-components).

Speaking of props, it is good practice to document your React components with [Prop Types](https://reactjs.org/docs/typechecking-with-proptypes.html).

```
npm i --save-dev prop-types
```

Back to React, our presentational component for an HTML input will look like the following:

```js
// src/js/components/presentational/Input.js
import React from "react";
import PropTypes from "prop-types";
const Input = ({ label, text, type, id, value, handleChange }) => (
	<div className="form-group">
		<label htmlFor={label}>{text}</label>
		<input
			type={type}
			className="form-control"
			id={id}
			value={value}
			onChange={handleChange}
			required
		/>
	</div>
);
Input.propTypes = {
	label: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired
};
export default Input;
```

At this point we’re ready to update our container component to include the text input:

```js
// src/js/components/container/FormContainer.js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
class FormContainer extends Component {
	constructor() {
		super();
		this.state = {
			seo_title: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}
	render() {
		const { seo_title } = this.state;
		return (
			<form id="article-form">
				<Input
					text="SEO title"
					label="seo_title"
					type="text"
					id="seo_title"
					value={seo_title}
					handleChange={this.handleChange}
				/>
			</form>
		);
	}
}
export default FormContainer;
```

Time to wire things up.

Webpack expects the entry point to be ./src/index.js

Create ./src/index.jsand place an import directive into it for requiring the container component:

```js
// src/index.js
import FormContainer from "./js/components/container/FormContainer";
```

With this in place we’re ready to create our bundle by running:

```
npm run build

# ./dist/main.js
```

## HTML webpack plugin: including the bundle into an HTML page.

To display our React form we must tell Webpack to produce an HTML page. The resulting bundle will be placed inside a <script></script>tag.

Webpacks needs two additional components for processing HTML: html-webpack-plugin and html-loader.

```
npm i --save-dev html-webpack-plugin html-loader
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
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
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

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
	<title>How to set up React, Webpack, and Babel</title>
</head>

<body>
	<div class="container">
		<div class="row mt-5">
			<div class="col-md-4 offset-md-1">
				<p>Create a new article</p>
				<div id="create-article-form">
					<!-- form -->
				</div>
			</div>
		</div>
	</div>
</body>

</html>
```

One last thing is missing! We must tell our React component to hook itself into `<div id="create-article-form"></div>`.

```js
// src/js/components/container/FormContainer.js

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
```

```
npm run build

# .dist/index.html
```

## webpack dev server: hot module replacement

```
npm i --save-dev webpack-dev-server
```

`package.json`
```json
"scripts": {
	"start": "webpack-dev-server --open --mode development",
	"build": "webpack --mode production"
}
```

```
npm start
```