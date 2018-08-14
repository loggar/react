// Don’t Mutate the Original Component. Use Composition.

/*
function logProps(InputComponent) {
	InputComponent.prototype.componentWillReceiveProps = function (nextProps) {
		console.log('Current props: ', this.props);
		console.log('Next props: ', nextProps);
	};
	// The fact that we're returning the original input is a hint that it has
	// been mutated.
	return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
*/

function logProps(WrappedComponent) {
	return class extends React.Component {
		componentWillReceiveProps(nextProps) {
			console.log('Current props: ', this.props);
			console.log('Next props: ', nextProps);
		}
		render() {
			// Wraps the input component in a container, without mutating it. Good!
			return <WrappedComponent {...this.props} />;
		}
	}
}