# Nextjs for everyone — with some basic knowledge of React

## Getting starting with Next.js

Install next.js

```
npm i next --save
```

Set React

```
npm i react react-dom --save
```

After that you have to create two necessary folders: pages and static . Next.js won’t work without them!!

```
mkdir pages static
```

```js
// home.js
import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default Home;
```

## Run Dev

```json
// package.json

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
},

```

```
npm next dev
```

And visit:

- http://localhost:3000/
- http://localhost:3000/static/static.1.html
