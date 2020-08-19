# Inline Styles in React

When using inline styles, it means that instead of making separate CSS files, components are styled by passing the CSS properties as an Object. For example:

```js
var divStyle = {
  color: "white",
  backgroundImage: "url(" + imgUrl + ")",
  WebkitTransition: "all", // note the capital 'W' here
  msTransition: "all", // 'ms' is the only lowercase vendor prefix
};

ReactDOM.render(
  <div style={divStyle}>Hello World!</div>,
  document.getElementById("root")
);
```
