# React-Toolbox in webpack project

```
$ npm install --save react-toolbox
```

```
npm install postcss-loader --save-dev
npm install postcss postcss-preset-env postcss-calc --save
```

`webpack.config.js`

```
{
  test: /\.css$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: true, // default is false
        sourceMap: true,
        importLoaders: 1,
        localIdentName: "[name]--[local]--[hash:base64:8]"
      }
    },
    "postcss-loader"
  ]
}
```
