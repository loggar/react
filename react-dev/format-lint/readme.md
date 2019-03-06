# format (prettier), lint

- example project: `react-ssr/server-side-rendering`

## setting up

```
npm i --save-dev prettier-standard husky lint-staged
```

`package.json`
```json
"scripts": {
  "format": "prettier-standard 'app/**/*.js' 'app/**/*.jsx' 'server/**/*.js'"
},
"lint-staged": {
  "linters": {
    "**/*.js": [
      "prettier-standard",
      "git add"
    ],
    "**/*.jsx": [
      "prettier-standard",
      "git add"
    ]
  }
},
```

`.prettierignore`, `.eslintignore`

```
app/imported.js
dist
coverage
node_modules

```


## cli usage

```
npx prettier-standard 'app/**/*.js' 'app/**/*.jsx' 'server/**/*.js'
```

