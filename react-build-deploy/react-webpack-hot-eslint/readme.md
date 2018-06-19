# react eslint with babel, webpack

## refs

https://www.robinwieruch.de/react-eslint-webpack-babel/

## Eslint

```
npm --save-dev install eslint
```

eslint-loader for webpack

```
npm install --save-dev eslint-loader
```

```
// webpack.config.js

...

module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			}
		]
	},

...

```

eslint rules

```
// .eslintrc

{
  "rules": {
  }
}
```

eslint with babel

```
npm install --save-dev babel-eslint
```

```
// .eslintrc

{
	"parser": "babel-eslint",
	"rules": {}
}
```


build test

```
npm start
```

## ESLint Rules

```
// .eslintrc

{
	"parser": "babel-eslint",
	"rules": {
		"max-len": [
			1,
			70,
			2,
			{
				"ignoreComments": true
			}
		]
	}
}
```

## ESLint Rules for React

```
npm --save-dev install eslint-plugin-react
```

```
// .eslintrc

{
	"parser": "babel-eslint",
	"plugins": [
		"react"
	],
	"rules": {
		"max-len": [
			1,
			120,
			2,
			{
				"ignoreComments": true
			}
		],
		"prop-types": [
			2
		]
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	]
}

```

## Extend ESLint Rules exsample

```
npm --save-dev install eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
```

```
// .eslintrc

{
  parser: "babel-eslint",
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  },
  "extends": ["airbnb-base"]
}
```

## Disable ESLint Rules

```
  "rules": {
    "no-unused-vars": 0,

	...
  }
}
```

or on a specific js file,

```
/*eslint-disable no-unused-vars*/
...some code...
/*eslint-enable no-unused-vars*/
```
