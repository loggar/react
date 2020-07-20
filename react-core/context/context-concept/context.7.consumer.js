// <MyContext.Consumer>
//   {value => /* render something based on the context value */}
// </MyContext.Consumer>

// A React component that subscribes to context changes. This lets you subscribe to a context within a function component.

// Requires a function as a child. The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().
