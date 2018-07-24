function tick() {
	const element = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);
	ReactDOM.render(element, document.getElementById('root'));

	// update React elements (whick is immutable) : ReactDOM.render
}

setInterval(tick, 1000);
