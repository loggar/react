// In the examples above we declared a separate listItems variable and included it in JSX:
/*
function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<ListItem key={number.toString()}
			value={number} />

	);
	return (
		<ul>
			{listItems}
		</ul>
	);
}
*/

// JSX allows embedding any expression in curly braces so we could inline the map() result:

function NumberList(props) {
	const numbers = props.numbers;
	return (
		<ul>
			{numbers.map((number) =>
				<ListItem key={number.toString()}
					value={number} />

			)}
		</ul>
	);
}