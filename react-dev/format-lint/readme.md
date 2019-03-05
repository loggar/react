# format (prettier), lint

- example project: `react-ssr/server-side-rendering`

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