// Using State Correctly

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			posts: [],
			comments: []
		};

		// Do Not Modify State Directly

		// Wrong
		// this.state.comment = 'Hello';

		// Correct
		this.setState({ comment: 'Hello' });
	}

	// State Updates May Be Asynchronous
	dosomething() {
		// Wrong
		/*
		this.setState({
			counter: this.state.counter + this.props.increment,
		});
		*/


		// To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

		// Correct
		this.setState((prevState, props) => ({
			counter: prevState.counter + props.increment
		}));
	}

	// State Updates are Merged
	// When you call setState(), React merges the object you provide into the current state.
	// you can update them independently with separate setState() calls:
	// The merging is shallow, so this.setState({comments}) leaves this.state.posts intact, but completely replaces this.state.comments.
	componentDidMount() {
		fetchPosts().then(response => {
			this.setState({
				posts: response.posts
			});
		});

		fetchComments().then(response => {
			this.setState({
				comments: response.comments
			});
		});
	}

	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById('root')
);