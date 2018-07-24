// The simplest way to define a component is to write a JavaScript function:

function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

// You can also use an ES6 class to define a component:

class Welcome extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}
