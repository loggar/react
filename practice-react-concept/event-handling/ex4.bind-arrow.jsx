class LoggingButton extends React.Component {
	handleClick() {
		console.log('this is:', this);
	}

	render() {
		// This syntax ensures `this` is bound within handleClick
		return (
			<button onClick={(e) => this.handleClick(e)}>
				Click me
			</button>
		);
	}
}

// The problem with this syntax is that a different callback is created each time the LoggingButton renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.
