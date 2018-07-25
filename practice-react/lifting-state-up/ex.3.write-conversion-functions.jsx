// First, we will write two functions to convert from Celsius to Fahrenheit and back:

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

// These two functions convert numbers. We will write another function that takes a string temperature and a converter function as arguments and returns a string. We will use it to calculate the value of one input based on the other input.

// It returns an empty string on an invalid temperature, and it keeps the output rounded to the third decimal place:

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

// For example, tryConvert('abc', toCelsius) returns an empty string, and tryConvert('10.22', toFahrenheit) returns '50.396'.