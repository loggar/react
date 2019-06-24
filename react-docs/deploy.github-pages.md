# Deploy React App in GitHub Pages

## create-react-app

```
npm init react-app react-deploy-in-github-pages
```

## Deploy

```
npm install gh-pages --save-dev
```

Publish

```js
var ghpages = require("gh-pages");

ghpages.publish("dist", function(err) {});
```

or `package.json`

```json
{
  "homepage": "https://loggar.github.io/react-github-pages-app",
  "script": {
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

```
npm run deploy
```
