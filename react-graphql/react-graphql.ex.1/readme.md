# GraphQL API with React Client

refs )

* https://medium.com/wiser-tech/graphql-the-what-why-and-how-8c652a3fc1ea
* https://github.com/dotexe0/graphql-fullstack-example

## graphql server

```
cd api

npm install

npm start
```

access on http://localhost:4000/graphql

and consume query:

```
query getAllLifts {
  allLifts {
    name
    status
    night
    capacity
    id
  }
}
```

## react client

```
cd ui

npm install

npm start
```

access on http://localhost:3000
