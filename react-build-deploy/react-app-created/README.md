# create-react-app

* https://github.com/facebook/create-react-app

```
npx create-react-app my-app
cd my-app
npm start
```

## npm run react-script eject

```json
// package.json
{
  "dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

create-react-app encapsulates all of the npm modules it is using internally, so that your package.json will be very clean and simple without you having to worry about it.

However, if you want to start doing more complex things and installing modules that may interact with modules create-react-app is using under the hood, those new modules need to know what is available and not, meaning you need to have create-react-app un-abstract them.

That, in essence, is what react-scripts eject does. It will stop hiding what it's got installed under the hood and instead eject those things into your project's package.json for everyone to see.
