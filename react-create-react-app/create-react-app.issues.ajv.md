# ajv issue

## 2019-02-10

```
webpack broken by ajv@6.9.0, "custom keyword definition is invalid: data.errors should be boolean
```

```
webpack version: 4.19.1
Node.js version: 10.13.0
Operating System: Windows 10
Additional tools:
```

Solution:

### yarn

```json
// package.json
"resolutions": {
  "ajv": "6.8.1"
}
```

```
$ yarn install
```

### npm

```
npm uninstall ajv
npm install ajv@6.8.1
```

or using `npm-force-resolutions`

```json
// package.json
"resolutions": {
  "ajv": "6.8.1"
}
```

```
rm -rf node_modules
npx npm-force-resolutions
npm install
```
