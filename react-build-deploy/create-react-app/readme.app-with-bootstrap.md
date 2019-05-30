# create-react-app with bootstrap (Import Bootstrap As a Dependency)

```
npx create-react-app app-with-bootstrap

cd app-with-bootstrap

npm install react-bootstrap bootstrap
```

`src/AppButton.js`

```js
import React from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import "bootstrap/dist/css/bootstrap.min.css";

function AppButton() {
  return (
    <div className="AppButton">
      <ButtonToolbar>
        <Button variant="outline-primary">Primary</Button>
        <Button variant="outline-secondary">Secondary</Button>
        <Button variant="outline-success">Success</Button>
        <Button variant="outline-warning">Warning</Button>
        <Button variant="outline-danger">Danger</Button>
        <Button variant="outline-info">Info</Button>
        <Button variant="outline-light">Light</Button>
        <Button variant="outline-dark">Dark</Button>
      </ButtonToolbar>
    </div>
  );
}

export default AppButton;
```

`src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppButton from "./AppButton";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<AppButton />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Advanced Configuration

PUBLIC_URL

`.env`

```
PUBLIC_URL=/timesheet
```

or simply

`package.json`

```json
{
  "homepage": "http://hostname.com/timesheet"
}
```
