// Convention: Pass Unrelated Props Through to the Wrapped Component

/*
HOCs add features to a component. They shouldn’t drastically alter its contract. It’s expected that the component returned from a HOC has a similar interface to the wrapped component.

HOCs should pass through props that are unrelated to its specific concern. Most HOCs contain a render method that looks something like this:
*/

class SampleComponent extends React.Component {
	// ...
	
	render() {
		// Filter out extra props that are specific to this HOC and shouldn't be
		// passed through
		const { extraProp, ...passThroughProps } = this.props;

		// Inject props into the wrapped component. These are usually state values or
		// instance methods.
		const injectedProp = someStateOrInstanceMethod;

		// Pass props to wrapped component
		return (
			<WrappedComponent
				injectedProp={injectedProp}
				{...passThroughProps}
			/>
		);
	}
}