// We can start by encapsulating how the clock looks:

function Clock(props) {
	return (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {props.date.toLocaleTimeString()}.</h2>
		</div>
	);
}

function tick() {
	ReactDOM.render(
		<Clock date={new Date()} />,
		document.getElementById('root')
	);
}

setInterval(tick, 1000);

// However, it misses a crucial requirement: the fact that the Clock sets up a timer and updates the UI every second should be an implementation detail of the Clock.

// Ideally we want to write this once and have the Clock update itself:

/*
ReactDOM.render(
	<Clock />,
	document.getElementById('root')
);
*/

// To implement this, we need to add “state” to the Clock component.

// State is similar to props, but it is private and fully controlled by the component.