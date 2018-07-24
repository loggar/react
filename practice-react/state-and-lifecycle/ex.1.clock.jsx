function tick() {
	const element = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);
	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

setInterval(tick, 1000);

// In this section, we will learn how to make the Clock component truly reusable and encapsulated. It will set up its own timer and update itself every second.