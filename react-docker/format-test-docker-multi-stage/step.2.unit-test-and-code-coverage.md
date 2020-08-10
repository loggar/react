# Unit Testing and Code Coverage

## Configuring Jest with Babel

```
npm i --save-dev jest babel-jest
```

`jest.json`
```json
{
  "roots": ["<rootDir>/__tests__/unit"],
  "modulePaths": ["<rootDir>", "/node_modules/"],
  "moduleFileExtensions": ["js", "jsx"],
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "transformIgnorePatterns": ["/node_modules/"],
  "coverageThreshold": {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  },
  "collectCoverage": true,
  "collectCoverageFrom": ["**/*.{js,jsx}"]
}
```

`package.json`
```json
"scripts": {
  "test": "cross-env BABEL_ENV=test jest --config jest.json",
  "test:watch": "cross-env BABEL_ENV=test jest --config jest.json --watch"
}
```

plugins and presets

```
npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/plugin-syntax-dynamic-import babel-jest
```

`.babelrc`
```json
{
  "env": {
    "test": {
      "presets":[
        ["@babel/preset-env"],
        ["@babel/preset-react"],
      ],
      "plugins": [
        ["@babel/plugin-syntax-dynamic-import"]
      ]
    },
    // ...
  }
}
```

## Testing the client side app with Enzyme

```
npm i --save-dev enzyme enzyme-adapter-react-16
```

Enzyme has a setup step that we must add before we can use it in our tests. In our jest.json file, add a new key:

`jest.json`
```json
{
  "setupTestFrameworkScriptFile": "<rootDir>/__tests__/setup.js"
}
```

`__tests__/unit/setup.js`
```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```

`__tests__/unit/app/pages/Home.jsx`
```jsx
import React from 'react';
import { shallow } from 'enzyme';
import Home from 'app/pages/Home.jsx';
describe('app/pages/Home.jsx', () => {
  it('renders style component', () => {
    expect(Home).toBeDefined();
    const tree = shallow(<Home />);
    expect(tree.find('Page')).toBeDefined();
    expect(
      tree
        .find('Helmet')
        .find('title')
        .text()
    ).toEqual('Home Page');
    expect(tree.find('div').text()).toEqual('Follow me at @patrickleet');
    expect(
      tree
        .find('div')
        .find('a')
        .text()
    ).toEqual('@patrickleet');
  });
});
```

### usage

```
npm run test
```

## Server side tests

`server/lib/server.js`
```js
import express from 'express'

export const server = express()
export const serveStatic = express.static
```

`server/index.js`
```js
import path from 'path'
import log from 'llog'
import { server, serveStatic } from './lib/server'
import ssr from './lib/ssr'

// Expose the public directory as /dist and point to the browser version
server.use(
  '/dist/client',
  serveStatic(path.resolve(process.cwd(), 'dist', 'client'))
)

// Anything unresolved is serving the application and let
// react-router do the routing!
server.get('/*', ssr)

// Check for PORT environment variable, otherwise fallback on Parcel default port
const port = process.env.PORT || 1234
export const onListen = port => () => {
  log.info(`Listening on port ${port}...`)
}
server.listen(port, onListen(port))

```

Now in our test we can simply mock `server/lib/server.js` instead of a more complex mock of `express`.

`__tests__/unit/server/index.js`
```js
import 'server/index';
jest.mock('llog');
jest.mock('server/lib/server', () => ({
  server: {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn()
  },
  serveStatic: jest.fn(() => 'static/path')
}));
jest.mock('server/lib/ssr');
describe('server/index.js', () => {
  it('main', () => {
    const { server, serveStatic } = require('server/lib/server');
    expect(server.use).toBeCalledWith('/dist/client', 'static/path');
    expect(serveStatic).toBeCalledWith(`${process.cwd()}/dist/client`);
    expect(server.get).toBeCalledWith('/*', expect.any(Function));
    expect(server.listen).toBeCalledWith(1234, expect.any(Function));
  });
});
```

```
$ npm run test

server          |    85.71 |      100 |       50 |    83.33 |                   |
  index.js      |    85.71 |      100 |       50 |    83.33 |                19 |
```

If we run the coverage now, we will notice that the coverage for `server/index.js` is not 100%. We have an anonymous function passed to listen which is difficult to get at. This calls for some minor refactoring.

Refactor the listen call to extract the anonymous function.

```js
export const onListen = port => () => {
  log.info(`Listening on port ${port}...`)
}
server.listen(port, onListen(port))
```

Now we can easily test `onListen`.

`__tests__/unit/server/index.js`
```js
import 'server/index';

jest.mock('llog');
jest.mock('server/lib/server', () => ({
  server: {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn()
  },
  serveStatic: jest.fn(() => 'static/path')
}));
jest.mock('server/lib/ssr');

describe('server/index.js', () => {
  it('main', () => {
    const { server, serveStatic } = require('server/lib/server');
    expect(server.use).toBeCalledWith('/dist/client', 'static/path');
    // expect(serveStatic).toBeCalledWith(`${process.cwd()}/dist/client`);
    expect(server.get).toBeCalledWith('/*', expect.any(Function));
    expect(server.listen).toBeCalledWith(1234, expect.any(Function));
  });

  it('onListen', () => {
    const log = require('llog');
    onListen(4000)();
    expect(log.info).toBeCalledWith('Listening on port 4000...');
  });
});
```

And with that, we have 100% coverage for `server/index.js` as well as `app/pages/Home.jsx`.

## Add testing to pre-commit hooks

`package.json`
```json
"scripts": {
  "pre-commit": "lint-staged && npm run test"
}
```

## 100% code coverage

- https://hackernoon.com/the-100-code-coverage-myth-900b83d20d3d
