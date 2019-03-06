# format (prettier), lint and pre-commit task with husky

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


## usage

cli

```
npx prettier-standard 'app/**/*.js' 'app/**/*.jsx' 'server/**/*.js'
```

npm task

```
npm run format
```

## pre-commit automation with husky

`package.json`
```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged && npm run test"
  }
}
`

then, commit files 