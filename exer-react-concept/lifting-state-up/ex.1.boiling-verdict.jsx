// Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor. Let’s see how this works in action.

// We will start with a component called BoilingVerdict. It accepts the celsius temperature as a prop, and prints whether it is enough to boil the water:

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

// Next, we will create a component called Calculator. It renders an <input> that lets you enter the temperature, and keeps its value in this.state.temperature.
// Additionally, it renders the BoilingVerdict for the current input value.

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = { temperature: '' };
	}

	handleChange(e) {
		this.setState({ temperature: e.target.value });
	}

	render() {
		const temperature = this.state.temperature;
		return (
			<fieldset>
				<legend>Enter temperature in Celsius:</legend>
				<input
					value={temperature}
					onChange={this.handleChange} />

				<BoilingVerdict
					celsius={parseFloat(temperature)} />

			</fieldset>
		);
	}
}

ReactDOM.render(
	<Calculator />,
	document.getElementById('root')
);
