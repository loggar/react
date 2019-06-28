# create-react-app

- https://github.com/facebook/create-react-app

```sh
# using npx (npm 5.2+)
npx create-react-app my-new-app

# using npm (npm 6+)
npm init react-app my-new-app

# using yarn (yarn 0.25+)
yarn create react-app my-new app
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

## Starting React App

```
# starting our app for development
npm start
npm run start
yarn start

# building our app for production
npm run production
yarn production

# testing our application
npm run test

# ejecting our application (ONLY DO IF YOU KNOW WHAT YOURE DOING)
npm run eject
```

## Bundling for Production

```
npm run build
```
