# Markdown previewer

## Setting

```
npx create-react-app markdown-previewer
cd markdown-previewer
npm audit fix
npm start
```

## Dependencies: Bootstrap, Markdown compiler

```
npm install -S react-bootstrap bootstrap marked
```

## Dev init

Delete `index.css`, `App.css`

Make the App Component (class).

`App.js`

```js
import React from "react";

class App extends React.Component {
  render() {
    return <div className="App"></div>;
  }
}

export default App;
```
