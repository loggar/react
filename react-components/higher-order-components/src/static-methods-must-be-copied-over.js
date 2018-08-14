// Caveats: Static Methods Must Be Copied Over

/*
Sometimes it’s useful to define a static method on a React component. For example, Relay containers expose a static method getFragment to facilitate the composition of GraphQL fragments.

When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.
*/

// Define a static method
WrappedComponent.staticMethod = function () {/*...*/ }
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true

/*
To solve this, you could copy the methods onto the container before returning it:
*/

function enhance(WrappedComponent) {
	class Enhance extends React.Component {/*...*/ }
	// Must know exactly which method(s) to copy :(
	Enhance.staticMethod = WrappedComponent.staticMethod;
	return Enhance;
}

/*
However, this requires you to know exactly which methods need to be copied. You can use hoist-non-react-statics to automatically copy all non-React static methods:
*/

import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
	class Enhance extends React.Component {/*...*/ }
	hoistNonReactStatic(Enhance, WrappedComponent);
	return Enhance;
}

/*
Another possible solution is to export the static method separately from the component itself.
*/

// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
