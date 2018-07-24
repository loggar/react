// To show that all components are truly isolated, we can create an App component that renders three <Clock>s:

// Each Clock sets up its own timer and updates independently.

// In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.

function FormattedDate(props) {
	return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date()
		});
	}

	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<FormattedDate date={this.state.date} />
			</div>
		);
	}
}

function App() {
	return (
		<div>
			<Clock />
			<Clock />
			<Clock />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
