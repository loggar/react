# React-Toolbox in create-react-app

```
$ npm init react-app toolbox.create-react-app

$ cd toolbox.create-react-app

$ npm install --save react-toolbox
```

```
$ npm install -D react-toolbox-themr
```

`package.json`

```json
"reactToolbox": {
  "include": [
    "BUTTON",
    "DATE_PICKER"
  ],
  "customProperties": {
    "animation-duration": "0.3s",
    "color-accent": "var(--palette-pink-a200)",
    "color-accent-dark": "var(--palette-pink-700)",
    "color-primary-contrast": "var(--color-dark-contrast)",
    "color-accent-contrast": "var(--color-dark-contrast)"
  },
  "output": "assets/react-toolbox"
}
```

```json
"scripts": {
  "toolbox": "react-toolbox-themr"
}
```

