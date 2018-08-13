# Testing a React app with Jasmine npm

The Jasmine NPM package was originally designed just to run tests against your Node.js code, but with a couple of other packages, you can get it to run your react specs as well. This tutorial assumes you’re using babel to compile your code and enzyme to test it. We’ll also be using jsdom to provide a fake HTML DOM for the tests.

```
npm install --save-dev babel enzyme enzyme-adapter-react-16 jasmine-enzyme jsdom
```

```js
// spec/helpers/babel.js
require('babel-core/register');
```

```js
// spec/helpers/enzyme.js
import jasmineEnzyme from 'jasmine-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

beforeEach(function() {
  jasmineEnzyme();
});
```

```js
// spec/helpers/jsdom.js
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<html><body></body></html>')
global.document = dom.window.document
global.window = dom.window
global.navigator = dom.window.navigator
```

In order to ensure these files are loaded first, we’ll edit the jasmine.json. The default location is in spec/support. We want these new helpers to be loaded before any other helpers, so we modify it like so:

`spec/support/jasmine.json`
```json
"helpers": [
  "helpers/babel.js",
  "helpers/enzyme.js",
  "helpers/jsdom.js",
  "helpers/**/*.js"
],
```

It’s common for React code to import CSS or image files. Normally those imports are resolved at build time but they’ll produce errors when the tests are run in Node. To fix that, we add one more package:

```
npm install --save-dev ignore-styles
```

```js
// spec/helpers/exclude.js
import 'ignore-styles';
```
