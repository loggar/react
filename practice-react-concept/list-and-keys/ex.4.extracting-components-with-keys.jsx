// Example: Incorrect Key Usage
/*
function ListItem(props) {
	const value = props.value;
	return (
		// Wrong! There is no need to specify the key here:
		<li key={value.toString()}>
			{value}
		</li>
	);
}

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		// Wrong! The key should have been specified here:
		<ListItem value={number} />
	);
	return (
		<ul>
			{listItems}
		</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);
*/


// Example: Correct Key Usage

function ListItem(props) {
	// Correct! There is no need to specify the key here:
	return <li>{props.value}</li>;
}

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		// Correct! Key should be specified inside the array.
		<ListItem key={number.toString()}
			value={number} />

	);
	return (
		<ul>
			{listItems}
		</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);

// A good rule of thumb is that elements inside the map() call need keys.
