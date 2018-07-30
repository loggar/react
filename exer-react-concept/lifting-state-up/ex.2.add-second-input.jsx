// Our new requirement is that, in addition to a Celsius input, we provide a Fahrenheit input, and they are kept in sync.

// We can start by extracting a TemperatureInput component from Calculator. We will add a new scale prop to it that can either be "c" or "f":

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
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
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature}
					onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	render() {
		return (
			<div>
				<TemperatureInput scale="c" />
				<TemperatureInput scale="f" />
			</div>
		);
	}
}

ReactDOM.render(
	<Calculator />,
	document.getElementById('root')
);

// We have two inputs now, but when you enter the temperature in one of them, the other doesn’t update. This contradicts our requirement: we want to keep them in sync.

// We also can’t display the BoilingVerdict from Calculator. The Calculator doesn’t know the current temperature because it is hidden inside the TemperatureInput.
