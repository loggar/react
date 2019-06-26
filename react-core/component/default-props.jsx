// Greetings Component
const Greeting = props => <h1>Hello {props.name}</h1>;

// Default Props
Greeting.defaultProps = {
  name: "User"
};

ReactDOM.render(<Greeting />, document.getElementById("root"));
