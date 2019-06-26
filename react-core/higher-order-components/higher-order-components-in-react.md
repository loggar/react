# Higher order components (HOC) in React

> A higher-order component is a function that takes a component and returns a new component.

## Functional programming and higher order functions

A classic example of functional programming example is the multiplication:

```js
const multiply = x => y => x * y;
multiply(5)(20);
```

## Higher order component in React

```jsx
const reverse = (PassedComponent) =>
  ({ children, ...props }) =>
    <PassedComponent {...props}>
      {children.split("").reverse().join("")}
    </PassedComponent>

const name = (props) => <span>{props.children}</span>
const reversedName = reverse(name)
<reversedName>Hello</reversedName>
//=> <span>olleH</span>
```

1. Takes a component as argument
2. Return other something
