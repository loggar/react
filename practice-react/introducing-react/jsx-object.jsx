/*
JSX Represents Objects
Babel compiles JSX down to React.createElement() calls.

These two examples are identical:
*/

const element = (
	<h1 className="greeting">
		Hello, world!
	</h1>
);

const element = React.createElement(
	'h1',
	{ className: 'greeting' },
	'Hello, world!'
);