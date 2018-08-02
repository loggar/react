/*
function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<li>{number}</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);
*/

// When you run this code, you’ll be given a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements. We’ll discuss why it’s important in the next section.

// Let’s assign a key to our list items inside numbers.map() and fix the missing key issue.

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<li key={number.toString()}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);
