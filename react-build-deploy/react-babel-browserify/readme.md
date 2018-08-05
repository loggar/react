# react-babel-browserify

* npm install react react-dom --save
* npm install browserify --save-dev
* npm install babel-core --save-dev
* npm install babelify babel-preset-react --save-dev

`package.json`
```
"scripts": {
    "build": "browserify -t [ babelify --presets [ react ] ] src/index.js -o build/app.js"
}
```

```
npm build
```