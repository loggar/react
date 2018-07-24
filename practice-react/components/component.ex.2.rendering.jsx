// rendering and props of a component

function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
	element,
	document.getElementById('root')
);

// Note: Always start component names with a capital letter.
